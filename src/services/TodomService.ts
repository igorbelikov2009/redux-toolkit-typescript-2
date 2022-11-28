import { ITodom } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const todomAPI = createApi({
  reducerPath: "todomAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Todoms"], // Здесь мы дали уникальное название
  endpoints: (build) => ({
    // Эндпоинт на получение - это главный эндпоинт.
    getAllTodoms: build.query<ITodom[], number | string>({
      // Проверяем: существует limit или нет. Если существует, то передаём ему значение из параметров.
      // Параметры на странице TodomApiContainer в хуке todomAPI.useGetAllTodomsQuery(25)
      query: (limit: number | string = "") => `todoms?${limit && `_limit=${limit}`}`,
      // Эндпоинт на получение - это главный эндпоинт. В него мы добавляем провайдТегс.
      providesTags: ["Todoms"],
    }),
    addTodom: build.mutation<ITodom, ITodom>({
      query: (body) => ({
        url: "todoms",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todoms"], // при мутации мы говорим, что у нас произошли изменения.
    }),
    deleteTodom: build.mutation<ITodom, ITodom>({
      query: (todom) => ({
        url: `todoms/${todom.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todoms"], // мы говорим, пускай наш список обновится
    }),
  }),
});

export const { useGetAllTodomsQuery } = todomAPI; // Мне так не нравится.
// Буду доставать хук на нужной страницы из todomAPI , как ниже
// const {} = todomAPI.useGetAllTodomsQuery(limit)
