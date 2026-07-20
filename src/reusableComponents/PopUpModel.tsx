import { useEffect, useState } from "react";
import { useAppSelector } from "../components/reduxToolkit/hook";

interface PopUpModelProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSeats: number[];
    total: number;
}
const Modal = (props: { isOpen: boolean, onClose: any, children: any }) => {
    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
             <div className="bg-white rounded-lg shadow-lg p-6 max-w-md  w-full relative"> 
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={props.onClose}>
                    &#x2715;
                </button>
                {props.children}
            </div>
        </div>
    );
};


const PopUpModel = ({ isOpen, onClose, selectedSeats, total}: PopUpModelProps) => {
//    const total = localStorage.getItem("totalBill")
//     const { selectedSeats } = useAppSelector((state)=>state.seats)
//     const [result, setResult] = useState<Bill | null>(null)
//     const movieName = localStorage.getItem("movieName")

//     useEffect(() => {
//         if(selectedSeats){
//         // if (data) {
//         setResult(JSON.parse(selectedSeats));
//             // setResult(JSON.parse(data));
//         }
//     }, [selectedSeats]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mt-4 mx-auto lg:py-0">
                <h1 className="mb-5 text-2xl font-bold border-b-2 border-gray-200"> Booking confirm</h1>
                <div className="h-50 w-80 p-5 flex flex-col gap-5">
                    <div className="">
                        {/* <h1 className="font-medium">Ticket details: </h1> */}
                    </div>
                    <div className="border border-gray-300 rounded-xl h-60 p-5 bg-gray-100 hover:bg-gray-200 hover:text-black">
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            <p className="font-medium">Seat: </p>
                            {selectedSeats?.map((seat) => {
                            {/* {result?.selectedSeats?.map((seat) => { */}
                                return (<p className="font-medium text-blue-400">{seat}</p>)
                            })}
                        </div>
                        <p className="font-medium ">Total: {total}</p>
                    </div>
                </div>
            </div>
            {/* <button key={index}	disabled={isBooked} onClick={() => selectedSeat(index)}
			className={`aspect-square w-full rounded-lg text-sm border ${isBooked ? "bg-gray-400 border-gray-700 text-white cursor-not-allowed" : isSelected ? "bg-blue-400 border-blue-700 text-white" : "bg-green-400 border-green-700 text-white hover:bg-green-600"}`}>	{index + 1}</button> */}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg ml-80" onClick={onClose}>close</button>
        </Modal>
    )
}
export default PopUpModel