import { createSlice } from "@reduxjs/toolkit";

interface passengerState {
  passengerID: number;
}

const initialState: passengerState = {
  passengerID: 0,
};

const passengerSlice = createSlice({
  name: "passenger",
  initialState,
  reducers: {
    setPassengerID: (state, action) => {
      state.passengerID = action.payload;
    },
  },
});
export const { setPassengerID } = passengerSlice.actions;
export default passengerSlice.reducer;
