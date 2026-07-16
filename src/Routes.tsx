import type { RouteObject } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import RegistrationForm from "./components/auth/RegistrationForm";
import Allmovies from "./components/Allmovies";
import TheaterSelection from "./components/TheaterSelection";
import SeatBooking from "./components/SeatBooking";
import BookingConfirm from "./components/BookingConfirm";
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Login/>,
    },
    {
        path:"/registration",
        element:<RegistrationForm/>
    },
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/allmovies",
        element:<Allmovies/>
    },
    {
        path:"/theaterSelectionPage",
        element:<TheaterSelection/>
    },
    {
        path:"/seatbooking",
        element:<SeatBooking/>
    },
    {
        path:"/bookingConfirm",
        element:<BookingConfirm/>
    },
]
