import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Language } from "@/types";

export const languagesApi = createApi({
  reducerPath: "languagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Language"],
  endpoints: (builder) => ({
    getLanguages: builder.query<Language[], void>({
      query: () => "/languages",
      providesTags: ["Language"],
    }),
    createLanguage: builder.mutation<Language, { name: string; code: string; flag?: string }>({
      query: (body) => ({ url: "/languages", method: "POST", body }),
      invalidatesTags: ["Language"],
    }),
    updateLanguage: builder.mutation<Language, { id: string; status?: string; flag?: string }>({
      query: ({ id, ...body }) => ({ url: `/languages/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Language"],
    }),
    deleteLanguage: builder.mutation<{ id: string }, string>({
      query: (id) => ({ url: `/languages/${id}`, method: "DELETE" }),
      invalidatesTags: ["Language"],
    }),
  }),
});

export const {
  useGetLanguagesQuery,
  useCreateLanguageMutation,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
} = languagesApi;
