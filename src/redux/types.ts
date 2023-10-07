export type Device = {
    id?: number,
    name?: string, 
    price?: number,
    rating?: number,
    img?: string,
    typeId?: number,
    brandId?: number,
    title?: string,
    description?: string
}

export type Basket = {
    id?: number,
    userId: number
}

export type BasketDevice = {
    id?: number,
    basketId: number,
    deviceId: number,
    countOfProducts: number
}

export type Brand = {
    id?: number,
    name?: string
}

export type DeviceInfo = {
    id?: number,
    title?: string,
    description?: string,
    deviceId?: number
}

export type Rating = {
    id?: number,
    rating?: number,
    userId?: number,
    deviceId?: number
}

export type Type = {
    id?: number,
    name?: string
}

export type User = {
    id?: number,
    email: string,
    password: string,
    role?: string
}

export type Photo = Blob

export type Login = {
    id?: number,
    email?: string, 
    password?: string,
    role?: string
    token?: string
}