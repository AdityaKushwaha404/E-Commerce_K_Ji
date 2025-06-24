import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// ✅ Async Thunk: Create a new checkout session
export const createCheckoutSession = createAsyncThunk(
  'checkout/createCheckoutSession',
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/checkout', checkoutData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      // 🔧 Only return the `checkout` object, not entire response
      return response.data.checkout;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to create checkout session'
      );
    }
  }
);

// 🧾 Initial State
const initialState = {
  session: null,
  loading: false,
  error: null,
};

// 📦 Slice
const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    // Reset session and error state
    resetCheckout: (state) => {
      state.session = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Creating checkout session
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload; // ✅ Now it's only the checkout object
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error during checkout';
      });
  },
});

// 🧩 Exports
export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
