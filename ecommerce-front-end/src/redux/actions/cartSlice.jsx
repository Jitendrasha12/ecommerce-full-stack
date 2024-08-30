// features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../utils/Api';
import { convertToCartData } from '../../utils/utils.function';

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ id, qty }, { rejectWithValue }) => {
    try {
      console.log(id,qty,'this is cartSlice17...........')
      const { data } = await Api.getRequest(`/api/products/${id}`);
      console.log('API Response:', data); // Check what the API returns
      
      // Parse if necessary
      const product = JSON.parse(data);

      await Api.postRequest('/api/cart', { productId: id, count: qty });

      return {
        product: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Async thunk for clearing the cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await Api.postRequest('/api/cart/clear'); // Adjust this endpoint based on your API
      return; // No need to return anything if the API call is successful
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Async thunk for removing from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ pId, _id }, { rejectWithValue }) => {
    try {
      await Api.DeleteRequest('/api/cart/' + _id);
      return pId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const { data: strigifyData } = await Api.getRequest(`/api/cart/`);
      const { carts } = JSON.parse(strigifyData);

      return convertToCartData(carts);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setInitialState: (state) => {
      // Reset the state to initial state
      return initialState;
    },
    // Add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handling addToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload,'this is our payload')
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.product !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = []; // Clear cart items
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export const { setInitialState } = cartSlice.actions;
export default cartSlice.reducer;
