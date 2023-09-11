import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SchemaDataService from "../../services/schema.services";

export const getFilesSchema = createAsyncThunk(
  "file_schema/retrieve",
  async () => {
    const res = await SchemaDataService.getAll();
    return res.data;
  }
);
export const updateSchema = createAsyncThunk(
  "file_schema/update",
  async ({ data, id }) => {
    const res = await SchemaDataService.update(data, id);
    return res.data;
  }
);
export const deleteSchema = createAsyncThunk(
  "file_schema/delete",
  async (id) => {
    const res = await SchemaDataService.delete(id);
    return res.data;
  }
);
export const postElement = createAsyncThunk(
  "xml_element/post",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const res = await SchemaDataService.postElement(data, id);
      console.log(res);
      return res.data;
    } catch (error) {
      // If the error response has a message, it will be stored in error.response.data.message
      return rejectWithValue(error.response.data || "An error occurred");
    }
  }
);
export const deleteElement = createAsyncThunk(
  "xml_element/delete",
  async ({ id }) => {
    const res = await SchemaDataService.deleteElement(id);
    console.log(res);
    return res.data;
  }
);
export const updateElement = createAsyncThunk(
  "xml_element/update",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const res = await SchemaDataService.updateElement(data, id);
      console.log(res);

      return res.data;
    } catch (error) {
      // If the error response has a message, it will be stored in error.response.data.message
      return rejectWithValue(error.response.data || "An error occurred");
    }
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState: { loading: false, fileSchemas: [], data: {}, success: false },

  extraReducers: {
    [getFilesSchema.pending]: (state, action) => {
      state.loading = true;
    },
    [getFilesSchema.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.fileSchemas = action.payload.data;
    },
    [getFilesSchema.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.fileSchemas = [];
    },

    [updateSchema.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSchema.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [updateSchema.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [deleteSchema.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSchema.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.fileSchemas = action.payload.data;
    },
    [deleteSchema.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [postElement.pending]: (state, action) => {
      state.loading = true;
    },
    [postElement.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.fileSchemas = action.payload.data;
    },
    [postElement.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [deleteElement.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteElement.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.fileSchemas = action.payload.data;
    },
    [deleteElement.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [updateElement.pending]: (state, action) => {
      state.loading = true;
    },
    [updateElement.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.fileSchemas = action.payload.data;
    },
    [updateElement.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
  },
});
export const { reducer } = fileSlice;
export default reducer;
