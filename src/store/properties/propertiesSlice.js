import { createSlice } from "@reduxjs/toolkit";

export const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    currentPage: 1,
    isFetching: true,
    totalPages: null,
    error: null,
    refetch: false
  },
  reducers: {
    setProperties(state, action) {
      state.properties = action.payload.properties;
    },
    setPropertiesTotalPage(state, action) {
      state.totalPages = action.payload.totalPages;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload.currentPage;
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload.isFetching;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
    setRefetch(state, action) {
      state.refetch = action.payload;
    }
  },
});

export const propertiesActions = propertiesSlice.actions;