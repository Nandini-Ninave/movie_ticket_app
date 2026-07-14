import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { yupValidation } from "./yupValidation"
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"
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
                    break
                }
            }
            if(flag===true){
                console.log(data)
                mutate(data)
            }
            // info.filter((item)=>{
            //     console.log(item)
            // })
            // info.filter((item:any)=>{
            //     if(item.email===data.email){
                    
            //     }
            // })
            // const filtereddata = info.filter((item:any)=>{console.log(item.email); console.log(data.email); console.log(item.email===data.email)})
            // console.log(filtereddata.every((i)=>console.log(i)))
            // {filtereddata?console.log("true - ",data):console.log("false - ",data)}
            // console.log(filtereddata)
            // if(filtereddata){
            //     console.log(data)
            // }
            // info.map((item:any)=>{
            //     if(data!==item){
            //         // console.log(item)
            //         console.log(data)
            //         setNewdata({...newdata, fullname:item.fullname, email:item.email, password:item.password, confirmPassword:item.confirmPassword})
            //         console.log(newdata)
            //         // mutate(data)
            //     }    
            // })
            // console.log(newdata)
            // mutate(data)
            // navigate("/")
        }
    }
    return(
        <div>    
        <form onSubmit={handleSubmit(handle)}>
          <input type="text" placeholder="Enter username" {...register("fullname")} onChange={(e)=>setName(e.target.value)}></input>
          {errors.fullname && <p>{errors.fullname.message}</p>}
          <input type="email" placeholder="Enter email" {...register("email")} onChange={(e)=>setEmail(e.target.value)}></input>
          {errors.email && <p>{errors.email.message}</p>}
          <input type="password" placeholder="Enter password" {...register("password")} onChange={(e)=>setPassword(e.target.value)}></input>
          {errors.password && <p>{errors.password.message}</p>}
          <input type="password" placeholder="Confirm password" {...register("confirmPassword")} onChange={(e)=>setCnfPwd(e.target.value)}></input>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <button type="submit">submit</button>
      </form>
        </div>
    )
}
export default RegistrationForm
