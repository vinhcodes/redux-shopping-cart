import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productReducer from "../features/product/ProductSlice";
import cartReducer from "../features/cart/CartSlice";
import filterReducer from "../features/filter/FilterSlice";
import categoryReducer from "../features/category/CategorySlice";
import { loadState, saveState } from "../utils";
import { CartState } from "../features/cart/CartSlice";
import { ProductState } from "../features/product/ProductSlice";
import { CategoryState } from "../features/category/CategorySlice";
import { initialState as productInitialState } from "../features/product/ProductSlice";
import { initialState as cartIntialState } from "../features/cart/CartSlice";
import { initialState as categoryIntialState } from "../features/category/CategorySlice";

//Handle an local storage operation
const persistedCartState = loadState<CartState>("cartState") || cartIntialState;
const persistedCategoryState =
  loadState<CategoryState>("categoryState") || categoryIntialState;
const persistedProductState =
  loadState<ProductState>("productState") || productInitialState;

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    filter: filterReducer,
    category: categoryReducer,
  },
  preloadedState: {
    cart: persistedCartState,
    product: persistedProductState,
    category: persistedCategoryState,
  },
});

store.subscribe(() => {
  const state = store.getState();

  saveState("cartState", state.cart);
  saveState("productState", state.product);
  saveState("categoryState", state.category);
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
