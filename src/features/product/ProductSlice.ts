import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/withTypes";
import { Product } from "../../model/product";
import { RootState } from "../../app/store";

// Define the ProductState interface
export interface ProductState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state adhering to the ProductState interface
const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
};

// Thunk for fetching products
export const fetchProduct = createAppAsyncThunk<Product[], void, { state: RootState }>(
  "product/fetchProduct",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products/category/men's%20clothing");
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
);

// Creating the product slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export default productSlice.reducer;
