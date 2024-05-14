"use client"; // This is a client component 👈🏽
import React from "react";
import "@/styles/globals.css";
import Profile from "@/components/Auth0ShowProfile";
import CreateSessions from "@/components/CreateSessions";
import DisplaySessions from "@/components/DisplaySessions";
import DisplayUsersInSessions from "@/components/DisplayUsersInSession";

export default function Home() {
  return (
    <main>
      <DisplaySessions />
      <DisplayUsersInSessions />
      <Profile />
      <CreateSessions />
    </main>
  );
}
