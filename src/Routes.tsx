import type { RouteObject } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import RegistrationForm from "./components/RegistrationForm";
import Allmovies from "./components/Allmovies";
import TheaterSelection from "./components/TheaterSelection";
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
]
