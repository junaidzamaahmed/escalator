import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") return null;
  return localStorage?.getItem(key);
};

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async (force?: boolean) => {
    const accessToken = getFromLocalStorage("escalator_access_token");
    const decodedToken = jwtDecode(accessToken || "");
    if ((!accessToken || !decodedToken) && !force) {
      return null;
    }
    if (decodedToken && decodedToken.exp! * 1000 > Date.now() && !force) {
      return null;
    }
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/api/v1/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = response.json();
    return data;
  }
);

const initialState = {
  user: getFromLocalStorage("escalator_access_token")
    ? jwtDecode(localStorage?.getItem("escalator_access_token") || "")
    : null,
  isLoggedIn: getFromLocalStorage("escalator_access_token") ? true : false,
  isLoading: false,
  accessToken: getFromLocalStorage("escalator_access_token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const accessToken = action.payload;
      state.user = jwtDecode(accessToken);
      state.isLoggedIn = true;
      localStorage.setItem("escalator_access_token", accessToken);
    },
    userLogout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("escalator_access_token");
    },
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
  extraReducers(builder) {
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.user = jwtDecode(action.payload.data.accessToken);
      state.isLoggedIn = true;
      localStorage.setItem(
        "escalator_access_token",
        action.payload.data.accessToken
      );
    });
  },
});

export const { userLogin, userLogout, toggleLoading } = userSlice.actions;
export default userSlice.reducer;
