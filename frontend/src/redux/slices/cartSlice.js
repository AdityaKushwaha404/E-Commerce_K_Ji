import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// --- Utility Functions ---

const getOrCreateGuestId = () => {
  let id = localStorage.getItem('guestId');
  if (!id) {
    id = `guest_${Date.now()}`;
    localStorage.setItem('guestId', id);
  }
  return id;
};

const loadCartFromStorage = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart && Array.isArray(cart.products) ? cart : { products: [] };
  } catch {
    return { products: [] };
  }
};

const saveCartToStorage = (products) => {
  localStorage.setItem('cart', JSON.stringify({ products }));
};

// --- Async Thunks ---

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/cart', {
        params: { userId, guestId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity, size, color }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState();
      const { userId, guestId } = cart;

      const response = await api.post('/api/cart', {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add item to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity, size, color }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState();
      const { userId, guestId } = cart;

      const response = await api.put('/api/cart', {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update cart item');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productId, size, color }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState();
      const { userId, guestId } = cart;

      const response = await api.delete('/api/cart', {
        data: {
          productId,
          size,
          color,
          guestId,
          userId,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove item from cart');
    }
  }
);

export const mergeCart = createAsyncThunk(
  'cart/mergeCart',
  async ({ guestId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        '/api/cart/merge',
        { guestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to merge guest cart');
    }
  }
);

// --- Slice ---

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: loadCartFromStorage().products,
    loading: false,
    error: null,
    userId: null,
    guestId: getOrCreateGuestId(),
  },
  reducers: {
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem('cart');
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        saveCartToStorage(state.products);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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

      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.userId = action.payload.userId;
        state.guestId = null;

        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.removeItem('guestId');
        saveCartToStorage(state.products);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, setUserId } = cartSlice.actions;
export default cartSlice.reducer;
