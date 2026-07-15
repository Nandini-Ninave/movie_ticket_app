import { createSlice } from "@reduxjs/toolkit"

interface AuthUser{
    isAuthenticated:boolean,
    user:null
}
const initialState : AuthUser = {
    isAuthenticated:false,
    user:null,
}
export const AuthUserSlice = createSlice({
    name: "authuser",
    initialState,
    reducers:{ 
        login:(state, action)=>{   
            state.isAuthenticated = true
            state.user = action.payload.user
        },
        logout:(state,action)=>{
            state.isAuthenticated = false
            state.user = null
        }
    }
})
export const {login, logout} = AuthUserSlice.actions
export default AuthUserSlice.reducer 