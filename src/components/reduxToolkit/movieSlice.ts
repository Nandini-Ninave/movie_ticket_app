import { createSlice } from "@reduxjs/toolkit"

interface BookedSeat {
  theaterName: string;
  time: number;
  selectedSeats: number[];
}

interface AuthUser{
    isAuthenticated:boolean,
    user:null,
    hr:number,
    min:number,
    name:string,
    selectedSeats:number[],
    total:number,
    date:number,
    month:string,
    theaterName:string,
    booked: BookedSeat[];
}
const initialState : AuthUser = {
    isAuthenticated:false,
    user:null,
    hr:0,
    min:0,
    name:"",
    selectedSeats:[],
    total:0,
    date:1,
    month:"",
    theaterName:"",
    booked: JSON.parse(localStorage.getItem("bookedShows") || "[]"),
}
export const AuthUserSlice = createSlice({
    name: "authuser",
    initialState,
    reducers:{ 
        login:(state, action)=>{   
            state.isAuthenticated = true
            state.user = action.payload.user
            localStorage.setItem("isAuthenticated", state.isAuthenticated)
            localStorage.setItem("email", action.payload.user)
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
            state.date=action.payload.date
            state.month=action.payload.month
            state.theaterName=action.payload.theaterName
            localStorage.setItem("hour",action.payload.hr)
            localStorage.setItem("min", action.payload.min)
            localStorage.setItem("date", action.payload.date)
            localStorage.setItem("month", action.payload.month)
            localStorage.setItem("theaterName", action.payload.theaterName)
        },
        moviename:(state,action)=>{
            state.name=action.payload.name
            localStorage.setItem("movieName", action.payload.name)
        },
        seats:(state,action)=>{
            const { theaterName, time, selectedSeats } = action.payload;
            const theater = state.booked.find((show) => show.theaterName === theaterName && show.time === time)
            if (theater) {
                theater.selectedSeats = [...new Set([...theater.selectedSeats, ...selectedSeats])]
            } else {
                state.booked.push({theaterName, time, selectedSeats})
            }
            localStorage.setItem("bookedShows", JSON.stringify(state.booked))
        }
    }
})
export const {login, logout, movietime,moviename, seats} = AuthUserSlice.actions
export default AuthUserSlice.reducer 