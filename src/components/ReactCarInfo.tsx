import Car from "@/models/car";
import { SimpleGrid, Center, Text } from "@mantine/core";
import { IconArmchair, IconCircleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { findCarByOwnerID } from "@/pages/api/CarManager";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

async function GetDataOfCar(ownerID: number): Promise<Car> {
  const response = await fetch(
    "/api/checkCar?" + "param1=" + encodeURI(ownerID.toString()),
    { method: "GET" }
  );
  if (response.ok) {
    var data = await response.json();
    //console.log(data.result.result);
  } else {
    console.error("Error in getting car data " + response.status);
  }
  return data.result;
}

type ShowCarProps = {
  ownerID: number;
};

function ShowCar({ ownerID }: ShowCarProps) {
  const [userCar, setUserCar] = useState<Car | null>(null);
  const [carSeats, setCarSeats] = useState<Array<Boolean>>([]);
  const storeCar = useSelector((state: RootState) => state.car);

  useEffect(() => {
    const fetchData = async () => {
      const car = await GetDataOfCar(ownerID);
      setUserCar(car);
      let seatsArray = new Array(car.seats).fill(false);

      for (let i = 0; i < car.occupants; i++) {
        seatsArray[i] = true;
        //console.log("in fetchData");
      }
      setCarSeats(seatsArray);
    };
    fetchData();
  }, [storeCar.occupants]);

  if (!userCar) {
    return <>loading</>;
  }

  var numberOfSeats = userCar.seats;
  var occupants = userCar.occupants;
  var full = userCar.full;
  var columnCount = 0;
  let test = ownerID;

  //let carSeats = new Array(numberOfSeats).fill(seat);

  if (userCar.full) {
    occupants = numberOfSeats;
  }

  //console.log(carSeats);

  if (numberOfSeats <= 5) {
    columnCount = 3;
  } else if (numberOfSeats >= 6) {
    columnCount = 4;
  }

  if (userCar) {
    //console.log(userCar);
  }

  if (numberOfSeats >= 10) {
    return (
      <Center>
        <Text>{occupants + "/" + numberOfSeats}</Text>
      </Center>
    );
  }

  return (
    <Center>
      <SimpleGrid
        cols={columnCount}
        spacing="0px"
        verticalSpacing="0px"
        w={100}
      >
        {carSeats.map((seat, index) => (
          <IconCircleFilled
            key={index}
            size={25}
            color={seat ? "red" : "green"}
            style={{ margin: "0px" }}
          />
        ))}
      </SimpleGrid>
    </Center>
  );
}

export default ShowCar;
