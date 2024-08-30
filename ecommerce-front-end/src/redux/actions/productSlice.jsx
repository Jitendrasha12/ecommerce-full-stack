// features/product/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../utils/Api';

// Initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

// Async thunk for getting all products
export const getProducts = createAsyncThunk(
  'product/getProducts',  // Unique identifier for the action
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.getRequest('/api/products');
      return JSON.parse(data);
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk for getting product details
export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',  // Unique identifier for the action
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await Api.getRequest(`/api/products/${id}`);
      return JSON.parse(data);
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Create the product slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    removeProductDetails: (state) => {
      state.product = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling getProducts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling getProductDetails
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the synchronous actions
export const { removeProductDetails } = productSlice.actions;

// Export the reducer to be used in the store
export default productSlice.reducer;
