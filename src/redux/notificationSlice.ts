import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"

type notificationSliceState = {
    message: string,
    toggleNotification: boolean
}

const initialState: notificationSliceState = {
    message: '',
    toggleNotification: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage (state, action: PayloadAction<string>) {
            state.message = action.payload
        },
        toggleNotification (state, action: PayloadAction<boolean>) {
            state.toggleNotification = action.payload
        }
    }
})

export const setNotification = (message: string, toggleNotification: boolean) => (dispatch: AppDispatch) => {
    dispatch(notificationSlice.actions.setMessage(message))
    dispatch(notificationSlice.actions.toggleNotification(toggleNotification))
}

export default notificationSlice.reducer