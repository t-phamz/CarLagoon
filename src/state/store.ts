import { configureStore } from "@reduxjs/toolkit";
import passengerReducer from "./passengerSlice";
import carReducer from "./carSlice";
import currentUserReducer from "./currentUserSlice";

export const store = configureStore({
  reducer: {
    passenger: passengerReducer,
    car: carReducer,
    currentUser: currentUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
