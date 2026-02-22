import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Version } from "@/types";

export const versionsApi = createApi({
  reducerPath: "versionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Version"],
  endpoints: (builder) => ({
    getVersions: builder.query<Version[], void>({
      query: () => "/versions",
      providesTags: ["Version"],
    }),
    createVersion: builder.mutation<Version, { name: string }>({
      query: (body) => ({ url: "/versions", method: "POST", body }),
      invalidatesTags: ["Version"],
    }),
    publishVersion: builder.mutation<Version, string>({
      query: (id) => ({
        url: `/versions/${id}`,
        method: "PATCH",
        body: { status: "published" },
      }),
      invalidatesTags: ["Version"],
    }),
  }),
});

export const {
  useGetVersionsQuery,
  useCreateVersionMutation,
  usePublishVersionMutation,
} = versionsApi;
