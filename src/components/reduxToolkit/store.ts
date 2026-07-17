import { configureStore } from "@reduxjs/toolkit";
import AuthUserSliceReducer from "./movieSlice"

export const store = configureStore({
    reducer:{
        login:AuthUserSliceReducer,
        logout:AuthUserSliceReducer,
        movietime:AuthUserSliceReducer,
        moviename:AuthUserSliceReducer,
        seats:AuthUserSliceReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch