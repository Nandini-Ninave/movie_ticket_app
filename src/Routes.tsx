import type { RouteObject } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import RegistrationForm from "./components/RegistrationForm";
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient()
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Login/>,
    },
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/reg",
        element:<RegistrationForm/>
    }
 
]
