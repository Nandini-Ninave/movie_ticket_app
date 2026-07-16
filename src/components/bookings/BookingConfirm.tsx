
import { useAppSelector } from "../reduxToolkit/hook"

function BookingConfirm(){
    const{selectedSeats,total} = useAppSelector((state)=>state.seats)
    const data:number[] = selectedSeats
    console.log(data.selectedSeats)
    console.log(total)
    // const[seat, setSeat] = useState([])
    
    return(<div><p>Booking confirm</p>
        {data.selectedSeats.map((seat:any)=>{
            return(<p>seat: {seat}</p>)
        })}
        <p>total: {total}</p>
    </div>)
}
export default BookingConfirm
