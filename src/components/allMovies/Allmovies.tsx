import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../reduxToolkit/hook";
import { moviename } from "../reduxToolkit/movieSlice";
import Navbar from "../../reusableComponents/Navbar";
import { get_all_movies } from "../url";

function Allmovies() {
  const [movies, setMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const dispatch_function = useAppDispatch();

  const apicall = async () => {
    const { data } = await axios.get(get_all_movies);
    setMovies(data);
    return data;
  };
  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: apicall,
  });

  let flag = true;
  const previous = () => {
    flag = false;
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setStartIndex((prev) => prev - 5);
    }
  };
  const next = () => {
    flag = true;
    setCurrentPage((prev) => prev + 1);
    setStartIndex((prev) => prev + 5);
  };
  const booknow = (name: string) => {
    dispatch_function(moviename({ name: name }));
    navigate("/theaterSelectionPage");
  };
  return (
    <div className="min-h-screen bg-zinc-800">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white text-center mt-10 mb-10">
          All Movies
        </h1>

        <div className="space-y-2 ">
          {movies.slice(startIndex, startIndex + 5).map((item: any) => (
            <div
              key={item.id}
              className="bg-zinc-600/40 rounded-xl p-4
          flex flex-col sm:flex-row items-center gap-5 hover:scale-[1.02]
          transition-all duration-300"
            >
              <img
                src={flag ? item.avatar : item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-white text-xl font-semibold">
                  {item.name}
                </h2>
              </div>

              <button
                onClick={() => booknow(item.name)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg "
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={previous}
            className="px-6 py-2 bg-blue-700 hover:bg-blue-700 text-white rounded-lg"
          >
            ← Previous
          </button>

          <button
            onClick={next}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
export default Allmovies;
