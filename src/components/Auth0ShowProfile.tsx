import React, { use, useEffect, useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ReactCreateNewUser from "./ReactCreateNewUser";
import LoginButton from "./Auth0Login";
import LogoutButton from "./Auth0Logout";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setPassengerID } from "@/state/passengerSlice";
import {
  setCurrentUserID,
  setCurrentUserName,
  setCurrentUserCarID,
  setCurrentAuth0ID,
} from "@/state/currentUserSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { Card, Image, Text, Center } from "@mantine/core";
import ShowCar from "./ReactCarInfo";
import DisplaySessions from "./DisplaySessions";

async function isUserInDB(auth0ID: string | undefined, dispatch: Dispatch) {
  //en get hvor param1 er deres auth0ID
  const response = await fetch(
    "/api/checkAuthToUser?" + "param1=" + encodeURI(auth0ID as string),
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const data = await response.json();
    //console.log(data.result);
    //hvis data.result er undefined eller null, så er brugeren ikke i DB men logget på
    if (data.result === undefined || data.result === null) {
      console.log("User not in DB");
      console.log("auth0ID in Profile: " + auth0ID);
      dispatch(setCurrentAuth0ID(auth0ID));
    } else {
      dispatch(setCurrentUserID(data.result.id));
      dispatch(
        setCurrentUserName(data.result.firstName + " " + data.result.lastName)
      );
      dispatch(setCurrentUserCarID(data.result.CarID));
    }
  } else {
    console.error("Error in checking if user is in DB" + response.status);
  }
}

const Profile = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const { user, isLoading } = useUser();
  const [isUserInDBBool, setIsUserInDBBool] = useState(false);
  const [currentUserSession, setCurrentUserSession] = useState("");

  const dispatch = useDispatch();

  if (isLoading) {
    return <LoginButton />;
  }

  if (user && user.sub && !isLoading) {
    isUserInDB(user.sub, dispatch);
    if (currentUser.currentUserID === 0) {
      return (
        <>
          <LogoutButton />
          <ReactCreateNewUser />
        </>
      );
    }
    return (
      <>
        <LogoutButton />
        <Card
          shadow="sm"
          padding="md"
          w={200}
          h={250}
          style={{
            position: "fixed",
            top: "25px",
            right: "25px",
            color: "black",
          }}
          radius={15}
        >
          <Center>
            <Card.Section>
              {user.name && (
                <Image
                  src={user.picture}
                  alt={user.name}
                  h={100}
                  w={100}
                  mt={15}
                />
              )}
            </Card.Section>
          </Center>
          <Card.Section>
            <Text lineClamp={3} mt={15} ta="center">
              {currentUser.currentUserName}
              <br />
              Current session:
              <br />
              {currentUser.currentUserSessionName}
            </Text>
          </Card.Section>
          <Card.Section>
            {<ShowCar ownerID={currentUser.currentUserID} />}
          </Card.Section>
        </Card>
      </>
    );
  } else {
    return (
      <div>
        <LoginButton />
        Please login or create a new user
      </div>
    );
  }
};

export default Profile;
