interface User {
  id: number;
  auth0ID: string;
  firstName: string;
  lastName: string;
  CarID: number;
  carSeats?: number;
  location: string;
  img: string;
}

export default User;
