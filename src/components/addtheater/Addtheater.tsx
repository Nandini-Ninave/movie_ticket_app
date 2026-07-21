// import { useMutation, useQuery } from "@tanstack/react-query"
// import axios from "axios"
// import { useState } from "react"
// import { get_theater, set_theater } from "../url"
// import Navbar from "../../reusableComponents/Navbar"


// interface Theater{
//     theaterName:string,
//     location:string
// }

// const Addtheater=()=>{
//     const [name, setName] = useState("")
//     const [location, setLocation] = useState("")
//     const [theaters, setTheaters] = useState([])

//     const apicall = async (): Promise<Theater[]> => {
//         const { data } = await axios.get(get_theater)
//         console.log(data)
//         setTheaters(data)
//         return data
//     }
//     const { data } = useQuery({
//         queryKey: ["theater"],
//         queryFn: apicall
//     })

//     const { mutate } = useMutation({
//         mutationFn: async (data:Theater[]) => {
//             console.log(data)
//             const response = await axios.post(set_theater, data)
//             return response
//         }
//     })
//     const handleSubmit=(name:string, location:string)=>{

//         // if(theaters.length==0){
//             console.log(typeof name, typeof location)
//             const data = {...theaters, theaterName:name, location:location}
//             console.log(theaters)
//             alert("Theater Added") 
//             setName("")
//             setLocation("")
//             mutate(data)
//         // }
//         // else{
//         //     for(let item of theaters){
//         //         console.log(item)
//         //     }
            
//             // theaters?.filter((item)=>{
//             // // if(item.theaterName===name && item.location===location){
//             // //     alert("data already exists")
//             // // }
//             // if((item.theaterName===name && item.location!==location) || (item.theaterName!==name && item.location!==location)){
//             //     const data = {...theaters, theaterName:name, location:location}
//             //     console.log(data)
//             //     console.log(theaters)
//             //     alert("Theater Added")
//             //     mutate(data)
//             //     setName("")
//             //     setLocation("")
//             // }
//         }   
//         // }
//         // console.log(typeof name, typeof location)
//         // const data = {...theaters, theaterName:name, location:location}
//         // console.log(theaters)
//         // alert("Theater Added") 
//         // setName("")
//         // setLocation("")
//         // mutate(data)
//         // theaters?.map((item)=>{
//         //     if(item.theaterName===name && item.location===location){
//         //         alert("data already exists")
//         //     }
//         //     else if((item.theaterName===name && item.location!==location) || (item.theaterName!==name && item.location!==location)){
//         //         const data = {...theaters, theaterName:name, location:location}
//         //         console.log(data)
//         //         console.log(theaters)
//         //         alert("Theater Added")
//         //         mutate(data)
//         //         setName("")
//         //         setLocation("")
//         //     }
//         // })        
   
//     // }

//     return(
//         <div>
//             <Navbar/>
//         <section className="bg-zinc-800 dark:bg-gray-900">
//                     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                         <a href="" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
//                             Add new theater
//                         </a>
//                         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                     Create an account
//                                 </h1>
//                                 <form  className="space-y-4 md:space-y-6" action="#">
//                                     <div>
//                                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Theater Name</label>
//                                         <input id="theatername" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter theater name..."  onChange={(e) => setName(e.target.value)} />
//                                     </div>
//                                     <div>
//                                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
//                                         <input  id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter location..."  onChange={(e) => setLocation(e.target.value)} />
//                                     </div>                              
//                                     <button onClick={()=>{handleSubmit(name,location)}}  className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </section></div>
//     )
// }
// export default Addtheater