import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db";
import User from "@/models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const parameter = req.query.param1;
    //console.log(parameter);
    let auth0ID = parameter as string;

    let result = await db
      .selectFrom("users")
      .where("auth0ID", "=", auth0ID)
      .selectAll()
      .executeTakeFirst();

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
