import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db";
import { register } from "module";
import { User, UserSession } from "@/models/userTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      //param should be the information to create a session (eventTitle, location, date)
      const { userID, sessionsID, carID } = req.body;

      let result = await db
        .insertInto("userSessions")
        .values({
          userID: userID,
          sessionsID: sessionsID,
          carID: carID,
        })
        .executeTakeFirst();

      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const parameter = req.query.param1;

      let listOfUsers = await db
        .selectFrom("userSessions")
        .selectAll()
        .where("sessionsID", "=", Number(parameter))
        .where("carID", "is", null)
        .execute();

      let result = await db
        .selectFrom("users")
        .selectAll()
        .where(
          "id",
          "in",
          listOfUsers.map((userSession) => userSession.userID)
        )
        .execute();

      // const listOfUsersInSession: User[] = listOfUsers.map((user) => {
      //   user.userID;
      // });
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    const { userID, sessionsID, carID } = req.body;

    //Put userID into carID

    let result = await db
      .updateTable("userSessions")
      .set({ carID: carID })
      .where("userID", "=", userID)
      .where("sessionsID", "=", sessionsID)
      .executeTakeFirst();

    //console.log(result.numChangedRows);

    res.status(200).json(result.numChangedRows?.toString());
  }
}
