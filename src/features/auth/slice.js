import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SchemaDataService from "../../services/schema.services";
import { setMessage } from "./message.slice";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    console.log(data);
    const result = await SchemaDataService.userLogin(data);
    console.log(result.data);
    localStorage.setItem("token", result.data.token);
    return result.data.data;
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    await thunkAPI.dispatch(setMessage(errorMessage));
    return thunkAPI.rejectWithValue();
  }
});
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const result = await SchemaDataService.userRegister(data);

      return result.data.data;
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      await thunkAPI.dispatch(setMessage(errorMessage));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    localStorage.setItem("token", null);
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    await thunkAPI.dispatch(setMessage(errorMessage));
    return thunkAPI.rejectWithValue();
  }
});

export const authSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isLogedIn: false,
    isLogedOut: false,
    success: false,
    user: {},
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLogedIn = true;
      state.success = true;
      // state.user = action.payload.data;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.isLogedIn = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLogedIn = true;
      state.success = true;
      state.user = action.payload.data;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.isLogedIn = false;
    },
    [logout.pending]: (state, action) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLogedIn = false;
      state.isLogedOut = true;
      state.success = true;
      state.user = {};
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.logout = false;
    },
  },
});
export const { reducer } = authSlice;
export default reducer;
