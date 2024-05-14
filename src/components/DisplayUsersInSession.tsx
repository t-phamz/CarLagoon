import {
  Accordion,
  Button,
  Center,
  Grid,
  GridCol,
  Group,
  Modal,
  ScrollArea,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Session, UserSession, User } from "@/models/userTypes";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";

async function getUsersInSessions(idOfSession: number) {
  //should use store to get value of idOfSession, Use the one in the reactCarInfo
  const response = await fetch(
    "/api/userSessions?" + "param1=" + encodeURI(idOfSession.toString()),
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    //console.log("data: " + JSON.stringify(data, null, 2));
    return data.result;
  } else {
    console.error("Error in getting userSessions " + response.status);
    return { id: 0, userID: 0, sessionsID: 0, carID: 0 };
  }
}

async function addUserToCar(
  userID: number | null,
  sessionID: number,
  carID: number,
  setUserAdded: (value: number) => void
) {
  const response = await fetch("/api/userSessions", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userID: userID,
      sessionsID: sessionID,
      carID: carID,
    }),
  });
  if (response.ok) {
    console.log("User added to car");
    setUserAdded(Math.random());
  } else {
    console.log(
      "Error with adding user to car " +
        response.status +
        " " +
        response.statusText
    );
  }
}

export default function DisplayUsersInSessions() {
  const { user } = useUser();
  const [usersInSession, setUsersInSessions] = useState<User[]>([]);
  const userID = useSelector((state: RootState) => state.currentUser);
  const [opened, { open, close }] = useDisclosure(false);
  const [usersAdded, setUsersAdded] = useState(0);

  useEffect(() => {
    if (userID.currentUserID !== 0 && userID.currentUserSessionID !== 0) {
      const fetchData = async () => {
        try {
          //UPDATE TO REAL SESSION ID
          const ret = await getUsersInSessions(userID.currentUserSessionID);
          setUsersInSessions(ret);
          //console.log("ret: " + ret + " useEffect: " + userSessions);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [userID, usersAdded]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Button onClick={open}>Invite Users to car</Button>
      <Modal opened={opened} onClose={close} title="Participants in this event">
        <ScrollArea h={260}>
          <Accordion w={400} variant="contained">
            {usersInSession && usersInSession.length > 0 ? (
              usersInSession?.map((user) => (
                <Accordion.Item
                  key={user.id}
                  value={user.id.toString()}
                  title={user.id.toString()}
                >
                  <Accordion.Control>
                    {user.firstName + " " + user.lastName}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Grid justify="flex-start" align="center" gutter={"sm"}>
                      <Grid.Col span={"auto"}>
                        <Center inline>{"Lives at: " + user.location}</Center>
                      </Grid.Col>
                      <Grid.Col span={"content"}>
                        <Button
                          // UPDATE TO REAL SESSION ID istedet for 1
                          onClick={() =>
                            addUserToCar(
                              user.id,
                              1,
                              userID.currentUserCarID,
                              setUsersAdded
                            )
                          }
                        >
                          Add to car
                        </Button>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
              ))
            ) : (
              <p> No user in need of a car</p>
            )}
          </Accordion>
        </ScrollArea>
      </Modal>
    </>
  );
}
