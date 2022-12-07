import { IUser } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], number | void>({
      query: () => ({
        url: "/users",
      }),
    }),
    // Эндпоинт получения пользователей постранично - делаем пагинацию:___
    getUsersPagination: build.query<IUser[], number | void>({
      // Для пагинации соблюдаем последовательность page и limit
      query: (page: number = 1, limit: number = 5) => ({
        url: "/users",
        params: {
          // Для пагинации соблюдаем последовательность page и limit
          _page: page,
          _limit: limit,
        },
      }),
      providesTags: ["User"],
    }),
    // Создание пользователя: ___
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    // Обновление пользователя: ___
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    // Удаление пользователя: ___
    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего userAPI
