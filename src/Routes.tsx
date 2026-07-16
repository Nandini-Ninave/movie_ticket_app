import type { RouteObject } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import RegistrationForm from "./components/auth/RegistrationForm";
import Allmovies from "./components/allMovies/Allmovies";
import TheaterSelection from "./components/bookings/TheaterSelection";
import SeatBooking from "./components/bookings/SeatBooking";
import BookingConfirm from "./components/bookings/BookingConfirm";

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
