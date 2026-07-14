import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login(){
    const[email,setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[data, setData] = useState([])
    const navigate = useNavigate()
    const apicall = async ()=>{
        const {data} = await axios.get("https://6a55cf8ce49d9eb2cc5613be.mockapi.io/api/movie/registration")
        setData(data)
        return data
    }
    const {data:person} = useQuery({
        queryKey:["person"],
        queryFn:apicall
    })
    const submit=()=>{
        console.log(email,password)
        data.map((item:any)=>{
            {(email===item.email && password===item.password)?navigate("/home"):navigate("/reg")} 
        })
    }
    return(
        <div className=" min-h-screen  w-screen flex items-center justify-center bg-gray-100 px-4">
         <div className="flex flex-col items-center p-10 min-h-[500px] w-full max-w-md bg-white border-4 border-black/50 rounded-xl shadow-lg">
        <div className="h-20 w-80 mt-10 text-center ">
            <h2 className="text-center m-2 mb-6">Welcome Back</h2>
            <h3 className="text-center m-2 mb-6">Login to your account</h3>
        </div>
        <div className="h-20 w-80 mt-10 ">
        <label className="mb-2 text-left m-2 w-64">Email</label><input  className="mt-4 border border-black-50 w-80 rounded-md" placeholder="Enter email..." onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        {/* <br></br> */}
        <div>
        <label className="mb-2 text-left m-2 w-64">Password</label><br></br><input className="mt-4 border border-black-50 w-80 rounded-md" placeholder="Enter password..." onChange={(e)=>setPassword(e.target.value)}></input>
        {/* <br></br> */}
        </div>
       
        <button className="h-10 bg-blue-200 mt-5 w-80 rounded-md" onClick={submit}>login</button> </div>
    </div>)
}
export default Login