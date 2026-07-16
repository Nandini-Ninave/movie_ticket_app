import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Navbar from "../reusableComponents/Navbar"
import { useAppSelector } from "./reduxToolkit/hook"

interface movie{
    createdAt:string,
    name:string,
    avatar:string,
    id:string
}


function Home(){
    const navigate = useNavigate()  
    const[moviedata, setMovieData] = useState([])
    const{isAuthenticated, user} = useAppSelector((state)=>state.login)
    console.log(isAuthenticated, user)
    console.log(localStorage.getItem("isAuthenticated"))
    const apicall = async ()=>{
        const {data} = await axios.get("https://6a55cf8ce49d9eb2cc5613be.mockapi.io/api/movie/movies")
        setMovieData(data)
        return data
    }
    const {data} = useQuery({
        queryKey:["movies"],
        queryFn:apicall
    })
    
    const fun=()=>{
        navigate("/allmovies")
    }
    return(<div className="bg-blue-100">
        <div className="flex flex-col items-center p-5 bg-white">
            <Navbar/>
            <div className="grid grid-cols-4 gap-6 mt-8 ml-4 p-7">
                {moviedata.slice(0,8).map((item:movie)=>{
                    return(<div className="h-40 w-40  flex flex-col justify-between">
                        <div className="border border-black-10 h-20 w-20"><img src={item.avatar}></img></div>
                        <p className="mt-2 mb-4">{item.name}</p>
                    </div>)
                })}
                <p className="w-100 text-end ml-100"><button className="text-blue-600 text-xl" onClick={fun}>view all...</button></p>
            </div>
            
        </div>
    </div>)
}
export default Home