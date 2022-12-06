import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ITodo } from "../models/types";

export const todoAPI = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    // Получение всех todo для вычисления значения totalCount для пагинации
    getAllTodos: builder.query<ITodo[], number | void>({
      query: () => ({
        url: "/todos",
      }),
    }),
    // Получение todo постранично: ___ делаем пагинацию
    getTodoPageByPage: builder.query<ITodo[], number | void>({
      query: (page: number = 1, limit: number = 10) => ({
        url: "/todos",
        params: {
          _page: page,
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
