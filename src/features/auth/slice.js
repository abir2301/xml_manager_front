import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SchemaDataService from "../../services/schema.services";
import { setMessage } from "./message.slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    console.log(data);
    const result = await SchemaDataService.userLogin(data);
    console.log(result.data);
    if (result.data.success) {
      localStorage.setItem("token", result.data.token);
      return result.data;
    }
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    toast.error(errorMessage, {
      autoClose: 3000,
      pauseOnHover: false,
    });

    return thunkAPI.rejectWithValue();
  }
});
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const result = await SchemaDataService.userRegister(data);
      console.log(result);
      if (result.data.success) {
        localStorage.setItem("token", result.data.token);
        return result.data;
      }
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(errorMessage, {
        autoClose: 3000,
        pauseOnHover: false,
      });

      return thunkAPI.rejectWithValue();
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/update_profile",
  async (data, thunkAPI) => {
    try {
      const result = await SchemaDataService.updateProfile(data);
      console.log(result);
      if (result.data.success) {
        toast.success(result.data.message, {
          autoClose: 3000,
          pauseOnHover: false,
          style: {
            background: "green",
            color: "white",
          },
        });
        return result.data;
      }
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(errorMessage, {
        autoClose: 3000,
        pauseOnHover: false,
      });

      return thunkAPI.rejectWithValue();
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    console.log("slice_logout");

    localStorage.removeItem("token");
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(errorMessage);
    await thunkAPI.dispatch(setMessage(errorMessage));
    return thunkAPI.rejectWithValue();
  }
});
export const getProfile = createAsyncThunk("auth/profile", async (thunkAPI) => {
  try {
    const result = await SchemaDataService.userProfile();
    if (result.data.success) {
      return result.data;
    }
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(errorMessage);
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
      state.user = action.payload.data;
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
    [getProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload.data;
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.logout = false;
    },
    [updateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload.data;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.logout = false;
    },
  },
});
export const { reducer } = authSlice;
export default reducer;
