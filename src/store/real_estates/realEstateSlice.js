import { createSlice } from "@reduxjs/toolkit";

export const realEstatesSlice = createSlice({
  name: "realEstates",
  initialState: {
    realEstates: [],
    currentPage: 1,
    isFetching: true,
    totalPages: null,
    error: null,
    refetch: false
  },
  reducers: {
    setRealEstate(state, action) {
      state.realEstates = action.payload.realEstates;
    },
    setRealEstateTotalPage(state, action) {
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

export const realEstatesActions = realEstatesSlice.actions;