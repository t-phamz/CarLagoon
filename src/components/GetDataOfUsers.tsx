"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import User from "@/models/user";
import { Button } from "@mantine/core";
import TestCar from "../pages/api/CarManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setPassengerID } from "@/state/passengerSlice";

const DisplayUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Initialize with an empty array
  //const [selectedUser, setSelectedUser] = useState<User>();
  const selectedUserID = useSelector(
    (state: RootState) => state.passenger.passengerID
  );
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await fetch("/api/getUserData", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.result);
      } else {
        console.error("Error fetching Users");
      }
    } catch (error) {
      console.error("Error fetching Users", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);

  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
    };
  };

  return (
    <div>
      <Button variant="light" color="gray" onClick={getData} mt={"md"}>
        Press to get Data :D Selected User: {selectedUserID}
      </Button>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="userProfileImg">
            <img
              src={user.img}
              alt={`${user.firstName}'s Image`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              onClick={() => dispatch(setPassengerID(user.id))}
            />
            <span className="profileUserName"> {user.firstName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUser;
