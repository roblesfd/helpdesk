import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const ticketsAdapter = createEntityAdapter({});
const initialState = ticketsAdapter.getInitialState();

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => "/tickets",
      validateStatus: (response, result) => {
        return response.status === 200 && !result;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedTickets = responseData.map((ticket) => {
          ticket.id = ticket._id;
          return ticket;
        });
        return ticketsAdapter.setAll(initialState, loadedTickets);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Ticket", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Ticket", id })),
          ];
        } else return [{ type: "Ticket", id: "LIST" }];
      },
    }),
    getATicket: builder.query({
      query: (id) => `/tickets/${id}`,
    }),
    addNewTicket: builder.mutation({
      query: (initialTicketData) => ({
        url: "/tickets",
        method: "POST",
        body: {
          ...initialTicketData,
        },
      }),
      invalidatesTags: [{ type: "Ticket", id: "LIST" }],
    }),
    updateTicket: builder.mutation({
      query: (initialTicketData) => ({
        url: `/tickets/${initialTicketData._id}`,
        method: "PATCH",
        body: {
          ...initialTicketData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Ticket", id: arg.id }],
    }),
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Ticket", id: arg.id }],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetATicketQuery,
  useAddNewTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketsApiSlice;

export const selectTicketsResult =
  ticketsApiSlice.endpoints.getTickets.select();

const selectTicketsData = createSelector(
  selectTicketsResult,
  (ticketsResult) => ticketsResult.data
);

export const {
  selectAll: selectAllTickets,
  selectById: selectTicketById,
  selectIds: selectTicketIds,
} = ticketsAdapter.getSelectors(
  (state) => selectTicketsData(state) ?? initialState
);
