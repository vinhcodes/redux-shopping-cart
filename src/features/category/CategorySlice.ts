import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/withTypes";
import { Category } from "../../model/category";
import { RootState } from "../../app/store";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2YjAzMWMyLTZiY2YtNDU5OS1iMzc4LWY2YzFhMmQ5ZWNiNCIsImlhdCI6MTcyNTc1MDY4OCwiZXhwIjoxNzMzNTI2Njg4fQ.BdVHDSGKRyyL_JGfpNLSwlWvnA7_SeSGCXVF9iR0Uos"; // Replace with your actual token
localStorage.setItem("token", token);

export interface CategoryState {
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: CategoryState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCategory = createAppAsyncThunk<
  Category[],
  void,
  { state: RootState }
>("category/fetchCategory", async () => {
  const response = await fetch("http://localhost:3030/api/category/", {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state
    builder.addCase(fetchCategory.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    // Handle fulfilled state
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    // Handle rejected state
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Failed to load categories";
    });
  },
});

export default categorySlice.reducer;
