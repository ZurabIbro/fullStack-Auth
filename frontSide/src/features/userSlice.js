import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const fetchUsers = createAsyncThunk("users/fetch", async (_, thunkApi) => {
  try {
    const res = await fetch("http://localhost:4000/users", {
      headers: {
        Authorization: `Bearer ${thunkApi.getState().application.token}`
      },
      
    });
    const users = await res.json();

    if (users.error) {
      return thunkApi.rejectWithValue(users.error);
    }
    return users;
  } catch (e) {
    thunkApi.rejectWithValue(e);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer