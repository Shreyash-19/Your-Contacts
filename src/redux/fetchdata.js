import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

const initialState = {
  loading: false,
  users: [],
  error: " "
};

export const fetchUsers = createAsyncThunk("user/fetchusers", () => {
  return axios
    .get("https://reqres.in/api/users?page=2")
    .then((response) => response.data.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = " ";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  }
});

export default userSlice.reducer;
