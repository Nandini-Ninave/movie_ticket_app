import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../reduxToolkit/hook"
import { BOOKING_TITLE } from "../../constant"
import { seats } from "../reduxToolkit/movieSlice"

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
		<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 text-gray-800">
			<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{BOOKING_TITLE}</h1>
					<p className="text-lg font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-100">{hr}:{min}</p>
				</div>
				<div className="p-2 sm:p-4">
					<p className="mb-4 text-xs font-bold text-gray-400 text-center border-b-2 border-gray-200 pb-2 max-w-md mx-auto">screen</p>
					<div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2 sm:gap-3 mb-10 max-w-3xl mx-auto justify-items-center">
						{arr.map((i, ind) => {
							return (<button onClick={() => handleclick(ind)} className={`aspect-square w-full rounded-lg text-sm border  ${arr[ind] ? 'bg-blue-400 border-blue-700 text-white shadow-blue-100' : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"}`} key={ind}>i</button>)
						})}
					</div>

					<div className="border border-gray-200 flex flex-col md:flex-row gap-6 w-full max-w-2xl p-6 mx-auto rounded-xl bg-gray-50">
						<div >
							<div className="border border-gray-200 bg-white rounded-t-xl p-3 ">
								<h2>Seat Categories</h2>
								</div>
							<div className="border border-gray-200 bg-white rounded-b-xl p-4">
								<div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
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
			<button onClick={handle} className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-center">submit</button>
		</div>
		
	

// 		<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 text-gray-800">
//   <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
//     {/* Header Section */}
//     <div className="border-b border-gray-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//       <div>
//         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{BOOKING_TITLE}</h1>
//         <p className="text-sm font-medium text-gray-500 mt-1">Select your preferred seats</p>
//       </div>
//       <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-lg font-semibold w-fit self-start sm:self-auto">
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <span>{hr}:{min}</span>
//       </div>
//     </div>

//     {/* Main Content Area Grid */}
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       {/* Left: Theater Screen & Seating Arrangement */}
//       <div className="lg:col-span-2 flex flex-col items-center">
//         {/* Curved Screen Indicator */}
//         <div className="w-full max-w-md mb-12 text-center">
//           <div className="h-2 w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full shadow-[0_4px_12px_rgba(96,165,250,0.5)]"></div>
//           <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mt-2">SCREEN</p>
//         </div>

//         {/* Responsive Grid Matrix */}
//         <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2 sm:gap-3 w-full justify-center p-2">
//           {arr.map((i, ind) => (
//             <button
//               key={ind}
//               onClick={() => handleclick(ind)}
//               className={`aspect-square w-full min-w-[2.5rem] rounded-lg font-medium text-sm transition-all duration-200 shadow-sm border
//                 ${arr[ind] 
//                   ? 'bg-blue-600 border-blue-700 text-white shadow-blue-200 scale-95' 
//                   : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300'
//                 }`}
//             >
//               {ind + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Right: Legend & Checkout Summary Panel */}
//       <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
//         {/* Seat Legend / Pricing */}
//         <div>
//           <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Seat Categories</h2>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
//               <div className="flex items-center gap-3">
//                 <div className="h-5 w-5 bg-rose-400 rounded-md"></div>
//                 <span className="font-semibold text-gray-700">Premium</span>
//               </div>
//               <span className="font-bold text-gray-900">₹350</span>
//             </div>
//             <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
//               <div className="flex items-center gap-3">
//                 <div className="h-5 w-5 bg-amber-300 rounded-md"></div>
//                 <span className="font-semibold text-gray-700">Gold</span>
//               </div>
//               <span className="font-bold text-gray-900">₹250</span>
//             </div>
//             <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
//               <div className="flex items-center gap-3">
//                 <div className="h-5 w-5 bg-stone-300 rounded-md"></div>
//                 <span className="font-semibold text-gray-700">Silver</span>
//               </div>
//               <span className="font-bold text-gray-900">₹150</span>
//             </div>
//           </div>
//         </div>

//         {/* Selected Seats Summary */}
//         <div className="border-t border-gray-200 pt-6">
//           <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Your Selection</h2>
//           <div className="bg-white p-4 rounded-xl border border-gray-200 min-h-[5rem] flex flex-wrap gap-2 items-center">
//             {selected.length > 0 ? (
//               selected.map((seats: any, idx: number) => (
//                 <span key={idx} className="inline-block bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-md text-sm border border-blue-100">
//                   {seats}
//                 </span>
//               ))
//             ) : (
//               <p className="text-gray-400 text-sm italic">No seats selected yet</p>
//             )}
//           </div>
//         </div>

//         {/* Total Cost Display */}
//         <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
//           <span className="text-gray-500 font-medium">Grand Total:</span>
//           <span className="text-2xl font-black text-gray-900">₹{total}</span>
//         </div>

//         {/* Primary Action Button */}
//         <button
//           onClick={handle}
//           className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-6 rounded-xl transition-colors duration-200 shadow-lg shadow-gray-200 text-center tracking-wide"
//         >
//           Proceed to Pay
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
	
	
	)
}
export default SeatBooking