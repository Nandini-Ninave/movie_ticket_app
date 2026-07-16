import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { movietime } from "./reduxToolkit/movieSlice"
import { useAppDispatch, useAppSelector } from "./reduxToolkit/hook"

function TheaterSelection(){
    const[theater, setTheater] = useState([{name:"PVR Cinema", location:"City mall"}, {name:"PVR Cinema", location:"City mall"}, {name:"PVR Cinema", location:"City mall"}, {name:"PVR Cinema", location:"City mall"}])
    const navigate = useNavigate()
    const disp = useAppDispatch()
    const{name} = useAppSelector((state)=>state.moviename)
    console.log(name)
    const time = new Date(Date.now())
    const [hr,setHr] = useState(time.getHours())
    const [min, setMin] = useState(time.getMinutes())
    if(hr>24){
        setHr(prev=>prev-24)
    }
    const handleclick=(hr:number,min:number)=>{
        console.log(hr, min)
        disp(movietime({hr:hr, min:min}))
        navigate("/seatbooking")
    }   
    return(
        <div>
        <div classNameName="p-6">
            <h1 classNameName="mb-5 text-xl font-bold">Select Theater & Show Time</h1>
            <p>{name}</p>
            {theater.map((item)=>{
                return(<div classNameName="border border-gray-100 flex flex-row gap-6 mb-5 p-3">
                        <div></div>
                        <div><p>{item.name}</p>
                        <p>{item.location}</p>
                        <button classNameName="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg" onClick={()=>handleclick(hr,min)}>{hr}:{min}</button>
                        <button classNameName="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg" onClick={()=>handleclick(hr+3,min)}>{hr+3}:{min}</button>
                        <button classNameName="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg" onClick={()=>handleclick(hr+6,min)}>{hr+6}:{min}</button>
                        <button classNameName="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg" onClick={()=>handleclick(hr+9,min)}>{hr+9}:{min}</button></div>
                    </div>)
            })}
        </div></div>)
}
export default TheaterSelection