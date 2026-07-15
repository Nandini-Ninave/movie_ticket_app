import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { yupValidation } from "./yupValidation"
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function RegistrationForm(){
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [pwd, setCnfPwd] = useState("")
    const[data, setData] = useState("")
    const[info, setInfo] = useState([])
    const navigate = useNavigate()
    // const[newdata, setNewdata] = useState({})
    const {register, handleSubmit, formState:{errors}} = useForm({resolver:yupResolver(yupValidation)})


    const apicall = async ()=>{
        const {data} = await axios.get("https://6a55cf8ce49d9eb2cc5613be.mockapi.io/api/movie/registration")
        setInfo(data)
        // console.log(info)
        return data
    }
    const {data:person} = useQuery({
        queryKey:["person"],
        queryFn:apicall
    })
    // console.log(info)

    const {mutate} = useMutation({
        mutationFn:async (data)=>{
            const response = await axios.post("https://6a55cf8ce49d9eb2cc5613be.mockapi.io/api/movie/registration", data)
            console.log(response.data)
            return response.data
        }
    })
    const handle=(data:any)=>{
        console.log(info)
        if(password!==pwd){
            alert("Confirm password and password are not same")
        }
        else{
            console.log("inside onsubmit")
            setData(data)
            console.log(JSON.stringify(data))
            let flag = true
            for(let item of info){
                console.log(item.email)
                if(item.email===data.email){
                    flag = false
                    alert("Email already exists")
                    break
                }
            }
            if(flag===true){
                console.log(data)
                mutate(data)
                alert("Registration successfull")
                navigate("/")
            }
           
        }
    }
    return(
        // <div>
        <div className=" min-h-screen  w-screen flex items-center justify-center bg-gray-100">
         {/* <div className="flex flex-col items-center p-10 w-full max-w-md bg-white border-4 border-black/50 rounded-xl"></div> */}
        <div className="border flex flex-col items-center min-h-[500px] max-w-md  bg-white border border-black-500">    
            <div className="h-20 w-80 mt-9 mb-4 text-center ">
            <h2 className="text-center m-2">Create Account</h2>
            <h3 className="text-center m-2">Sign up to get started</h3>
        </div>
        
        <form onSubmit={handleSubmit(handle)}>
          <div>
            <label className="mb-1 text-left m-2 w-64">Full name</label><br></br>
            <input className="mt-1 mb-2 ml-2 border border-black-50 w-75 rounded-md" type="text" placeholder="Enter username" {...register("fullname")} onChange={(e)=>setName(e.target.value)}></input>
            {errors.fullname && <p className="text-red-400 ml-2 mb-1">{errors.fullname.message}</p>}
          </div>
           <div>
            <label className="mb-2 text-left m-2 w-64">Email</label><br></br>
            <input className="mt-1 mb-2 ml-2 border border-black-50 w-75 rounded-md" type="email" placeholder="Enter email" {...register("email")} onChange={(e)=>setEmail(e.target.value)}></input>
            {errors.email && <p className="text-red-400 ml-2 mb-1">{errors.email.message}</p>}
          </div> 
          <div>
            <label className="mb-2 text-left m-2 w-64">Password</label><br></br>
          <input className="mt-1 mb-2 ml-2 border border-black-50 w-75 rounded-md" type="password" placeholder="Enter password" {...register("password")} onChange={(e)=>setPassword(e.target.value)}></input>
          {errors.password && <p className="text-red-400 ml-2 mb-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="mb-2 text-left m-2 w-64">Confirm Password</label><br></br>
            <input className="mt-1 mb-2 ml-2 border border-black-50 w-75 rounded-md" type="password" placeholder="Confirm password" {...register("confirmPassword")} onChange={(e)=>setCnfPwd(e.target.value)}></input>
            {errors.confirmPassword && <p className="text-red-400 ml-2 mb-1">{errors.confirmPassword.message}</p>}
          </div>
          <button className="h-10 bg-blue-200 mt-5 w-80 rounded-md"type="submit">submit</button>
      </form>
        </div></div>
    )
}
export default RegistrationForm
