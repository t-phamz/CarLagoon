import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    await db
      .updateTable("cars")
      .set({ full: false, occupants: 1 })
      .where("id", ">", 0)
      .execute();

    await db
      .updateTable("users")
      .set({ inACar: false, assignedCarID: 0 })
      .where("id", ">", 0)
      .execute();

    res.status(200).json({ message: "PUT request handled successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
