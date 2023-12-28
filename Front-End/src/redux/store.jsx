import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({user:userReducer})

const persistConfig = {
    key:"root1",
    version:1,
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store)

