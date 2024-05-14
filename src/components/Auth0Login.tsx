import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";

const LoginButton = () => {
  // const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="filled" component="a" href="/api/auth/login">
      Log In
    </Button>
  );
};

export default LoginButton;