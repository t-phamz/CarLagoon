import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

interface currentUserState {
  currentUserID: number;
  currentUserName: string;
  currentUserCarID: number;
  currentAuth0ID: string;
  UserCreatedSuccessfully: boolean;
  currentUserSessionID: number;
  currentUserSessionName: string;
}

const initialState: currentUserState = {
  currentUserID: 0,
  currentUserName: "Not Set",
  currentUserCarID: 0,
  currentAuth0ID: "",
  UserCreatedSuccessfully: false,
  currentUserSessionID: 0,
  currentUserSessionName: "Not Set",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUserID: (state, action) => {
      state.currentUserID = action.payload;
    },
    setCurrentUserName: (state, action) => {
      state.currentUserName = action.payload;
    },
    setCurrentUserCarID: (state, action) => {
      state.currentUserCarID = parseInt(action.payload);
    },
    setCurrentAuth0ID: (state, action) => {
      state.currentAuth0ID = action.payload;
      // console.log("Current Auth0 ID in store: " + state.currentAuth0ID);
    },
    setUserCreatedSuccessfully: (state) => {
      state.UserCreatedSuccessfully = !state.UserCreatedSuccessfully;
    },
    setCurrentUserSession: (state, action) => {
      const array = action.payload.split(",");
      state.currentUserSessionID = array[0];
      state.currentUserSessionName = array[1];
    },
  },
});

export const {
  setCurrentUserID,
  setCurrentUserName,
  setCurrentUserCarID,
  setCurrentAuth0ID,
  setUserCreatedSuccessfully,
  setCurrentUserSession,
} = currentUserSlice.actions;
export default currentUserSlice.reducer;
