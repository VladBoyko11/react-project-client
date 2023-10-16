import {adminApi} from "../API/API";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Device, Type, Brand} from './types'

type AdminPageState = {
    type: Type | null,
    brand: Brand | null,
    device: Device | null,
    photo: File | null
}

const initialState: AdminPageState = {
    type: null,
    brand: null,
    device: null,
    photo: null
}

const AdminPageSlice = createSlice({
    name: 'adminPage',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(addDevice.fulfilled, (state, action) => {
            state.device = action.payload
        })
        .addCase(addBrand.fulfilled, (state, action) => {
            state.brand = action.payload
        })
        .addCase(addType.fulfilled, (state, action) => {
            state.type = action.payload
        })
        .addCase(addPhoto.fulfilled, (state, action) => {
            state.photo = action.payload
        })
    }
})

export const addBrand = createAsyncThunk<Omit<Brand, "id">, Brand, {rejectValue: string}>(
    'api/brand',
    async function ({name}, { rejectWithValue }) {
        const response = await adminApi.addBrand({name})
        if(!response.status){
            return rejectWithValue('Response error!')
        }
        return response.data
    }
)

export const addDevice = createAsyncThunk<Device, Device, {rejectValue: string}>(
    'api/device',
    async function ({name, price, typeId, brandId, title, description}, { rejectWithValue }) {
        const device = await adminApi.addDevice({name, price, typeId, brandId, title, description})
        if(!device.status){
            return rejectWithValue('Response error!')
        }
        return device.data
    }
)

export const addType = createAsyncThunk<Type, Type, {rejectValue: string}>(
    'api/type',
    async function ({name}, { rejectWithValue }) {
        const type = await adminApi.addType({name})
        if(!type.status){
            return rejectWithValue('Response error!')
        }
        return type.data
    }
)

export const addPhoto = createAsyncThunk<File, File, { rejectValue: string }>(
    'photo',
    async function (file) {
        const photo = await adminApi.addPhoto(file)
        return photo
    }
)

export default AdminPageSlice.reducer