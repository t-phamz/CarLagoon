"use client"; // This is a client component 👈🏽
import React, { useState, useEffect, useContext } from "react";
import User from "@/models/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setCarOccupants } from "@/state/carSlice";
import { UseDispatch } from "react-redux";

const AddPassenger: React.FC = () => {
  //Get the data from somewhere (context?) so we know which car and which passenger
  const selectedUserID = useSelector(
    (state: RootState) => state.passenger.passengerID
  );

  const Dispatch = useDispatch();

  const addingPassenger = async () => {
    try {
      const response = await fetch("api/checkCar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passengerID: selectedUserID, ownerID: 3 }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          Dispatch(setCarOccupants(1));
          console.log(data.result);
        }
      } else {
        console.error("Error adding passenger");
      }
    } catch (error) {
      console.error("Error adding passenger", error);
    }
  };

  return (
    <>
      <button onClick={addingPassenger}>Press to add passenger to a car</button>
    </>
  );
};

export default AddPassenger;
