import { useNavigate } from "react-router-dom"
import { logout } from "../components/reduxToolkit/movieSlice"
import "./Navbar.css"
import { useAppDispatch, useAppSelector } from "../components/reduxToolkit/hook"
function Navbar() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAppSelector((state) => state.login)
    const disp = useAppDispatch()
    const userlogout = () => {
        disp(logout({ isAuthenticated: isAuthenticated }))
        console.log(localStorage.getItem("isAuthenticated"))
        navigate("/")
    }
    return (
        <nav className="bg-gray-100 text-blue w-full top-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center">
                    <span className="self-center text-xl text-heading font-semibold">Movies</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" onClick={userlogout} className="text-black bg-brand hover:bg-brand-strong box-border border border-gray-400 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-xl text-sm px-3 py-2 focus:outline-none">logout</button>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" /></svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <a href="/home" className="block py-2 px-3 text-black bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/allmovies" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Movies</a>
                        </li>
                        {/* <li>
                            <a className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Services</a>
                        </li> */}
                        <li>
                            <a  href="/ticketBookedHistory" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">History</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar