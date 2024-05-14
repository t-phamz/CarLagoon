import React, { useState, useEffect } from "react";
import { User, Car } from "@/models/userTypes";
import { db } from "@/app/db";

export async function findUserByID(id: number): Promise<User> {
  let result = await db
    .selectFrom("users")
    .where("id", "=", id)
    .selectAll()
    .execute();

  let foundUser: User = result[0];
  //console.log(foundUser);
  return foundUser;
}
export async function findCarByOwnerID(ownerID: number): Promise<Car> {
  let result = await db
    .selectFrom("cars")
    .where("ownerID", "=", ownerID)
    .selectAll()
    .executeTakeFirst();

  let foundCar: Car = result as Car;
  //console.log(foundUser);
  return foundCar;
}

export async function TestCar() {
  const user = await db.selectFrom("users").selectAll().execute();
  console.log(user);
}

export async function CreateCar(ownerID: number, seats: number) {
  const result = await db
    .insertInto("cars")
    .values({
      seats: seats,
      occupants: 1,
      full: false,
      ownerID: ownerID,
    })
    .executeTakeFirst();
  console.log(result.insertId);
}

export async function FindEmptyCar(): Promise<Car> {
  const availableCar = await db
    .selectFrom("cars")
    .selectAll()
    .where("full", "=", false)
    .executeTakeFirst();
  const tempCar: Car = availableCar as Car;
  console.log(tempCar);

  return tempCar;
}

export async function AddPassengerToCar(
  newPassengerID: number,
  ownerID: number
): Promise<boolean> {
  let emptyCar: Car = await findCarByOwnerID(ownerID);
  let newPassenger: User = await findUserByID(newPassengerID);
  let success = false;

  if (newPassenger.inACar) {
    console.log(newPassenger.firstName + " is already in a car");
  } else if (emptyCar.occupants >= emptyCar.seats || emptyCar.full) {
    console.log("The car is full");
    await db
      .updateTable("cars")
      .set({ full: true, occupants: emptyCar.seats })
      .where("id", "=", emptyCar.id)
      .executeTakeFirst();
  } else if (newPassenger.inACar == false) {
    const resultPassenger = await db
      .updateTable("users")
      .set({ assignedCarID: emptyCar.id, inACar: true })
      .where("id", "=", newPassenger.id)
      .executeTakeFirst();
    console.log("I just updated " + newPassenger.firstName + "'s status");

    const resultCar = await db
      .updateTable("cars")
      .set({ occupants: emptyCar.occupants + 1 })
      .where("id", "=", emptyCar.id)
      .executeTakeFirst();
    console.log("I just updated Car " + emptyCar.id + "'s status");
    success = true;
  }
  return success;
}

// TestCar();
// CreateCar();
// FindEmptyCar();
// AddPassengerToCar(1);
// AddPassengerToCar(4);

export default TestCar;
