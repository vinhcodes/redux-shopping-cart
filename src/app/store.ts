import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productReducer from '../features/product/ProductSlice'
import cartReducer from '../features/cart/CartSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },

});
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
