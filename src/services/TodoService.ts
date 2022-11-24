import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ITodo } from "../models/types";

export const todoAPI = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    // Получение todo: ___
    fetchAllTodos: builder.query<ITodo[], number>({
      query: (limit: number = 10) => ({
        url: "/todos",
        params: {
          _limit: limit,
        },
      }),
      providesTags: ["Todo"],
    }),
    // Создание todo: ___
    createTodo: builder.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    // Обновление todo: ___
    updateTodo: builder.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    // Удаление todo: ___
    deleteTodo: builder.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});
// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего todoAPI
