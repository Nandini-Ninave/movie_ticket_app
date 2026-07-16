import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import RegistrationForm from "./components/auth/RegistrationForm"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { routes } from "./Routes"
import Login from "./components/auth/Login"
import Home from "./components/home/Home"
// import { ErrorBoundary } from "react-error-boundary"

// const error_Fallback = ({error}:any)=>{
//   return <div>{error.message}</div>
// }


function App(){
  const queryClient = new QueryClient()
  const router = createBrowserRouter(routes)
  return(
      <div>
        {/* <Home/> */}
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>        
      </div>
  )
}
export default App