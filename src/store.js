import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import formReducer from "./slice/formSlice";
import mapReducer from "./slice/mapSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
