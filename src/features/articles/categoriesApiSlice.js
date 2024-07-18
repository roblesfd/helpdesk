import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const categoriesAdapter = createEntityAdapter({});
const initialState = categoriesAdapter.getInitialState();

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categorias",
      validateStatus: (response, result) => {
        return response.status === 200 && !result;
      },
    }),
    addNewCategories: builder.mutation({
      query: (initialCategoryData) => ({
        url: "/categorias",
        method: "POST",
        body: {
          ...initialCategoryData,
        },
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categorias/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddNewCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;

export const selectCategoriesResult =
  categoriesApiSlice.endpoints.getCategories.select();

const selectCategoriesData = createSelector(
  selectCategoriesResult,
  (categoriesResult) => categoriesResult.data
);

export const { selectAll: selectAllCategories } =
  categoriesAdapter.getSelectors(
    (state) => selectCategoriesData(state) ?? initialState
  );
