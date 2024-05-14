import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db";
import { parseJSON } from "date-fns";
import { RootState } from "@/state/store";
import { UseSelector, useSelector } from "react-redux";
import { Session } from "@/models/userTypes";
import { isFuture } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      //param should be the information to create a session (eventTitle, location, date)
      const { eventTitle, location, date } = req.body;

      let result = await db
        .insertInto("sessions")
        .values({
          eventTitle: eventTitle,
          location: location,
          sessionDate: date,
        })
        .executeTakeFirst();
      console.log(result);

      res.status(200).json("Success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const sessionID = req.query.id;
      const userID = req.query.param1;
      let sessions: Session[] = [];

      if (sessionID) {
        let result = await db
          .selectFrom("sessions")
          .where("id", "=", Number(sessionID))
          .executeTakeFirst();
        console.log("sessionsID triggered in sessions.ts");
        res.status(200).json(result);
      } else {
        let userSessionsInvitedTo = await db
          .selectFrom("userSessions")
          .where("userID", "=", Number(userID))
          .selectAll()
          .execute();

        let sessionsIDs = userSessionsInvitedTo.map(
          (userSession) => userSession.sessionsID
        );

        //console.log(userSessionsInvitedTo);

        let result = await db
          .selectFrom("sessions")
          .selectAll()
          .where("id", "in", sessionsIDs)
          .execute();

        console.log(isFuture(result[3].sessionDate));

        result = result.filter((session) => isFuture(session.sessionDate));

        res.status(200).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
