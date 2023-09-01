import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SchemaDataService from "../../services/schema.services";

export const getFilesSchema = createAsyncThunk(
  "file_schema/retrieve",
  async () => {
    const res = await SchemaDataService.getAll();
    return res.data;
  }
);
export const fileSlice = createSlice({
  name: "file",
  initialState: { loading: false, fileSchemas: [] , data :{} },
  success: false,

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
  },
});
export const { reducer } = fileSlice;
export default reducer;
