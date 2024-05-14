import * as crypto from "crypto";
import { UseSelector, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { Button } from "@mantine/core";
import { RootState } from "@/state/store";

async function createInvitation(sessionID: number, senderID: number) {
  try {
    const combinedIDs = sessionID + senderID;
    const response = await fetch("/api/invitations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedIDs),
    });
    console.log("CreateInvitation: " + JSON.stringify(combinedIDs));
    if (response.status === 201) {
      console.log("User created successfully");

      notifications.show({
        title: "Invitation created",
        message: "Invitation Created successfully",
      });
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

export default function CreateInvitation() {
  const { isAuthenticated, user } = useAuth0();
  const [sessionID, setSessionID] = useState(0);
  const senderID = useSelector(
    (state: RootState) => state.currentUser.currentUserID
  );

  return (
    <>
      <Button onClick={() => createInvitation(1, senderID)}>
        Create Invitation
      </Button>
    </>
  );
}
