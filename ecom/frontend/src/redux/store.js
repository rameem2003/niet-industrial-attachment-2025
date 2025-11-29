import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});
