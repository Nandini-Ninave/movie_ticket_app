import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../reusableComponents/Navbar"

function Allmovies(){
    const[movies, setMovies] = useState([])
    const navigate = useNavigate()
    const apicall = async ()=>{
        const {data} = await axios.get("https://6a55cf8ce49d9eb2cc5613be.mockapi.io/api/movie/movies")
        setMovies(data)
        return data
    }
    const {data} = useQuery({
        queryKey:["movies"],
        queryFn:apicall
    })
    const [startIndex, setStartIndex]= useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    let flag = true
    const previous=()=>{
        flag=false
        if(currentPage>0){
            setCurrentPage(prev=>prev-1)
            setStartIndex(prev=>prev-5)
        }
    }
    const next=()=>{
        flag= true
        setCurrentPage(prev=>prev+1)
        setStartIndex(prev=>prev+5)
    }
    const booknow=()=>{
        navigate("/theaterSelectionPage")
    }
    return(
    <div className=" min-h-screen  w-screen flex items-center justify-center px-2">
        <div className="flex flex-col items-center p-4 min-h-[500px] w-full max-w-md ">
            <Navbar/>
            <div className="w-100 mb-7 md:w-32">
                <h1 className="text-xl font-bold " >All movies</h1>
            </div>
            
            {flag?
                (movies.slice(startIndex,startIndex+5).map((item:any)=>{
                    return(
                        <div className="bg-gray-100 border border-gray-400 rounded-xl mb-5 h-20 w-100 p-4 flex flex-row gap-10 justify-space-between sm:flex flex-row">
                            <img src={item.avatar}></img>
                            <p className="font-serif">{item.name}</p>
                            <button className="bg-blue-100 border border-blue-400 h-10 mt-0 ml-20 w-35 rounded-xl" onClick={booknow}>book now</button>
                        </div>
                    )
                })):(movies.slice(startIndex,startIndex+5).map((item:any)=>{
                    return(
                        <div className=" bg-white border border-black-50 mb-5 h-20 w-100 flex flex-row gap-10 justify-space-between">
                            <image href={item.image}>image</image>
                            <p className="font-serif">{item.name}</p>
                            <button className="bg-blue-100 h-10 mt-5 ml-20 w-25" onClick={booknow}>book now</button>
                        </div>
                    )
                }))
            }
            <div className="w-100 flex justify-between">
                <button className="bg-blue-200 w-20 border border-blue-500 text-blue-600 text-xl rounded-xl" onClick={previous}>prev</button>
                <button className="bg-blue-200 w-20 border border-blue-500 text-blue-600 text-xl rounded-xl" onClick={next}>next</button>
            </div>
        </div>
    </div>)
}
export default Allmovies