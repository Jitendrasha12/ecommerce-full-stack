// features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../utils/Api';

const initialState = {
  isLogin: false,
  details: {},
  loading: false,
  error: null,
};

// Async thunk for setting user details
export const setUserDetails = createAsyncThunk(
  'user/setUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const { statusCode, data } = await Api.getRequest(`/api/user/me`);

      if (statusCode === 400 || statusCode === 500) {
        return rejectWithValue('Error in fetching user details');
      }

      const { user } = JSON.parse(data);
      return {
        isLogin: true,
        details: { ...user },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.isLogin = false;
      state.details = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = action.payload.isLogin;
        state.details = action.payload.details;
      })
      .addCase(setUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.details = {};
        state.error = action.payload;
      });
  },
});

// Export the synchronous actions
export const { setInitialState } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
