import { useState } from "react"
import Navbar from "../../reusableComponents/Navbar"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { get_history } from "../url"

interface FilteredData{
    movieName:string,
    TheaterName:string,
    Date:string,
    time:string,
    seats:number[],
    total:number
}


const TicketBookedHistory=()=>{
    const[history, setHistory] = useState([])
    const[filteredData, setFilteredData] = useState([])
    const apicall = async () => {
        const { data } = await axios.get(get_history)
        setHistory(data)
        return data
    }
    const { data: registration } = useQuery({
        queryKey: ["history"],
        queryFn: apicall
    })

    // for(let item of history){
    //     if(item.email===localStorage.getItem("email")){
    //         // console.log(item.email)
    //         const copiedArr = {...history, movieName:item.movieName, TheaterName:item.theaterName, Date:item.date, time:item.time, seats:item.seats,  total:item.total}
    //         setFilteredData(copiedArr)
    //     }
        
    // }
    // console.log(filteredData)
    return(<div>
        <Navbar/>
        <p className="mt-20">History</p>
        {history.map((obj)=>{
            return(
                <div>
                    <p>{obj.movieName}</p>
                    <p>{obj.email}</p>
                </div>
            )
        })}
    </div>)
}
export default TicketBookedHistory