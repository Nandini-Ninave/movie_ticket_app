import { useState } from "react"
import { seats } from "./reduxToolkit/movieSlice"
import { useNavigate } from "react-router-dom"
import { BOOKING_TITLE } from "../constant"
import { useAppSelector } from "./reduxToolkit/hook"
import { useDispatch } from "react-redux"

function SeatBooking() {
	const { hr, min } = useAppSelector((state) => state.movietime)
	const [arr, setArr] = useState(Array(60).fill(false))
	const [silver, setSilver] = useState<number[]>([])
	const [gold, setGold] = useState<number[]>([])
	const [premium, setPemium] = useState<number[]>([])
	const [selected, setSelected] = useState<number[]>([])

	const navigate = useNavigate()
	const total = (((silver.length) * 150) + ((gold.length) * 250) + (premium.length) * 350)
	const disp = useDispatch()
	const handleclick = (ind: number) => {
		console.log(arr[ind])
		if (silver.includes(ind) || gold.includes(ind) || premium.includes(ind)) return
		if (ind <= 23) {
			setSilver([...silver, ind])
		}
		else if (ind > 23 && ind <= 47) {
			setGold([...gold, ind])
		}
		else if (ind > 47 && ind <= 59) {
			setPemium([...premium, ind])
		}
		const newArr = [...arr]
		newArr[ind] = true
		setArr(newArr)
		setSelected([...selected, ind])
	}

	const handle = () => {
		console.log(selected)
		disp(seats({ selectedSeats: selected, total: total }))
		navigate("/bookingConfirm")
	}


	return (
		<div className="p-5">
			<div>
				<div className="">
					<h1 className="">{BOOKING_TITLE}</h1>
					<p>{hr}:{min}</p>
				</div>
				<div className="p-15">
					<p className="mb-5">screen</p>
					<div className="grid grid-cols-12 gap-4 mb-20">
						{arr.map((i, ind) => {
							return (<button onClick={() => handleclick(ind)} className={`${arr[ind] ? 'bg-blue-500' : "bg-green-200"}`} key={ind}>i</button>)
						})}
					</div>

					<div className="border border-black-100 flex gap-5 w-150 p-10 ml-30">
						<div >
							<div className="border border-red-200 w-80"><h2>Seat Categories</h2></div>
							<div className="border border-red-200 ">
								<div className="flex justify-around gap-6">
									<button className="bg-red-300 h-6 w-6 mt-1"></button>
									<p>Premium</p>
									<p>350</p>
								</div>
								<div className="flex justify-around gap-5">
									<button className="bg-yellow-200 h-6 w-6 mt-1"> </button>
									<p>Gold</p>
									<p>250</p>
								</div>
								<div className="flex justify-around gap-5">
									<button className="bg-red-200 h-6 w-6 mt-1"> </button>
									<p>Silver</p>
									<p>150</p>
								</div>
							</div>
						</div>
						<div className="border border-green-100 ml-20 w-80">
							<h1>Selected Seats</h1>
							{selected.map((seats: any) => {
								return (<p>{seats}</p>)
							})}
							<h1>Total</h1>
							<p>{total}</p>
						</div>
					</div>
				</div>
			</div>
			<button onClick={handle}>submit</button>
		</div>)
}
export default SeatBooking