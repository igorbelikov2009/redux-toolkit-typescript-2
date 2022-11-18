import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { ITodo } from "../models/types";

export const todoAPI = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    fetchAllTodos: builder.query<ITodo[], number>({
      query: (limit: number = 10) => ({
        url: "/todos",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});
// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего todoAPI
