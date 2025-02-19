import { PostData } from "@/lib/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface postState {
  details: string | null;
  error: string | null;
  post: PostData | null;
  isPending: boolean;
}

const initialState: postState = {
  details: "",
  error: null,
  post: null,
  isPending: false,
};

export const createPost = createAsyncThunk(
  "/post/create",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/post/create-post",
        formData
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message.date || "failed to create a post");
    }
  }
);

export const createPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<string>) => {
      state.details = action.payload;
    },
    setError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(
        createPost.fulfilled,
        (state, action: PayloadAction<PostData>) => {
          state.isPending = false;
          state.error = null;
          state.post = action.payload;
        }
      )
      .addCase(createPost.rejected, (state, action: PayloadAction<any>) => {
        state.isPending = false;
        state.error = action.payload || "Unable to create a post";
      });
  },
});
