import { configureStore } from "@reduxjs/toolkit";
import { translationsApi } from "../services/translationsApi";
import { versionsApi } from "../services/versionsApi";

export const store = configureStore({
  reducer: {
    [translationsApi.reducerPath]: translationsApi.reducer,
    [versionsApi.reducerPath]: versionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(translationsApi.middleware)
      .concat(versionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
