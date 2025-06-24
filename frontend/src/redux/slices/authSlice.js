import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios'; // ✅ use custom axios instance

// ✅ Safe parsing of userInfo from localStorage
let userFromStorage = null;
try {
  const stored = localStorage.getItem("userInfo");
  if (stored && stored !== "undefined") {
    userFromStorage = JSON.parse(stored);
  }
} catch (e) {
  console.error("❌ Failed to parse userInfo from localStorage:", e);
  localStorage.removeItem("userInfo");
}

const initialGuestId = localStorage.getItem('guestId') || `guest_${Date.now()}`;
localStorage.setItem('guestId', initialGuestId);

const initialState = {
  userInfo: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// ✅ Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    console.log("🧪 Sending to backend:", userData);
    try {
      const response = await api.post('/api/users/login', userData);
      console.log("✅ Login response:", response.data);
      const { user, token } = response.data;
      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/register', userData);
      const { user, token } = response.data;
      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.guestId = `guest_${Date.now()}`;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      localStorage.setItem('guestId', state.guestId);
    },
    generateNewGuestId: (state) => {
      const newGuestId = `guest_${Date.now()}`;
      state.guestId = newGuestId;
      localStorage.setItem('guestId', newGuestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
