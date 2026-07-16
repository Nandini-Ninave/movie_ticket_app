import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Navbar from "../../reusableComponents/Navbar";

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
    const { data } = await axios.get(
      "https://6a55cf8ce49d9eb2cc5613be.mockapi.io/api/movie/movies",
    );
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
    <div className=" p-4 md:p-8 flex justify-center">
      <div className="flex flex-col items-center p-5 bg-white">
        <Navbar />
        <div className=" grid grid-cols-1 gap-6 mt-8 ml-25 mt-25 p-7 sm:grid-cols-4 md:grid-cols-4  md:p-10">
          {moviedata.slice(0, 8).map((item: movie) => {
            return (
              <div className="h-40 w-40  flex flex-col justify-between">
                <div className="border border-black-10 h-20 w-20 md:h-32 md:w-32">
                  <img src={item.avatar}></img>
                </div>
                <p className="mt-2 mb-4">{item.name}</p>
              </div>
            );
          })}
          <p className="w-185 text-end ml-85 mt-2">
            <button
              onClick={fun}
              className="text-blue-500 text-lg hover:text-blue-800"
            >
              View all
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Home;
