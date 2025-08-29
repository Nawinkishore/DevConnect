import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Login failed");
      }
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Load state from localStorage if available
const savedAuth = localStorage.getItem("auth");

const initialState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null as string | null,
      isAuthenticated: false, // ✅ always defined
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.isAuthenticated = false; // ✅ reset
      localStorage.removeItem("auth");
    },
    // ✅ New reducer for updating accessToken only
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user || null;
      state.accessToken = action.payload.accessToken || null;
      state.refreshToken = action.payload.refreshToken || null;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true; // ✅ set when login succeeds
      localStorage.setItem("auth", JSON.stringify(state));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false; // ✅ failed login
    });
  },
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
