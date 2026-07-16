import { createSlice } from "@reduxjs/toolkit"

interface AuthUser{
    isAuthenticated:boolean,
    user:null,
    hr:number,
    min:number,
    name:string,
    selectedSeats:number[],
    total:number
}
const initialState : AuthUser = {
    isAuthenticated:false,
    user:null,
    hr:0,
    min:0,
    name:"",
    selectedSeats:[],
    total:0
}
export const AuthUserSlice = createSlice({
    name: "authuser",
    initialState,
    reducers:{ 
        login:(state, action)=>{   
            state.isAuthenticated = true
            state.user = action.payload.user
            localStorage.setItem("isAuthenticated", state.isAuthenticated)
            localStorage.setItem("email", state.user)
        },
        logout:(state,action)=>{
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem("isAuthenticated")
            localStorage.removeItem("email")
        },
        movietime:(state,action)=>{
            state.hr=action.payload.hr
            state.min=action.payload.min
        },
        moviename:(state,action)=>{
            state.name=action.payload.name
        },
        seats:(state,action)=>{
            // console.log(action.payload)
            state.selectedSeats=action.payload
            state.total=action.payload.total
        }
    }
})
export const {login, logout, movietime,moviename, seats} = AuthUserSlice.actions
export default AuthUserSlice.reducer 