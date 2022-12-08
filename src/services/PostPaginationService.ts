import { IPost } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postPaginationAPI = createApi({
  reducerPath: "postPaginationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Получаем все посты разом
    getAllPosts: builder.query<IPost[], number | void>({
      query: () => ({
        url: "/posts",
      }),
    }),
  }),
});

//  "http://localhost:5000/"
/* 
// Получить заказы
export const fetchOrders = async ({
  limit,
  page,
  complete,
}: fetchOrdersProps): Promise<fetchOrdersProps> => {
  const { data } = await $authHost.get(
    `api/orders?limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};
*/
