import { IPost } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postPaginationAPI = createApi({
  reducerPath: "postPaginationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    listPosts: builder.query<IPost[], number | void>({
      // query: (page: number = 1) => `posts?page=${page}&perPage=25`,
      query: (page: number = 1) => ({
        url: "/posts",
        params: {
          _page: page,
        },
      }),
    }),
  }),
});

export const { useListPostsQuery } = postPaginationAPI;

//  "http://localhost:5000/"
