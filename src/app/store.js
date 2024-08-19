import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // combine all reducers:
    // key(as state): reducer function
  },
});

export default store;
