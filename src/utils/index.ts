import { CartState } from "../features/cart/CartSlice";
import { ProductState } from "../features/product/ProductSlice";

export const loadState = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error(`Could not load ${key} state`, err);
    return undefined;
  }
  };

  export const saveState = <T>(key: string, state: T) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error(`Could not save ${key} state`, err);
    }
  };