import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db";
import * as carManager from "@/pages/api/CarManager";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      console.log("Adding passenger to car");
      const { ownerID, passengerID } = req.body;
      let result = await carManager.AddPassengerToCar(passengerID, ownerID);
      console.log("in API Result CheckCar: " + result);
      res.status(200).json({ result });

      res.status(201).json({
        message:
          "User: " +
          passengerID +
          " added to car: " +
          ownerID +
          " successfully.",
      });
    } catch (error) {
      console.error("Error adding passenger to car:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method == "GET") {
    try {
      const parameter = req.query.param1 as string;
      const result = await carManager.findCarByOwnerID(parseInt(parameter));

      res.status(200).json({ result });
    } catch (error) {
      console.error("Error adding passenger to car:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
