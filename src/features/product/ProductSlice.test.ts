import { describe, it, expect } from "vitest";
import productReducer, { fetchProduct } from "./ProductSlice"; 
import { ProductState } from "./ProductSlice";
import { configureStore } from "@reduxjs/toolkit";
import { AppDispatch } from "../../app/store";
import { Product, Rating } from "../../model/product";

declare var global: any;

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Test Product 1",
    price: 100,
    description: "Testing new product",
    CategoryId: "test",
    status: "available",
    imageUrl: "test.com/etsdwo21sas",
    rating: { rate: 3.9, count: 120 },
    quantity: 120,
    options: [{id: 1, option:"xs", stock: 120}],
  },
];

// Mock the fetch function globally
global.fetch = async (url: string) => {
  if (url === "https://fakestoreapi.com/products/category/men's%20clothing") {
    return {
      ok: true,
      json: async () => mockProducts,
    };
  }
  throw new Error("Network Error");
};

describe("productSlice", () => {
  const initialState: ProductState = {
    items: [],
    status: "idle",
    error: null,
  };

  it("should handle initial state", () => {
    expect(productReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle fetchProduct.pending", () => {
    const nextState = productReducer(
      initialState,
      fetchProduct.pending("fetchProduct", undefined)
    );
    expect(nextState.status).toBe("loading");
    expect(nextState.items).toEqual([]);
    expect(nextState.error).toBeNull();
  });

  it("should handle fetchProduct.fulfilled", () => {
    const nextState = productReducer(
      initialState,
      fetchProduct.fulfilled(mockProducts, "fetchProduct", undefined)
    );
    expect(nextState.status).toBe("succeeded");
    expect(nextState.items).toEqual(mockProducts);
    expect(nextState.error).toBeNull();
  });

  it("should handle fetchProduct.rejected", () => {
    const error = new Error("Network Error");
    const nextState = productReducer(
      initialState,
      fetchProduct.rejected(error, "fetchProduct", undefined)
    );
    expect(nextState.status).toBe("failed");
    expect(nextState.error).toBe("Network Error");
    expect(nextState.items).toEqual([]);
  });

  it("should fetch products successfully from the thunk", async () => {
    const store = configureStore({
      reducer: {
        product: productReducer,
      },
    });

    const dispatch: AppDispatch = store.dispatch;

    await dispatch(fetchProduct());

    const state = store.getState().product;
    expect(state.items).toEqual(mockProducts);
    expect(state.status).toBe("succeeded");
    expect(state.error).toBeNull();
  });
});
