import { RootState } from "../store"

export const getDevices = (state: RootState) => { return state.devicesPage.device}
export const getTypes = (state: RootState) => { return state.devicesPage.types}
export const getBrands = (state: RootState) => { return state.devicesPage.brands}