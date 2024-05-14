import React, { use, useEffect } from "react";
import { Form, useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Group,
  NumberInput,
  Modal,
  rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { setUserCreatedSuccessfully } from "@/state/currentUserSlice";

async function handleSubmit(
  values: {
    firstName: string;
    lastName: string;
    carSeats: number;
    location: string;
    auth0ID: string;
  },
  dispatch: any
) {
  try {
    const response = await fetch("/api/userManager", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log("ReactCreateNewUser: " + JSON.stringify(values));
    if (response.status === 201) {
      // User created successfully
      console.log("User created successfully");
      dispatch(setUserCreatedSuccessfully());

      notifications.show({
        title: "User Creation",
        message: "User created successfully",
      });

      // return <Profile />;
    } else {
      console.error(
        "Error creating user " + response.status + " " + response.statusText
      );
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

function ReactCreateNewUser() {
  const [opened, { open, close }] = useDisclosure(true);
  const newUserAuthID = useSelector(
    (state: RootState) => state.currentUser.currentAuth0ID
  );

  let userCreatedSuccessfully = useSelector(
    (state: RootState) => state.currentUser.UserCreatedSuccessfully
  );
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      carSeats: 0,
      location: "Unknown",
      auth0ID: newUserAuthID,
    },
    validate: {
      carSeats: (value) => {
        if (value < -1) {
          return "Please input valid number";
        } else if (value > 15) {
          return "Car seats must be a number less than 15";
        }
      },
    },
  });

  useEffect(() => {
    form.setValues({ auth0ID: newUserAuthID });
  }, [newUserAuthID]);

  // useEffect(() => {
  //   notifications.clean();
  //   notifications.show({
  //     title: "User Creation",
  //     message: "User created successfully",
  //   });

  if (userCreatedSuccessfully) {
    return;
  }

  return (
    <>
      <Button onClick={open} variant="light" color="gray">
        User Creation Menu
      </Button>
      <Modal opened={opened} onClose={close} title="User Creation">
        <Box maw={350} mx={"auto"}>
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values, dispatch))}
          >
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="First Name"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              withAsterisk
              label="Last Name"
              placeholder="Last Name"
              {...form.getInputProps("lastName")}
            />
            <NumberInput
              withAsterisk
              label="Number of seats in the car (0 if no car)"
              placeholder="Number of seats in the car (0 if no car)"
              {...form.getInputProps("carSeats")}
            />

            <Group justify="flex-end" mt={"md"}>
              <Button type="submit" mt={"md"} onClick={close}>
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
}
export default ReactCreateNewUser;
