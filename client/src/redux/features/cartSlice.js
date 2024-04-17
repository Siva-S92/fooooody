import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //add to Cart
    AddToCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, temp];
      }
    },


    RemoveFromCart: (state, action) => {
        const data = state.carts.filter((ele) => ele.id !== action.payload);
        state.carts = data;
    },


    //Reduce the quantity from the cart
    ReduceQuantity: (state, action) => {
      const itemIndex_dec = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.carts[itemIndex_dec].qnty >= 1) {
        state.carts[itemIndex_dec].qnty -= 1;
      }
    },

    //empty the cart
    EmptyCart: (state, action) => {
        state.carts = [];
    }
  },
});
export const { AddToCart, RemoveFromCart, ReduceQuantity , EmptyCart} = cartSlice.actions;
export default cartSlice.reducer;
