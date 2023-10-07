import {applyMiddleware, combineReducers} from 'redux'
import thunkMiddleWare from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import deviceReducer from "./deviceSlice";
import authReducer from "./authSlice";
import adminPageReducer from "./adminPageSlice";
import basketReducer from "./basketSlice";
import NotificationReducer from "./notificationSlice";
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    form: formReducer,
    devicesPage: deviceReducer,
    auth: authReducer,
    adminPage: adminPageReducer,
    basketPage: basketReducer,
    notificationPage: NotificationReducer
})

// const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleWare))

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)))
const state = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleWare)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof state.dispatch
export default state