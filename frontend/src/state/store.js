import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist"
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { version } from "react";
import authReducer from "./mainSlice.js"



const persistConfig={
    key:"root",
    storage,
    version:1
}

const persistReduceris=persistReducer(persistConfig,authReducer);

export const store=configureStore({
    reducer:persistReduceris,
  middleware:(getDefaultMiddleware)=>{
   return getDefaultMiddleware({
        serilaizableCheck:{
            ignoredAction:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
          },
    })
  }
})