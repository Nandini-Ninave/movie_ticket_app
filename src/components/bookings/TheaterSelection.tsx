import { use, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hook"
import { movietime, seats } from "../reduxToolkit/movieSlice"
import { useMutation } from "@tanstack/react-query"
import { set_history } from "../url"
import axios from "axios"
import Navbar from "../../reusableComponents/Navbar"


function TheaterSelection(){
    const[theater, setTheater] = useState([{name:"PVR Cinema", location:"City mall"}, {name:"Inox Cinema", location:"City mall"}, {name:"abc Cinema", location:"City mall"}, {name:"pvr Cinema", location:"City mall"}])
    const{name} = useAppSelector((state)=>state.moviename)
    const time = new Date(Date.now())
    const [hour,sethour] = useState(time.getHours())
    const [min, setMin] = useState(time.getMinutes())
    const navigate = useNavigate()
    const disp = useAppDispatch()
    
    const email = localStorage.getItem("email")
    if(hour>24){
        sethour(prev=>prev-24)
    }


    const handleclick=(hour:number,min:number, theater:string, index:number)=>{
        disp(movietime({hr:hour, min:min, date:time.getDate(), month:time.getMonth(), theaterName:theater}))
        navigate("/seatbooking")
    }   
    return(
        <div>
            <Navbar/>
        <div className="p-6">
            <h1 className="mb-5 text-xl font-bold">Select Theater & Show Time</h1>
            <p>{name}</p>
            {theater.map((item,index)=>{
                return(
                <div className="border border-gray-100 flex flex-row gap-6 mb-5 p-3">
                    <div>
                        <p>{item.name}</p>
                        <p>{item.location}</p>
                        <button className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg" onClick={()=>handleclick(hour,min,item.name,index)}>{hour}:{min}</button>
                        <button className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg" onClick={()=>handleclick(hour+3,min, item.name, index)}>{hour+3}:{min}</button>
                        <button className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg" onClick={()=>handleclick(hour+6,min, item.name, index)}>{hour+6}:{min}</button>
                        <button className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg" onClick={()=>handleclick(hour+9,min, item.name, index)}>{hour+9}:{min}</button>
                    </div>
                </div>
                )
            })}
        </div>
        </div>
        )
}
export default TheaterSelection