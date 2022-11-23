import { IProducts } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    fetchAllProducts: build.query<IProducts[], number>({
      query: (limit: number = 10) => ({
        url: "/products",
        params: {
          _limit: limit,
        },
      }),
      providesTags: ["Product"],
    }),
  }),
});
