import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      //Create Invitation
      const { sessionID, senderID } = req.body;
      let result = { insertId: 0 };

      let existingRecord = await db
        .selectFrom("invitations")
        .where("sessionID", "=", sessionID)
        .where("senderID", "=", senderID)
        .selectAll()
        .executeTakeFirst();

      if (existingRecord) {
        res.status(400).json({ error: "Invitation already exists" });
      } else {
        let result = await db
          .insertInto("invitations")
          .values({
            sessionID: sessionID,
            senderID: senderID,
            invitationsAccepted: 0,
          })
          .executeTakeFirst();
      }

      res.status(200).json(result.insertId?.toString());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { sessionsID, userID, senderID } = req.body;
      //Updates how many have accepted through an invitation

      if (userID != 0) {
        let result = await db
          .updateTable("invitations")
          .set((eb) => ({
            invitationsAccepted: eb("invitationsAccepted", "+", 1),
          }))
          .where("sessionID", "=", sessionsID)
          .where("senderID", "=", senderID)
          .executeTakeFirst();

        // creates an userSessions if the user accepts the invitation
        let resultUserSession = await db
          .insertInto("userSessions")
          .values({ userID: userID, sessionsID: sessionsID, carID: null });
        res.status(201).json({ result });
      } else {
        res.status(400).json({ error: "User not logged in" });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
