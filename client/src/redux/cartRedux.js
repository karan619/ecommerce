import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      console.log("add", itemIndex);

      if (itemIndex >= 0) {
        state.products[itemIndex].cartQuantity += 1;
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.products.push(tempProductItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },

    removeFromCart: (state, action) => {
      //console.log(current(state));
      current(state).products.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const nextCartItems = current(state).products.filter(
            (item) => item._id !== action.payload._id
          );
          state.products = nextCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.products));
        return state;
      });
    },

    decreaseCart(state, action) {
      const itemIndex = current(state).products.findIndex(
        (item) => item._id === action.payload._id
      );

      //console.log("dec", itemIndex);

      if (state.products[itemIndex].cartQuantity > 1) {
        state.products[itemIndex].cartQuantity -= 1;
      } else if (state.products[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.products.filter(
          (item) => item._id !== action.payload._id
        );
        state.products = nextCartItems;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },
    clearCart(state, action) {
      state.products = [];
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },
    getTotal(state, action) {
      let { total, quantity } = current(state).products.reduce(
        (cartTotal, item) => {
          const { price, cartQuantity } = item;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addProduct, removeFromCart, decreaseCart, clearCart, getTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
