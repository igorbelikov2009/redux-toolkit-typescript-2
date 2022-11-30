import { IPost } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// interface IListResponse {
//   page: number;
//   per_page;
// }

export const postPaginationAPI = createApi({
  reducerPath: "postPaginationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    listPosts: builder.query<IPost[], number | void>({
      // query: (page: number = 1) => `posts?page=${page}&perPage=25`,
      query: (page: number = 1, limit: number = 10) => ({
        url: "/posts",
        params: {
          _page: page,
          _limit: limit,
        },
      }),
    }),
  }),
});

export const { useListPostsQuery } = postPaginationAPI;

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
