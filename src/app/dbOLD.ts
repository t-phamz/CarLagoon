import mysql, { Connection, OkPacket } from "mysql2/promise";

async function connectToDatabase(): Promise<Connection> {
  const connection = await mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
  });
  return connection;
}

export { connectToDatabase };
