import { createSlice } from "@reduxjs/toolkit";

interface userCreatedState {
  userCreatedSuccessfully: boolean;
}

const initialState: userCreatedState = {
  userCreatedSuccessfully: false,
};
