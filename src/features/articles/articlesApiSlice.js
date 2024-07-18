import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const articlesAdapter = createEntityAdapter({});
const initialState = articlesAdapter.getInitialState();

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "/articulos",
      validateStatus: (response, result) => {
        return response.status === 200 && !result;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedArticles = responseData.map((article) => {
          article.id = article._id;
          return article;
        });
        return articlesAdapter.setAll(initialState, loadedArticles);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Article", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Article", id })),
          ];
        } else return [{ type: "Article", id: "LIST" }];
      },
    }),
    getAnArticle: builder.query({
      query: (id) => `/articulos/${id}`,
    }),
    searchForArticles: builder.query({
      query: (query) => ({
        url: `/articulos/search`,
        params: { query },
      }),
    }),
    addNewArticle: builder.mutation({
      query: (initialArticleData) => ({
        url: "/articulos",
        method: "POST",
        body: {
          ...initialArticleData,
        },
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),
    updateArticle: builder.mutation({
      query: (initialArticleData) => ({
        url: `/articulos/${initialArticleData._id}`,
        method: "PATCH",
        body: {
          ...initialArticleData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Article", id: arg.id },
      ],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/articulos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Article", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetAnArticleQuery,
  useSearchForArticlesQuery,
  useAddNewArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApiSlice;

export const selectarticlesResult =
  articlesApiSlice.endpoints.getArticles.select();

const selectArticlesData = createSelector(
  selectarticlesResult,
  (articlesResult) => articlesResult.data
);

export const {
  selectAll: selectAllArticles,
  selectById: selectArticleById,
  selectIds: selectArticleIds,
} = articlesAdapter.getSelectors(
  (state) => selectArticlesData(state) ?? initialState
);
