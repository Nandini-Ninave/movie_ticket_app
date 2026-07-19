import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Navbar from "../../reusableComponents/Navbar";
import { get_all_movies } from "../url";

interface movie {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
}

function Home() {
  const navigate = useNavigate();
  const [moviedata, setMovieData] = useState([]);
  const isAuthenticatedUser = localStorage.getItem("isAuthenticated");
 
  useEffect(() => {
    if (!isAuthenticatedUser) {
      navigate("/");
    }
  }, [isAuthenticatedUser]);

  const apicall = async () => {
    const { data } = await axios.get(get_all_movies);
    setMovieData(data);
    return data;
  };

  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: apicall,
  });

  const fun = () => {
    navigate("/allmovies");
  };

  return (
    <div className="bg-zinc-800 ">
    <Navbar />

  <div className="max-w-7xl mx-auto px-4 py-10 mt-15">
    <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
      Popular Movies
    </h1>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
      {moviedata.slice(0, 8).map((item: movie) => (
        <div
          key={item.id}
          className="bg-zinc-900/80 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOEEHzJMkXGHKaAPWwqqmXVWeVB-qV5IjvGANI1lMiXQ&s=10"
            alt={item.name}
            className="w-full h-50 rounded-lg"
          />

          <h2 className="mt-4 text-center text-white font-semibold text-lg">
            {item.name}
          </h2>
        </div>
      ))}
    </div>

    <div className="flex justify-center mt-10">
      <button
        onClick={fun}
        className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        View All →
      </button>
    </div>
  </div>
</div>
  );
}
export default Home;
