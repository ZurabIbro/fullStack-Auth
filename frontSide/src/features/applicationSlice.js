import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import exp from "constants";

const initialState = {
  error: null,
  singingUp: false,
  singingIn: false,
  token: '',
};

export const authSignUp = createAsyncThunk("auth/signup", async ({ login, password }, thunkApi) => {
  try {
    const res = await fetch("http://localhost:4000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await res.json();

    if (json.error) {
      return thunkApi.rejectWithValue(json.error);
    }
    return json;
  } catch (e) {
    thunkApi.rejectWithValue(e);
  }
});

export const authSignIn = createAsyncThunk("auth/signin", async ({ login, password }, thunkApi) => {
  try {
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ login, password }),
    });
    const token = await res.json();
    console.log(token);
    if (token.error) {
      return thunkApi.rejectWithValue(token.error);
    }
    localStorage.setItem("token", token);
    return token;
  } catch (e) {
    thunkApi.rejectWithValue(e);
  }
});

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state, action) => {
        state.singingUp = true;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.singingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.singingUp = false;
        state.error = null;
      })
      .addCase(authSignIn.pending, (state, action) => {
        state.singingIn = true;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.singingIn = false;
        state.error = action.payload;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.singingIn = false;
        state.error = null;
        state.token = action.payload;
      });
  },
});

export default applicationSlice.reducer;
