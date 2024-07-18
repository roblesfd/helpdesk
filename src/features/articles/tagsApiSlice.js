import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const tagsAdapter = createEntityAdapter({});
const initialState = tagsAdapter.getInitialState();

export const tagsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => "/tags",
      validateStatus: (response, result) => {
        return response.status === 200 && !result;
      },
    }),
    addNewTag: builder.mutation({
      query: (initialTagData) => ({
        url: "/tags",
        method: "POST",
        body: {
          ...initialTagData,
        },
      }),
      invalidatesTags: [{ type: "Tag", id: "LIST" }],
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/tags/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Tag", id: arg.id }],
    }),
  }),
});

export const { useGetTagsQuery, useAddNewTagMutation, useDeleteTagMutation } =
  tagsApiSlice;

export const selectTagsResult = tagsApiSlice.endpoints.getTags.select();

const selectTagsData = createSelector(
  selectTagsResult,
  (tagsResult) => tagsResult.data
);

export const { selectAll: selectAllTags } = tagsAdapter.getSelectors(
  (state) => selectTagsData(state) ?? initialState
);
