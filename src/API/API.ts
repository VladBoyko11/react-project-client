import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { Basket, BasketDevice, Brand, Device, Rating, Type, User } from '../redux/types'

const instance = axios.create({
    baseURL: 'https://react-project-server-bmp4fl2ro-vladboyko11.vercel.app/'
})

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`
    return config
}

instance.interceptors.request.use(authInterceptor)

export type deviceApiParams = {
    typeId?: number
    deviceId?: number
    brandId?: number
    userId?: number
    limit?: number
    page?: number
    typeName?: string
}

export type totalCountParams = {
    brandId?: number,
    typeId?: number
}

type deviceApiType = {
    getDevices(params: deviceApiParams): Promise<AxiosResponse<Device[] | Device>>,
    getBrands(params?: deviceApiParams): Promise<AxiosResponse<Brand[] | Brand>>,
    getTypes(params?: deviceApiParams): Promise<AxiosResponse<Type[] | Type>>,
    addYourDeviceRating(rating: number, userId: number, deviceId: number): Promise<AxiosResponse<Device>>,
    getDevicesByIds(deviceIds: Array<number>): Promise<AxiosResponse<Device[]>>,
    getTotalCount(params: totalCountParams): Promise<AxiosResponse<number>>
}

export const deviceApi: deviceApiType = {
    async getDevices(params: deviceApiParams) {
        if(!params) {
            return instance.get(`api/device`)
        }
        if(params.deviceId && !params.limit) {
            return instance.get(`api/device/${params.deviceId}`)
        }
        if(params.deviceId && params.limit && params.page) {
            return instance.get(`api/device/${params.deviceId}?limit=${params.limit}&page=${params.page}`)
        }
        return instance.get(`api/device?limit=${params.limit}&page=${params.page}&brandId=${params.brandId}&typeId=${params.typeId}`)
    },
    async getBrands(params?: deviceApiParams) {
        if(!params) {
            return instance.get('/api/brand')
        }
        if(params.brandId) {
            return instance.get(`api/brand/${params.brandId}`)
        }
        return instance.get(`/api/brand${params}`)
    },
    async getTypes(params?: deviceApiParams) {
        if(!params) return instance.get('/api/type')
        if(!params.typeName) return instance.get('/api/type')
        else return instance.get(`/api/type/${params.typeName}`)
    },
    async addYourDeviceRating(rating: number, userId: number, deviceId: number) {
        return instance.post('api/rating', {userId, deviceId, rate: rating})
    },
    async getDevicesByIds(deviceIds: Array<number>) {
        return instance.get(`api/device/deviceIds?deviceIds=${deviceIds}`)
    },
    async getTotalCount(params) {
        if(!params) return instance.get(`api/device/totalCount`)
        // if(params.brandId && !params.typeId) return instance.get(`api/device/totalCount?brandId=${params.brandId}`)
        // if(!params.brandId && params.typeId) return instance.get(`api/device/totalCount?typeId=${params.typeId}`)
        return instance.get(`api/device/totalCount?typeId=${params.typeId}&brandId=${params.brandId}`)
    }
}

type loginApiType = { 
    login (email: string, password: string): Promise<AxiosResponse<User & {token: string}>>,
    auth (): Promise<AxiosResponse<{
        token: string,
        role: string,
        email: string
    }>>,
    registration (email: string, password: string): Promise<AxiosResponse<User & {token: string}>>,
    getYourRatings (userId: number): Promise<AxiosResponse<Rating[]>>,
    setNewEmail(email: string, id: number): Promise<AxiosResponse<{email: string}>>
}

export const loginAPI: loginApiType = {
    async login(email: string, password: string) {
        return instance.post('api/user/login', {email, password})
    },
    async auth(){
        return instance.get('api/user/auth').then(res => res)
    },
    async registration(email: string, password: string) {
        return instance.post('api/user/registration', {email, password})
    },
    async getYourRatings (userId: number) {
        return instance.get(`api/rating/user/${userId}`)
    },
    async setNewEmail (email: string, id: number) {
        return instance.post('api/user/newEmail', {email, id})
    }
}

type adminApiType = {
    file: File | null, 
    addType ({name}: Type): Promise<AxiosResponse<Type>>,
    addBrand ({name}: Brand): Promise<AxiosResponse<Brand>>,
    addDevice ({name, price, brandId, typeId, title, description}: Device): Promise<AxiosResponse<Device>>,
    addPhoto (File: File): Promise<File>
}

export const adminApi: adminApiType = {
    file:  null,
    async addType({name}: Omit<Type, "id">) {
        return instance.post<Type>('/api/type', {name})
    },
    async addBrand({name}: Omit<Brand, "id">) {
        return instance.post<Brand>('/api/brand', {name})
    },
    async addDevice({name, price, brandId, typeId, title, description}: Omit<Device, "id, rating, img">) {
        const formData = new FormData()
        if(name) formData.append('name', name)
        formData.append('price', String(price))
        formData.append('brandId', String(brandId))
        formData.append('typeId', String(typeId))
        formData.append('title', String(title))
        formData.append('description', String(description))
        if(this.file) formData.append('img', this.file)
        return await instance.post<Device>('/api/device', formData, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    addPhoto(File: File) {
        this.file = File
        return new Promise((res, rej) => {
            if(this.file) res(this.file)
            else rej('File is not found')
        })
    }
}

interface basketApiData {
    file?: Blob | string,
    getBasket(params: {basketId?: number, deviceId?: number, userId?: number}): Promise<AxiosResponse<Basket>>
    addDeviceToBasket(params: {basketId?: number, deviceId?: number}): Promise<AxiosResponse<BasketDevice>>
    getDevicesFromBasket(params: {basketId?: number, deviceId?: number}):  Promise<AxiosResponse<BasketDevice[] | string>>
    deleteDeviceFromBasket(params: {basketId?: number, deviceId?: number}): Promise<AxiosResponse<Device>>,
    changeCountOfProducts({deviceId, countOfProducts, basketId}: {deviceId: number, countOfProducts: number, basketId: number}): Promise<AxiosResponse<BasketDevice>>
}

export const basketApi: basketApiData = {
    async getBasket(params) {
        return await instance.get(`/api/basket/${params.userId}`)
    },
    async addDeviceToBasket(params){
        return instance.post(`api/basket/${params.basketId}?deviceId=${params.deviceId}`).then(res => res)
    },
    async getDevicesFromBasket(params){
        return instance.get(`api/basket/devices/${params.basketId}`).then(res => res)
    },
    async deleteDeviceFromBasket(params) {
        return instance.delete(`api/basket/devices/${params.basketId}?deviceId=${params.deviceId}`).then(res => res)
    },
    async changeCountOfProducts({deviceId, countOfProducts, basketId}) {
        return instance.post(`api/basket/devices/${deviceId}`, {countOfProducts, basketId})
    }
}