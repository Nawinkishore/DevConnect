import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export interface Profile {
  userId: string;
  name: string;
  image?: string;
  bannerImage?: string;
  pronoun?: string;
  skill?: string;
  location?: string;
  about?: string;
  experience?: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const savedProfile = localStorage.getItem("profile");

const initialState: ProfileState = {
  profile: savedProfile ? JSON.parse(savedProfile) : null,
  loading: false,
  error: null,
};

// ✅ FIXED createAsyncThunk syntax
export const getProfileById = createAsyncThunk<
  Profile, // Return type
  void, // Argument type (since you’re calling `/profile/me`, no param needed)
  { rejectValue: string }
>(
  "profile/get",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get accessToken from auth state
      const state: any = getState();
      const accessToken = state.auth?.accessToken;

      const response = await api.get(`/profile/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data as Profile;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Failed to fetch profile");
      }
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk<
  Profile,
  FormData,
  { rejectValue: string }
>(
  "profile/update",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const accessToken = state.auth?.accessToken;

      const response = await api.put(`/profile/editProfile`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // Very important for file upload
        },
      });

      return response.data as Profile;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Failed to update profile");
      }
      return rejectWithValue("Failed to update profile");
    }
  }
);


const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      }).addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        localStorage.setItem("profile", JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const profileReducer = profileSlice.reducer;
export default profileSlice.reducer;
