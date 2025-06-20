import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// Async Thunk to Fetch Products by filters
export const fetchProductByFilters = createAsyncThunk(
  'products/fetchByFilters',
  async (
    {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit
    },
    thunkAPI
  ) => {
    try {
      const query = new URLSearchParams();

      if (collection) query.append('collection', collection);
      if (size) query.append('size', size);
      if (color) query.append('color', color);
      if (gender) query.append('gender', gender);
      if (minPrice) query.append('minPrice', minPrice);
      if (maxPrice) query.append('maxPrice', maxPrice);
      if (sortBy) query.append('sortBy', sortBy);
      if (search) query.append('search', search);
      if (category) query.append('category', category);
      if (material) query.append('material', material);
      if (brand) query.append('brand', brand);
      if (limit) query.append('limit', limit);

      const response = await api.get(`/api/products?${query.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Async Thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId, thunkAPI) => {
    try {
      const response = await api.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch product');
    }
  }
);

// Async Thunk to update a product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, productData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(`/api/products/${productId}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update product');
    }
  }
);

// Async Thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  'products/fetchSimilarProducts',
  async ({ productId }, thunkAPI) => {
    try {
      const response = await api.get(`/api/products/similar/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch similar products');
    }
  }
);

// ✅ Async Thunk to fetch the best seller product
export const fetchBestSellerProduct = createAsyncThunk(
  'products/fetchBestSellerProduct',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/api/products/best-seller'); // Assumes '/api' is in baseURL
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch best seller product');
    }
  }
);

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
  products: [],
  productDetails: null,
  bestSellerProduct: null,
  similarProducts: [],
  loading: false,
  error: null,

  // ✅ Add this block
  loadingStates: {
    bestSeller: false,
  },

  filters: {
    category: "",
    size: "",
    color: "",
    gender: "",
    minPrice: null,
    maxPrice: null,
    sortBy: "",
    search: "",
    material: "",
    brand: "",
    collection: "",
  }
}
,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        minPrice: null,
        maxPrice: null,
        sortBy: "",
        search: "",
        material: "",
        brand: "",
        collection: ""
      };
    }
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchBestSellerProduct.pending, (state) => {
  state.loadingStates.bestSeller = true;
})
.addCase(fetchBestSellerProduct.fulfilled, (state, action) => {
  state.loadingStates.bestSeller = false;
  state.bestSellerProduct = action.payload;
})
      // fetchProductByFilters
      .addCase(fetchProductByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchProductDetails
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchSimilarProducts
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || action.payload || 'Failed to fetch similar products';
      });
  },
});

// Export actions and reducer
export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;