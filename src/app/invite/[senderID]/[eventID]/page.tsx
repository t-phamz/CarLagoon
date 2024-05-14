"use client"; // This is a client component 👈🏽
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useRouter } from "next/navigation";

// router.push sender dig tilbage til "home" page

export default function InvitePage({
  params,
}: {
  params: { senderID: string; eventID: string };
}) {
  const router = useRouter();
  const userID = useSelector((state: RootState) => state.currentUser);
  useEffect(() => {
    if (params.senderID && params.eventID && userID.currentUserID != 0) {
      //UpdateInvite(Number(params.senderID), Number(params.eventID), userID);
      router.push("/");
    }
  });

  console.log(
    "senderID: " + params.senderID,
    " eventID: " + params.eventID,
    " userID: " + userID
  );

  return (
    <div style={{ color: "white" }}>
      <p>Sender ID: {params.senderID}</p>
      <p>Event ID: {params.eventID}</p>
      <p>user ID: {userID.currentUserID}</p>
    </div>
  );
}

async function UpdateInvite(senderID: number, eventID: number, userID: number) {
  try {
    const response = await fetch("/api/invitations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionsID: eventID,
        userID: userID,
        senderID: senderID,
      }),
    });
    if (response.status === 201) {
      console.log("Invitation accepted");
    } else {
      console.log(
        "Error with invitation " + response.status + " " + response.statusText
      );
    }
  } catch (error) {
    console.error(error);
  }
}
