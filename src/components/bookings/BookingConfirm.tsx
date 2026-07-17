import { useEffect, useState } from "react"
import Navbar from "../../reusableComponents/Navbar"

interface Bill{
    selectedSeats:number[],
    total:number
}

function BookingConfirm() {
    const total = localStorage.getItem("totalBill")
    const data = localStorage.getItem("selectedSeats")
    const movieName = localStorage.getItem("movieName") 
    const [result, setResult] = useState<Bill[]>([])
    useEffect(()=>{
        setResult(JSON.parse(data))
    },[data])
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mt-5 mx-auto md:h-screen lg:py-0">
           <Navbar/>
            <h1 className="mb-5"> Booking confirm</h1>
            <div className="border border-black-100 h-100 w-80 p-5 flex flex-col gap-5">
                <div className="border border-gray-300">
                    <h1>Ticket details</h1>
                </div>
                <div className="border border-gray-300 h-60 p-5">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        <p>seat: </p>
                        {result.selectedSeats?.map((seat: Bill) => {
                            return (<p>{seat}</p>)
                        })}
                    </div>
                    <p>total: {total}</p>
                </div>
            </div>
        </div>
        )
}
export default BookingConfirm
