"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import User from "@/models/user";

import TestCar from "../pages/api/CarManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setPassengerID } from "@/state/passengerSlice";
import { setCarOccupants } from "@/state/carSlice";

const ResetTest: React.FC = () => {
  const dispatch = useDispatch();
  const resetData = async () => {
    try {
      const response = await fetch("/api/resetData", {
        method: "PUT",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setCarOccupants(-2));
      } else {
        console.error("Error fetching Users");
      }
    } catch (error) {
      console.error("Error fetching Users", error);
    }
  };

  const clickHandler = () => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
    };
  };

  return (
    <div>
      <button onClick={resetData}>Press to Reset Data</button>
    </div>
  );
};

export default ResetTest;
