import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button component="a" href="/api/auth/logout">
      Log Out
    </Button>
  );
};

export default LogoutButton;
