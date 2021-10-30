import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { dishes } from "./dishes";
import { promotions } from "./promotions";
import { comments } from "./comments";
import { leaders } from "./leaders";
import { favorites } from "./favorite";

const config={
    key:'root',
    storage:AsyncStorage,
    debug:true
}

export const ConfigureStore=()=>{
    const store=createStore(
        persistCombineReducers(config,{
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk)
    )
    const persistor=persistStore(store)
    return {store, persistor}
}