import { createSlice } from "@reduxjs/toolkit";

interface carState {
  carID: number;
  ownerID: number;
  seats: number;
  occupants: number;
  full: boolean;
}

const initialState: carState = {
  carID: 0,
  ownerID: 0,
  seats: 0,
  occupants: 1,
  full: false,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCarID: (state, action) => {
      state.carID = action.payload;
    },
    setCarSeats: (state, action) => {
      state.seats = action.payload;
    },
    setCarOccupants: (state, action) => {
      state.occupants += action.payload;
      if (action.payload == -2) {
        state.occupants = 1;
      }
      console.log(state.occupants);
    },
    setCarFull: (state, action) => {
      state.full = action.payload;
    },
  },
});

export const { setCarID, setCarSeats, setCarFull, setCarOccupants } =
  carSlice.actions;
export default carSlice.reducer;
