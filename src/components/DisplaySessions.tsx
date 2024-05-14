import "@/styles/globals.css";

import {
  Accordion,
  Button,
  Modal,
  ScrollArea,
  Grid,
  Text,
  Space,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Session } from "@/models/userTypes";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setCurrentUserSession } from "@/state/currentUserSlice";

async function getSessions(userID: number) {
  const response = await fetch(
    "/api/sessions?" + "param1=" + encodeURI(userID.toString()),
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    //console.log(data);
    return data;
  } else {
    console.error("Error in getting sessions " + response.status);
    return { id: 0, eventTitle: "", location: "", sessionDate: "" };
  }
}

async function Invite(sessionID: number, senderID: number) {
  try {
    const response = await fetch("/api/invitations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionID: sessionID, senderID: senderID }),
    });
    if (response.status === 200) {
      console.log("User created successfully");

      notifications.show({
        title: "Invitation created",
        message:
          "Invitation link is copied to clipboard" +
          <br /> +
          "http://localhost:3000/invite/" +
          senderID +
          "/" +
          sessionID,
      });
      navigator.clipboard.writeText(
        "http://localhost:3000/invite/" + senderID + "/" + sessionID
      );
    } else if (response.status == 400) {
      notifications.show({
        title: "Invitation link is copied to clipboard",
        message:
          "Invitation link is copied to clipboard" +
          <br /> +
          "http://localhost:3000/invite/" +
          senderID +
          "/" +
          sessionID,
      });
      navigator.clipboard.writeText(
        "http://localhost:3000/invite/" + senderID + "/" + sessionID
      );
    } else {
      console.log(
        "Error creating invitation " +
          response.status +
          " " +
          response.statusText
      );
    }
  } catch (error) {
    console.error("Error creating invitation:", error);
  }
}

export default function DisplaySessions() {
  const { user } = useUser();
  const [sessions, setSessions] = useState<Session[]>([]);
  const userID = useSelector((state: RootState) => state.currentUser);
  const [opened, { open, close }] = useDisclosure(false);
  const Dispatch = useDispatch();
  let incrementer: number = 0;

  useEffect(() => {
    if (userID.currentUserID !== 0) {
      const fetchData = async () => {
        try {
          const ret = await getSessions(userID.currentUserID);
          setSessions(ret);
          //console.log("useEffect: " + sessions[0].sessionDate);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [userID, opened]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Button onClick={open}>Event List</Button>
      <Modal opened={opened} onClose={close} title="Upcoming events">
        <ScrollArea h={260}>
          <Accordion w={400} variant="contained">
            {sessions && sessions.length > 0 ? (
              sessions?.map((session) => (
                <Accordion.Item
                  key={session.id}
                  value={session.eventTitle}
                  title={session.eventTitle}
                >
                  <Accordion.Control>
                    <Text>
                      {session.eventTitle +
                        " - " +
                        format(session.sessionDate, "d MMMM HH:mm")}
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    {"Location: " + session.location}
                    <Space h={"xs"} />
                    <Grid justify="space-between" align="center" gutter={"sm"}>
                      <Grid.Col span={"content"}>
                        <Button
                          onClick={() =>
                            Dispatch(
                              setCurrentUserSession(
                                session.id + "," + session.eventTitle
                              )
                            )
                          }
                        >
                          Set as event
                        </Button>
                      </Grid.Col>
                      <Grid.Col span={"content"}>
                        <Button
                          onClick={() =>
                            Invite(session.id, userID.currentUserID)
                          }
                        >
                          Get invitation link
                        </Button>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
              ))
            ) : (
              <p> No sessions left</p>
            )}
          </Accordion>
        </ScrollArea>
      </Modal>
    </>
  );
}
