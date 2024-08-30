import { configureStore } from '@reduxjs/toolkit';

// Reducers
import cartReducer from './actions/cartSlice';
import productReducer from './actions/productSlice';
import userReducer from './actions/userSlice';

const cartItemsInLocalStorage = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const preloadedState = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production', // Automatically enables Redux DevTools in development
});

export default store;
