import { IUser } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    // Получение пользователей: ___
    fetchAllUsers: build.query<IUser[], number>({
      query: (limit: number = 5) => ({
        url: "/users",
        params: {
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
