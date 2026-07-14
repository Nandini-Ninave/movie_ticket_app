function Home(){
    return(<div className="bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
            <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto justify-center">
                <li className="text-gray-600 font-medium">content</li>
                <li className="text-gray-600 font-medium ml-40">content</li>
                <li className="text-gray-600 font-medium ">content</li>
                <li className="text-gray-600 font-medium ">content</li>
                <li className="text-gray-600 font-medium ">content</li>        
                <li className="text-gray-600 font-medium ml-50"><input className="mt-4 border border-black-50 w-80 rounded-md" placeholder="content"></input><i></i></li>
                <li className="text-gray-600 font-medium ml-50">logout</li>
            </ul>
        </nav>
    </div>)
}
export default Home