import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/withTypes";
import { Product } from "../../model/product";
import { RootState } from "../../app/store";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2YjAzMWMyLTZiY2YtNDU5OS1iMzc4LWY2YzFhMmQ5ZWNiNCIsImlhdCI6MTcyNjE3Mzk2MCwiZXhwIjoxNzMzOTQ5OTYwfQ.AisMVwdXse_-I50teJP5-aeV7k9AJMuzzX2DeA53h3E'; // Replace with your actual token
localStorage.setItem('token', token);

export interface ProductState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
export const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProduct = createAppAsyncThunk<Product[], void, { state: RootState }>(
  "product/fetchProduct",
  async () => {
    const response = await fetch("http://localhost:3030/api/product/",
      {
        method: 'GET',
        mode: 'cors', 
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
  });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
);


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
