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
      query: (limit: number = 10) => ({
        url: "/photos",
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Photo"],
    }),
  }),
});

//
// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего photoAPI
