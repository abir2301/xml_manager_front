import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SchemaDataService from "../../services/schema.services";
import FileSchema from "../../entities/Schema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getFiles = createAsyncThunk("files/retrieve", async () => {
  const res = await SchemaDataService.getAllFiles();
  return res.data;
});
export const updateFile = createAsyncThunk(
  "files/update",
  async ({ data, id }) => {
    console.log("deltte ");
    const res = await SchemaDataService.updateFile(data, id);
    console.log(res);
    if (res.data.success) {
      console.log("show toaster ");
      toast.success(res.data.message, {
        autoClose: 3000,
        pauseOnHover: false,
        style: {
          background: "green", // Change the background color
          color: "white", // Change the text color
        },
      });
      return res.data;
    } else {
      toast.error(res.data.message, {
        autoClose: 3000,
        pauseOnHover: false,
        style: {
          background: "red", // Change the background color
          color: "white", // Change the text color
        },
      });
    }
  }
);
export const deleteFile = createAsyncThunk("files/delete", async (id) => {
  const res = await SchemaDataService.deleteFile(id);
  if (res.data.success) {
    console.log("show toaster ");
    toast.success(res.data.message, {
      autoClose: 3000,
      pauseOnHover: false,
      style: {
        background: "green", // Change the background color
        color: "white", // Change the text color
      },
    });
    return res.data;
  } else {
    toast.error(res.data.message, {
      autoClose: 3000,
      pauseOnHover: false,
      style: {
        background: "red", // Change the background color
        color: "white", // Change the text color
      },
    });
  }
});
export const postNodeValue = createAsyncThunk(
  "files/node_value",
  async ({ data, id }) => {
    const res = await SchemaDataService.postValue(data, id);
    if (res.data.success) {
      console.log("show toaster ");

      return res.data;
    } else {
      toast.error(res.data.message, {
        autoClose: 3000,
        pauseOnHover: false,
        style: {
          background: "red", // Change the background color
          color: "white", // Change the text color
        },
      });
    }
  }
);
export const getSubNode = createAsyncThunk(
  "files/subNode",
  async ({ data, id }) => {
    const res = await SchemaDataService.getSubElement(id, data);
    if (res.data.success) {
      console.log("show toaster ");

      return res.data;
    } else {
      toast.error(res.data.message, {
        autoClose: 3000,
        pauseOnHover: false,
        style: {
          background: "red", // Change the background color
          color: "white", // Change the text color
        },
      });
    }
  }
);
export const postFile = createAsyncThunk(
  "files/post",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const res = await SchemaDataService.createFile(data, id);
      console.log(res);
      if (res.data.success) {
        console.log("show toaster ");
        toast.success(res.data.message, {
          autoClose: 3000,
          pauseOnHover: false,
          style: {
            background: "green", // Change the background color
            color: "white", // Change the text color
          },
        });
        return res.data;
      } else {
        toast.error(res.data.message, {
          style: {
            background: "red", // Change the background color
            color: "white", // Change the text color
          },
          autoClose: 3000,
          pauseOnHover: false,
        });
      }
    } catch (error) {
      return rejectWithValue(error.response.data || "An error occurred");
    }
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
export const setSelectedFile = createAsyncThunk(
  "files/setSelectedFile",
  async ({ schema }) => {
    console.log(schema);

    return schema;
  }
);
export const downloadFile = createAsyncThunk(
  "file/download",
  async ({ id }) => {
    try {
      const res = await SchemaDataService.exportFile(id);
      if (res.data.success) {
        const schema = await SchemaDataService.downloadFile();
        return schema.data;
      }
    } catch (error) {}
  }
);

export const xmlSlice = createSlice({
  name: "xml",
  initialState: {
    loading: false,
    files: [],
    data: {},
    success: false,
    selectedfile: new FileSchema(),
  },
  extraReducers: {
    [getFiles.pending]: (state, action) => {
      state.loading = true;
    },
    [getFiles.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.files = action.payload.data;
    },
    [getFiles.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.files = [];
    },

    [updateFile.pending]: (state, action) => {
      state.loading = true;
    },
    [updateFile.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [updateFile.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [deleteFile.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteFile.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.files = action.payload;
    },
    [deleteFile.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [postNodeValue.pending]: (state, action) => {
      state.loading = true;
    },
    [postNodeValue.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.selectedfile = action.payload.data;
    },
    [postNodeValue.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [getSubNode.pending]: (state, action) => {
      state.loading = true;
    },
    [getSubNode.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.selectedfile = action.payload.data;
    },
    [getSubNode.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },

    [setSelectedFile.pending]: (state, action) => {
      state.loading = true;
    },
    [setSelectedFile.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.selectedfile = action.payload;
    },
    [setSelectedFile.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [postFile.pending]: (state, action) => {
      state.loading = true;
    },
    [postFile.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      // state.selectedfile = action.payload.data;
    },
    [postFile.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    [downloadFile.pending]: (state, action) => {
      state.loading = true;
    },
    [downloadFile.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    [downloadFile.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
    },
  },
});
export const { reducer } = xmlSlice;
export default reducer;
