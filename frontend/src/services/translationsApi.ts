import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Translation } from "@/types";
import type { GetTranslationsParams } from "./types";

export const translationsApi = createApi({
  reducerPath: "translationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getTranslations: builder.query<Translation[], GetTranslationsParams>({
      query: (params) => ({
        url: "/translations",
        params,
      }),
    }),
  }),
});

export const { useGetTranslationsQuery } = translationsApi;
