import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { basketApi, deviceApi } from "../API/API";
import { AppDispatch } from "./store";
import { Basket, BasketDevice, Device } from "./types";

type basketState = {
  basket: Basket;
  deviceToggle: boolean;
  devices: Array<Device>;
  basketDevices: Array<BasketDevice>;
  totalPrice: number
};

const initialState: basketState = {
  basket: {
    id: 0,
    userId: 0
  },
  deviceToggle: false,
  devices: [],
  basketDevices: [],
  totalPrice: 0
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketDevices(state, action: PayloadAction<Array<BasketDevice>>) {
      state.basketDevices = action.payload
    },
    // setBasket(state, action: PayloadAction<{ data: object }>) {
    //   state.basket = action.payload.data;
    // },
    setTotalPrice(state) {
      let totalPrice = 0
      state.devices.forEach(device => {
        if (device.price) {
          const basketDevice = state.basketDevices.find(basketDevice => {
            if (basketDevice.deviceId === device.id) return basketDevice
          })
          if (basketDevice) totalPrice = totalPrice + device.price * basketDevice.countOfProducts
        }
      })
      state.totalPrice = totalPrice
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setBasketThunk.fulfilled, (state, action) => {
        state.basket = action.payload
      })
      .addCase(deleteDeviceFromBasket.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(getOneDevice.fulfilled, (state, action) => {
        state.devices.push(action.payload)
      })
      .addCase(getDevicesFromBasket.fulfilled, (state, action) => {
        state.devices = action.payload
      })
      .addCase(changeCountOfProducts.fulfilled, (state, action) => {
        state.basketDevices = state.basketDevices.map(basketDevice => {
          setTotalPrice()
          if (basketDevice.deviceId === action.payload.deviceId) {
            return action.payload
          }
          return basketDevice
        })
      })
    // .addCase(setBasketDevices.fulfilled, (state, action) => {
    //   state.basketDevices = action.payload
    // })
  }
});

export const setTotalPrice = () => {
  return basketSlice.actions.setTotalPrice()
}

// export const setBasketDevices = createAsyncThunk<Array<BasketDevice>, {basketId: number}, { rejectValue: string }>(
//   'setBasketDevices',
//   async function (basketId) {
//     const response = await basketApi.getDevicesFromBasket(basketId)
//     return response.data.rows as Array<BasketDevice>
//   }
// )

export const changeCountOfProducts = createAsyncThunk<BasketDevice, { deviceId: number, countOfProducts: number, basketId: number }, { rejectValue: string }>(
  'changeCountOfProducts',
  async function ({ deviceId, countOfProducts, basketId }) {
    const response = await basketApi.changeCountOfProducts({ deviceId, countOfProducts, basketId })
    return response.data as BasketDevice
  }
)

export const setBasketDevices = (arr: Array<BasketDevice>) => {
  return basketSlice.actions.setBasketDevices(arr)
}

export const setBasketThunk = createAsyncThunk<Basket, Basket, { rejectValue: string }>(
  'setBasket',
  async function ({ userId }) {
    const response = await basketApi.getBasket({ userId })
    return response.data
  }
)

export const addDeviceToBasket = createAsyncThunk<BasketDevice, { deviceId: number, basketId: number }, { rejectValue: string }>(
  'addDeviceToBasket',
  async function ({ deviceId, basketId }) {
    const response = await basketApi.addDeviceToBasket({ deviceId, basketId })
    const basketDevice = response.data
    getOneDevice({ deviceId: basketDevice.deviceId })
    return basketDevice
  }
)

export const getDevicesFromBasket = createAsyncThunk<Array<Device>, { basketId: number, dispatch: AppDispatch }, { rejectValue: string }>(
  'getDevicesFromBasket',
  async function ({ basketId, dispatch }) {
    const response = await basketApi.getDevicesFromBasket({ basketId })
    if (response.data === 'devices are not found in basket') {
      dispatch(setBasketDevices([]))
      return []
    }
    const devices = response.data
    if (Array.isArray(devices)) {
      dispatch(setBasketDevices(devices))
      const arrIds = devices.map(item => {
        return item.deviceId
      })

      const response2 = await deviceApi.getDevicesByIds(arrIds)
      return response2.data
    }
    return []
  }
)

export const deleteDeviceFromBasket = createAsyncThunk<string, { basketId: number, deviceId: number, dispatch: AppDispatch }, { rejectValue: string }>(
  'deleteDeviceFromBasket',
  async function ({ basketId, deviceId, dispatch }) {
    await basketApi.deleteDeviceFromBasket({ basketId, deviceId })
    dispatch(getDevicesFromBasket({ basketId, dispatch }))
    return 'Delete is completed'
  }
)

export const getOneDevice = createAsyncThunk<Device, { deviceId: number }, { rejectValue: string }>(
  'getOneDevice',
  async function ({ deviceId }) {
    const response = await deviceApi.getDevices({ deviceId })
    return response.data as Device
  }
)

export default basketSlice.reducer;
