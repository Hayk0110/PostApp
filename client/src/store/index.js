import {combineReducers, configureStore} from "@reduxjs/toolkit"
import AuthReducer from "./reducers/AuthReducer";
import PostReducer from "./reducers/PostReducer";
import FilterReducer from "./reducers/FilterReducer";
import PaginationReducer from "./reducers/PaginationReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    posts: PostReducer,
    filter: FilterReducer,
    paginate: PaginationReducer,
})

const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

export default store;