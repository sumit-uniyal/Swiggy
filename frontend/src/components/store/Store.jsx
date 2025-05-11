import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from 'redux-persist';
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
    whitelist: ['cart','user']
})

const persistedReducer = persistReducer(presistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

const persistor = persistStore(store);

export { store as default, persistor };