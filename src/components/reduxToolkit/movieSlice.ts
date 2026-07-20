import { createSlice } from "@reduxjs/toolkit"

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
    booked:{theaterName:string, time:number, bookedSeats:[]}
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
    booked:{theaterName:"", time:0, bookedSeats:[]}
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
            state.selectedSeats=action.payload
            console.log(action.payload.selectedSeats)
            state.selectedSeats=[...action.payload.selectedSeats]
            state.total=action.payload.total
            state.theaterName = action.payload.theaterName
            // console.log(state.selectedSeats)
            const item = JSON.parse(localStorage.getItem("selectedSeats"))
            console.log(item)
            console.log(item?.theaterName)
            console.log(item?.time)
            console.log(localStorage.getItem("theaterName"))
            console.log(localStorage.getItem("hour"))
            if(item?.theaterName == localStorage.getItem("theaterName") && item?.time == localStorage.getItem("hour")){
                console.log("matched")
                console.log(item?.selectedSeats)
                for(let i of item?.selectedSeats){
                    // const updatedArr = item?.selectedSeats.push(i)
                    localStorage.setItem("selectedSeats", i)
                }
            }
            // localStorage.setItem("selectedSeats",JSON.stringify(action.payload))

                // if((localStorage.getItem("selectedSeats"))!=null){
		    //    (localStorage.getItem('selectedSeats'))
            //     localStorage.setItem('selectedSeats', JSON.stringify(action.payload));
            // }	
	        }
        //     if(!selectedSeats.includes(action.payload)){
                
        //     localStorage.setItem("totalBill",action.payload.total)
            
        // }
    }
})
export const {login, logout, movietime,moviename, seats} = AuthUserSlice.actions
export default AuthUserSlice.reducer 