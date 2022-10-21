import { createSlice } from "@reduxjs/toolkit";

export const FORM_TYPES = {DIALOG: "DIALOG", NORMAL: "NORMAL"};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userEditFormType: FORM_TYPES.NORMAL,
    currentPage: 1,
    isFetching: true,
    totalPages: 0,
    totalUsers: 0,
    error: null,
    refetch: false
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.users;
    },
    setTotalUsers(state, action) {
      state.totalUsers = action.payload.totalUsers;
    },
    setUsersTotalPage(state, action) {
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
    },
    setUserEditFormType(state, action) {
      state.userEditFormType = action.payload.userEditFormType;
    }
  },
});

export const usersActions = usersSlice.actions;