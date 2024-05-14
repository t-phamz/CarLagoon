import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../app/dbOLD";
import User from "@/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const connection = await connectToDatabase();
    const [result] = await connection.execute("SELECT * FROM users");
    connection.end();

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
