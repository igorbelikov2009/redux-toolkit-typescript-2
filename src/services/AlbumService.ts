import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAlbum } from "../models/types";

export const albumAPI = createApi({
  reducerPath: "albumAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Album"],
  endpoints: (build) => ({
    // Эндпоинт получения :_____
    fetchAllAlbums: build.query<IAlbum[], number>({
      query: (limit: number = 10) => ({
        url: "/albums",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

//
// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего albumAPI
