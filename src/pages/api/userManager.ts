import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db";
import User from "@/models/user";
import { CreateCar } from "@/pages/api/CarManager";
import { RootState, store } from "@/state/store";
import { useSelector } from "react-redux";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  // Missing  location, img
  try {
    // const newUserAuthID = store.getState().currentUser.currentAuth0ID;
    const { firstName, lastName, carSeats, auth0ID } = req.body;
    //console.log(req.body);
    //console.log("auth0ID in API: " + auth0ID);

    //create User
    let resultUser = await db
      .insertInto("users")
      .values({
        firstName: firstName,
        lastName: lastName,
        inACar: false,
        auth0ID: auth0ID,
      })
      .executeTakeFirst();

    //console.log(resultUser.insertId + " " + resultUser);

    const newUserID = Number(resultUser.insertId);

    //Create Car if carSeats > 0
    if (carSeats > 0) {
      CreateCar(newUserID, carSeats);
      //console.log("Car created");
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
