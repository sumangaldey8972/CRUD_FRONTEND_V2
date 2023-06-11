import {combineReducers, legacy_createStore, applyMiddleware} from "redux"
import { user_reducers } from "./Users/user.reducer";
import thunk from "redux-thunk"
const rootReducers = combineReducers({
    auth: user_reducers
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))