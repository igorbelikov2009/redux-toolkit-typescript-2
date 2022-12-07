// import { IProduct } from "./../models/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IProduct } from "../models/types";
export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    // Получаем все products разом, для получения общего количества
    fetchAllPdoructs: build.query<IProduct[], number | void>({
      query: () => ({
        url: "/products",
      }),
    }),
    // Получаем все products постранично - делаем пагинацию
    getProductsPagination: build.query<IProduct[], number | void>({
      // Для пагинации соблюдаем последовательность page и limit
      query: (page: number = 1, limit: number = 10) => ({
        url: "/products",
        params: {
          // Для пагинации соблюдаем последовательность page и limit
          _page: page,
          _limit: limit,
        },
      }),
      providesTags: ["Product"],
    }),
    createProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
