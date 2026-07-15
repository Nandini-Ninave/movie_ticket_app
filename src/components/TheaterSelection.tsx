import { useEffect, useState } from "react"

function TheaterSelection(){
    const[theater, setTheater] = useState([{name:"PVR Cinema", location:"City mall"}, {name:"PVR Cinema", location:"City mall"}, {name:"PVR Cinema", location:"City mall"}, {name:"PVR Cinema", location:"City mall"}])
    const time = new Date(Date.now())
    const [hr,setHr] = useState(time.getHours())
    const [min, setMin] = useState(time.getMinutes())
    if(hr>24){
        setHr(prev=>prev-24)
    }
    return(
        <div>
        <div className="p-6">
            <h1 className="mb-5 text-xl font-bold">Select Theater & Show Time</h1>
            {theater.map((item)=>{
                return(<div className="border border-gray-100 flex flex-row gap-6 mb-5 p-3">
                        <div></div>
                        <div><p>{item.name}</p>
                        <p>{item.location}</p>
                        <button className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg">{hr}:{min}</button>
                        <button className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg">{hr+3}:{min}</button>
                        <button className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg">{hr+6}:{min}</button>
                        <button className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg">{hr+9}:{min}</button></div>
                    </div>)
            })}
        </div></div>)
}
export default TheaterSelection