import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// Load cart from localStorage
const loadCartFromStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { products: [] };
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify({ products: cart }));
};

// Async thunk: fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/cart', {
        params: { userId, guestId } // ✅ FIXED: Use query params, not path
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cart');
    }
  }
);

// Async thunk: add to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, guestId, productId, quantity, size, color }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/cart', {
        productId, quantity, size, color, guestId, userId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add item to cart');
    }
  }
);

// Async thunk: update item
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ userId, guestId, productId, quantity, size, color }, { rejectWithValue }) => {
    try {
      const response = await api.put('/api/cart', {
        productId, quantity, size, color, guestId, userId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update cart item');
    }
  }
);

// Async thunk: remove item
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, guestId, productId, size, color }, { rejectWithValue }) => {
    try {
      const response = await api.delete('/api/cart', {
        data: { productId, size, color, guestId, userId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
    }
  }
);

// Async thunk: merge guest cart
export const mergeCart = createAsyncThunk(
  'cart/mergeCart',
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/cart/merge', { userId, guestId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to merge guest cart');
    }
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: loadCartFromStorage().products,
    loading: false,
    error: null,
    userId: null,
    guestId: localStorage.getItem('guestId') || `guest_${Date.now()}`
  },
  reducers: {
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem('cart');
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        saveCartToStorage(state.products);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products; // ✅ FIXED: update with full cart
        saveCartToStorage(state.products);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        saveCartToStorage(state.products);
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        saveCartToStorage(state.products);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Merge Guest Cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.userId = action.payload.userId;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        saveCartToStorage(state.products);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCart, setUserId } = cartSlice.actions;
export default cartSlice.reducer;
