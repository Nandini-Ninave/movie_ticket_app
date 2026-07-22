import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@reduxToolkit/hook";
import { movietime } from "@reduxToolkit/movieSlice";
import Navbar from "@reusableComponents/Navbar";
import axios from "axios";
import { get_theater } from "@url";
import { useQuery } from "@tanstack/react-query";
import Addtheater from "@components/bookings/Addtheater";

interface Theater {
  theaterName: string;
  location: string;
}

function TheaterSelection() {
  const [isOpen, seatIsOpen] = useState(false);
  const theater = [
    { theaterName: "PVR Cinema", location: "City mall" },
    { theaterName: "Inox Cinema", location: "City mall" },
    { theaterName: "abc Cinema", location: "City mall" },
    { theaterName: "pvr Cinema", location: "City mall" },
  ];
  const { name, min } = useAppSelector((state) => state.moviename);
  const time = new Date(Date.now());
  const hourNow = time.toLocaleTimeString().slice(0,2)
  const navigate = useNavigate();
  const disp = useAppDispatch();
  const buttons = [
    Number(hourNow) + 1,
    Number(hourNow) + 4,
    Number(hourNow) + 7,
  ];

  const handleclick = (
    hour: number,
    min: number,
    theater: string,
  ) => {
    disp(
      movietime({
        hr: hour,
        min: min,
        date: time.getDate(),
        month: time.getMonth(),
        theaterName: theater,
      }),
    );
    navigate("/seatbooking");
  };

  const apicall = async (): Promise<Theater[]> => {
    const { data } = await axios.get(get_theater);
    return data;
  };

  const { data: newTheater = [] } = useQuery<Theater[]>({
    queryKey: ["theater"],
    queryFn: apicall,
  });
  const allTheaters = [...theater, ...newTheater];
  return (
    <div className="bg-zinc-800">
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="mb-5 text-xl font-bold text-white ml-1">
            Select Theater & Show Time
          </h1>
          <button
            onClick={() => seatIsOpen(true)}
            className="mb-5 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            add theater
          </button>
          <Addtheater isOpen={isOpen} onClose={() => seatIsOpen(false)} />
        </div>

        <p className="text-white">{name}</p>
        {allTheaters.map((item, index) => {
          return (
            <div className="border-4 border-black-900 flex flex-row gap-6 mb-5 p-3 rounded-xl">
              <div>
                <p className="text-white">{item.theaterName}</p>
                <p className="text-white">{item.location}</p>
                <div className="flex" key={index}>
                  {buttons.map((button) => {
                    return (
                      <div>
                        <button
                          className="mr-2 border border-blue-100 text-blue-400 p-1 mt-3 rounded-lg hover:tracking-[2px] hover:bg-blue-600 hover:text-white"
                          onClick={() => {
                            handleclick(
                              Number(button),
                              min,
                              item.theaterName,
                            )
                          }}
                        >
                          {button}:00
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default TheaterSelection;
