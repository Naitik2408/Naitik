import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  isAdmin: false,
  loading: false,
  error: null,
};

// Parse JWT token to extract user info
const parseToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      isAdmin: payload.isAdmin,
    };
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

// If we have a token in localStorage, extract the user data
if (initialState.token) {
  const userData = parseToken(initialState.token);
  if (userData) {
    initialState.user = userData;
    initialState.isAdmin = userData.isAdmin;
  } else {
    // Invalid token
    initialState.token = null;
    initialState.isAuthenticated = false;
    localStorage.removeItem('authToken');
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }
      
      localStorage.setItem('authToken', data.token);
      if (data.user && data.user.name) {
        localStorage.setItem('username', data.user.name);
      }
      return data;
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }
      
      return data;
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        
        // Parse the JWT to get user info
        const userData = parseToken(action.payload.token);
        if (userData) {
          state.user = userData;
          state.isAdmin = userData.isAdmin;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;