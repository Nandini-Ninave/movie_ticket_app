import { useEffect, useState } from "react"
// {Array.isArray(item.seats) ? item.seats.map((seat) => seat + 1).join(", ") : item.seats}
import { useAppSelector } from "../reduxToolkit/hook"
import { BOOKING_TITLE } from "../../constant"
import { seats } from "../reduxToolkit/movieSlice"
import PopUpModel from "../../reusableComponents/PopUpModel"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { set_history } from "../url"
import Navbar from "../../reusableComponents/Navbar"
import { useDispatch } from "react-redux"

interface Historyinfo {
	id: string,
	email: string,
	movieName: string,
	date: number,
	time: number,
	seats: number[],
	total: number,
	theaterName: string
}

interface Booked {
	bookedtheaterName: string,
	time: number,
	totalSeats: [],
	bookedSeats: number[]
}

function SeatBooking() {
	const [booked, setBooked] = useState<Booked[]>([])
	const [isModalOpen, setModalOpen] = useState(false)
	const [arr, setArr] = useState(Array(60).fill(false))
	const [silver, setSilver] = useState<number[]>([])
	const [gold, setGold] = useState<number[]>([])
	const [premium, setPemium] = useState<number[]>([])
	const [selected, setSelected] = useState<number[]>([])
	const [historyInfo, setInfo] = useState<Historyinfo[]>([])
	const email = localStorage.getItem("email")
	const movieName = localStorage.getItem("movieName")
	const total = (((silver.length) * 150) + ((gold.length) * 250) + (premium.length) * 350)
	const disp = useDispatch()
	const time = new Date(Date.now())
	const theaterNameLocal = localStorage.getItem("theaterName")
	const{selectedSeats} = useAppSelector((state)=>state.seats)
	const { hr, min, theaterName } = useAppSelector((state) => state.movietime)
	const bookedTheater = useAppSelector((state) => state.seats.booked)
	const bookedSeats = bookedTheater.find((theater) => theater.theaterName === theaterNameLocal && theater.time === hr)?.selectedSeats || [];
	console.log("redux - ",selectedSeats)
	useEffect(() => {
		setBooked({
			...booked, bookedtheaterName: theaterNameLocal, time: localStorage.getItem("hour"),
			totalSeats: arr,
			bookedSeats: selected
		})
		// disp(seats({ selectedSeats: selected}))
	}, [selected])
	console.log(booked)
		
	const mutation = useMutation({
		mutationFn: async (newdata: Historyinfo[]) => {
			const response = await axios.post(set_history, newdata)
			return response
		}
	})

	const selectedSeat = (index: number) => {
		if (silver.includes(index) || gold.includes(index) || premium.includes(index) || bookedSeats.includes(index)) return
		if (index <= 23) {
			setSilver([...silver, index])
		}
		else if (index > 23 && index <= 47) {
			setGold([...gold, index])
		}
		else if (index > 47 && index <= 59) {
			setPemium([...premium, index])
		}

		const newArr = [...arr]
		newArr[index] = true
		setArr(newArr)
		console.log(newArr)
		setSelected([...selected, index])
	}

	const handleSeatSelection = () => {
		console.log("inside")
		disp(seats({ selectedSeats: selected, total: total, theaterName: theaterNameLocal, time: hr }))
		const copiedData = { ...historyInfo, email: email, movieName: movieName, theaterName: theaterName, date: time.toLocaleDateString(), time: hr, seats: selected, total: total }
		console.log("copied data - ",copiedData)
		setInfo(copiedData)
		mutation.mutate(copiedData)
	}
	return (
		<div className="min-h-screen bg-zinc-800 p-4 sm:p-6 lg:p-8 text-gray-800">
			<Navbar />
			<div className="bg-zinc-700 rounded-2xl shadow-sm p-6 mt-15 border border-gray-700">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
					<h1 className="text-2xl sm:text-3xl font-bold text-white">{BOOKING_TITLE}</h1>
					<p className="text-lg font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-100">{hr}:{min}</p>
				</div>
				<div className="p-2 sm:p-4">
					<p className="mb-4 text-xs font-bold text-white text-center border-b-2 border-gray-200 pb-2 max-w-md mx-auto">screen</p>
					<div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2 sm:gap-3 mb-10 max-w-3xl mx-auto justify-items-center">
							{Array.from({ length: 60 }).map((item, index) => {
								const isBooked = bookedSeats.includes(index);
								const isSelected = selected.includes(index);
								return (
									<button key={index}	disabled={isBooked} onClick={() => selectedSeat(index)}
										className={`aspect-square w-full rounded-lg text-sm border ${isBooked ? "bg-gray-400 border-gray-700 text-white cursor-not-allowed" : isSelected ? "bg-blue-400 border-blue-700 text-white" : "bg-green-400 border-green-700 text-white hover:bg-green-600"}`}>
										{index + 1}
									</button>
								);
							})}

					</div>

					<div className="border border-gray-200 flex flex-col md:flex-row gap-6 w-full max-w-2xl p-6 mx-auto rounded-xl bg-gray-50">
						<div >
							<div className="border border-gray-200 bg-white rounded-t-xl p-3 ">
								<h2>Seat Categories</h2>
							</div>
							<div className="border border-gray-200 bg-white rounded-b-xl p-4">
								<div className="flex justify-around gap-6 items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
									<button className="bg-red-300 h-6 w-6 mt-1"></button>
									<p>Premium</p>
									<p>350</p>
								</div>
								<div className="flex justify-around gap-6">
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
						<div className="ml-20 w-80">
							<h1 className="text-xs font-bold  text-gray-400 mb-2">Selected Seats</h1>
							<div className="flex flex-wrap gap-1.5 mb-4">
								{selected.map((seats: any) => {
									return (<p>{seats}</p>)
								})}
							</div>
							<div className="border-t border-gray-100 pt-3 flex justify-between items-center">
								<h1 className="text-sm font-medium text-gray-500">Total Amount</h1>
								<p className="text-xl font-black text-gray-900">₹{total}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<button onClick={() => { handleSeatSelection(); setModalOpen(true) }} className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-center">submit</button>
			<PopUpModel isOpen={isModalOpen} onClose={() => setModalOpen(false)} selectedSeats={selected} total={total}/>
			{/* <PopUpModel isOpen={isModalOpen} onClose={() => setModalOpen(false)} /> */}
		</div>
	)
}
export default SeatBooking