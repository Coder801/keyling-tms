import { configureStore } from "@reduxjs/toolkit";
import { translationsApi } from "../services/translationsApi";
import { versionsApi } from "../services/versionsApi";
import { languagesApi } from "../services/languagesApi";

export const store = configureStore({
  reducer: {
    [translationsApi.reducerPath]: translationsApi.reducer,
    [versionsApi.reducerPath]: versionsApi.reducer,
    [languagesApi.reducerPath]: languagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(translationsApi.middleware)
      .concat(versionsApi.middleware)
      .concat(languagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
