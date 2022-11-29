import { IPhoto } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// Создаём и экспортируем API

export const photoAPI = createApi({
  // 1. reducerPath - некоторый уникальный ключ, который будет определять
  //    текущий сервис
  reducerPath: "photoAPI",
  // 2. baseQuery - здесь используем функцию fetchBaseQuery({baseUrl: '....'}),
  //    куда передаём базовый URL
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Photo"],
  endpoints: (build) => ({
    // Эндпоинт получения фото:___
    fetchAllPhotos: build.query<IPhoto[], number>({
      query: (limit: number = 10, page: number = 1) => ({
        url: "/photos",
        params: {
          _limit: limit,
          _page: page,
        },
      }),
      providesTags: (result) => ["Photo"],
    }),

    // Эндпоинт создания фото:___
    createPhoto: build.mutation<IPhoto, IPhoto>({
      query: (photo) => ({
        url: "/photos",
        method: "POST",
        body: photo,
      }),
      invalidatesTags: ["Photo"],
    }),

    // Эндпоинт обновления фото:___
    updatePhoto: build.mutation<IPhoto, IPhoto>({
      query: (photo) => ({
        // указываем id фото, который мы ходим обновить
        url: `/photos/${photo.id}`,
        method: "PUT",
        body: photo,
      }),
      invalidatesTags: ["Photo"],
    }),

    // Эндпоинт удаления фото:___
    deletePhoto: build.mutation<IPhoto, IPhoto>({
      query: (photo) => ({
        url: `/photos/${photo.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Photo"],
    }),
  }),
});

//
// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего photoAPI
