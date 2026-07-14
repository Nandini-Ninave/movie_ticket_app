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
    return(<div>
        login
        <input placeholder="Enter email..." onChange={(e)=>setEmail(e.target.value)}></input>
        <input placeholder="Enter password..." onChange={(e)=>setPassword(e.target.value)}></input>
        <button onClick={submit}>submit</button>
    </div>)
}
export default Login