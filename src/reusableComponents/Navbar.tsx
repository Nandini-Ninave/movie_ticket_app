import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../components/hook"
import { logout } from "../components/movieSlice"
import "./Navbar.css"
function Navbar(){
    const navigate = useNavigate()
    const{isAuthenticated} = useAppSelector((state)=>state.login)
    const disp = useAppDispatch()
    const userlogout=()=>{
        disp(logout({isAuthenticated:isAuthenticated}))
        if(isAuthenticated===false){
            alert("User is not Authenticated")
            navigate("/")
        }
    }
    return(
        <div className="p-2 pt-0"><nav className="bg-white p-0 sm:px-8 py-4">
                <ul className="w-120 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:w-auto justify-center ">
                    <li className="text-blue-600 font-larger text-3xl">logo</li>
                    <li className="text-gray-600 font-medium ml-20"><NavLink to="/home">Home</NavLink></li>
                    <li className="text-gray-600 font-medium "><NavLink to="/allmovies">Movies</NavLink></li>
                    <li className="text-gray-600 font-medium ">content</li>        
                    <li className="text-gray-600 font-medium ml-5 mb-3"><input className="mt-4 border border-black-50 w-80 rounded-md" placeholder="content"></input><i></i></li>
                    <li className="text-gray-600 font-medium ml-5"><button onClick={userlogout}>logout</button></li>
                </ul>
            </nav></div>
    )
}
export default Navbar