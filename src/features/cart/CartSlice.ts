import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../model/cart";
import { Product } from "../../model/product";

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find(
          (item) => item.name === action.payload.name
        );
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
          state.totalQuantity += 1;
          state.totalPrice += action.payload.price * action.payload.quantity;
        } else {
          state.items.push(action.payload);
          state.totalQuantity += 1;
          state.totalPrice += action.payload.price * action.payload.quantity;
        }
      },
      prepare: (item: Product) => {
        const id = nanoid();
        const newCartItem: CartItem = {
          item_id: id,
          name: item.title,
          price: item.price,
          quantity: 1,
          image: item.image,
        };
        return { payload: newCartItem };
      },
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ name: string; quantity: number; price: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        const oldQuantity = existingItem.quantity;
        const newQuantity = action.payload.quantity;
        const quantityDifference = newQuantity - oldQuantity;

        // Update the item's quantity
        existingItem.quantity = newQuantity;

        // adjust the total quantity based on the uantity difference
        state.totalQuantity += quantityDifference 

        // Adjust the total price based on the quantity difference
        state.totalPrice += quantityDifference * existingItem.price;
        
      }
    },
    deleteItem: (state, action: PayloadAction<{ item_id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.item_id === action.payload.item_id
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.item_id !== existingItem.item_id
        );

        // Updating the total quantity of the cart after deleting an item
        state.totalQuantity--;

        // Adjusting the total price based on the deleted item quantity and item price per unit
        state.totalPrice -= existingItem.price * existingItem.quantity;
      }
    },
  },
});

export const { addItem, updateQuantity, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
