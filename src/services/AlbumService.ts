import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAlbum } from "../models/types";

export const albumAPI = createApi({
  reducerPath: "albumAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Album"],
  endpoints: (build) => ({
    // Эндпоинт получения:_____
    fetchAllAlbums: build.query<IAlbum[], number>({
      query: (limit: number = 10) => ({
        url: "/albums",
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Album"], // указываем, что эндпоинт fetchAllAlbums
      // работает с тэгом ["Album"]
    }),
    // Эндпоинт создания:_____
    createAlbum: build.mutation<IAlbum, IAlbum>({
      query: (album) => ({
        url: "/albums",
        method: "POST",
        body: album,
      }),
      invalidatesTags: ["Album"], // прежние данные делаем неактуальными при помощи
      // этого тэга
    }),
    // Эндпоинт обновления:_____
    updateAlbum: build.mutation<IAlbum, IAlbum>({
      query: (album) => ({
        // указываем id, который мы ходим обновить
        url: `/albums/${album.id}`,
        method: "PUT",
        body: album,
      }),
      invalidatesTags: ["Album"], // прежние данные делаем неактуальными при помощи
      // этого тэга
    }),
    // Эндпоинт удаления:_____
    deleteAlbum: build.mutation<IAlbum, IAlbum>({
      query: (album) => ({
        // указываем id, который мы ходим удалить
        url: `/albums/${album.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Album"], // прежние данные делаем неактуальными при помощи
      // этого тэга
    }),
  }),
});

//
// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего albumAPI
