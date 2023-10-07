/* eslint-disable no-debugger */
import { deviceApi, loginAPI } from "../API/API";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Device, Login, Rating } from "./types";
import { AxiosResponse } from "axios";

type authState = {
  id: number;
  email: string;
  password: string;
  role: string;
  isAuth: boolean;
  yourRatings: Array<Rating>;
  countYourRatings: number;
  devices: Array<Device>;
};

const initialState: authState = {
  id: 0,
  email: "",
  password: "",
  role: "",
  isAuth: false,
  yourRatings: [],
  countYourRatings: 0,
  devices: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action: PayloadAction<object>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        setToken(action.payload.token);
        if (action.payload.id) state.id = action.payload.id;
        if (action.payload.email) state.email = action.payload.email;
        if (action.payload.password) state.password = action.payload.password;
        if (action.payload.role) state.role = action.payload.role;
        state.isAuth = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        setToken(action.payload.token);
        if (action.payload.id) state.id = action.payload.id;
        if (action.payload.email) state.email = action.payload.email;
        if (action.payload.password) state.password = action.payload.password;
        if (action.payload.role) state.role = action.payload.role;
        state.isAuth = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        setToken(action.payload.token);
        if (action.payload.id) state.id = action.payload.id;
        if (action.payload.email) state.email = action.payload.email;
        // if (action.payload.password) state.password = action.payload.password;
        if (action.payload.role) state.role = action.payload.role;
        state.isAuth = true;
      })
      .addCase(auth.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(getYourRatings.fulfilled, (state, action) => {
        state.yourRatings = action.payload
      })
      .addCase(getDevicesWithRatings.fulfilled, (state, action) => {
        state.devices = action.payload
      })
  },
});

const setToken = (token: string | undefined) => {
  token ? sessionStorage.setItem("token", token) : sessionStorage.clear();
};

export const login = createAsyncThunk<
  Login,
  { email: string; password: string },
  { rejectValue: string }
>("login", async function ({ email, password }) {
  const response = await loginAPI.login(email, password);
  return response.data
});

export const registration = createAsyncThunk<
  Login,
  { email: string; password: string },
  { rejectValue: string }
>("registration", async function ({ email, password }) {
  const response = await loginAPI.registration(email, password);
  return response.data
});

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(
    authSlice.actions.logout({
      email: null,
      password: null,
      role: null,
      isAuth: false,
      id: null,
    })
  );
  setToken(undefined);
};

export const auth = createAsyncThunk<Omit<Login, 'password'>, object, { rejectValue: string }>(
  "auth",
  async function (_, { rejectWithValue }) {
    return loginAPI.auth().then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("response error");
      }
    });
  }
);

export const getYourRatings = createAsyncThunk<Array<Rating>, Rating, { rejectValue: string }
>("rating", async function ({ userId }) {
  if (userId) {
    const response = await loginAPI.getYourRatings(userId);
    return response.data;
  }
  return {} as Array<Rating>;
});

export const getDevicesWithRatings = createAsyncThunk<Array<Device>, Array<Rating>, { rejectValue: string }>
  ("getDevicesWithRatings", async function (ratings: Array<Rating>) {
    const deviceIds: number[] = ratings.map(rating => {
      if (rating.deviceId) return rating.deviceId
      else return 0
    })
    const response = await deviceApi.getDevicesByIds(deviceIds)
    return response.data
  })

export const setNewEmail = createAsyncThunk<
  { email: string; },
  { email: string; id: number },
  { rejectValue: string }
>("setNewEmail", async function ({ email, id }, { rejectWithValue }) {
  const response = await loginAPI.setNewEmail(email, id);
  if (response.status !== 200) {
    return rejectWithValue("response error");
  } else {
    return response.data;
  }
});

export default authSlice.reducer;
