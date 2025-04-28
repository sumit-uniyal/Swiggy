import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import foodReducer from './slices/FoodSlice'
import cartReducer from './slices/CartSlice'
import userReducer from './slices/UserSlice'

const rootReducer = combineReducers({
    food: foodReducer,
    cart: cartReducer,
    user:userReducer
})

const presistConfig=({
    key:'root',
    storage: storage,
    whitelist: ['cart']
})

const persistedReducer = persistReducer(presistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

export default store