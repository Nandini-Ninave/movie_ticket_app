import { useEffect, useState } from "react";
import Navbar from "@reusableComponents/Navbar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { get_history } from "@url";

interface BookingHistory {
  id: string;
  createdAt: string;
  movieName: string;
  avatar: string;
  theaterName: string;
  date: string;
  time: number;
  seats: []
  total: number;
  email: string;
}

const TicketBookedHistory = () => {
  const [history, setHistory] = useState<BookingHistory[]>([]);
  const [filteredData, setFilteredData] = useState<BookingHistory[]>([]);
  const apicall = async (): Promise<BookingHistory[]> => {
    const { data } = await axios.get<any[]>(get_history);
    const parsedData = data.map((item) => {
      let parsedSeats = item.seats;
      if (typeof item.seats === "string") {
        try {
          parsedSeats = JSON.parse(item.seats);
        } catch (e) {
          parsedSeats = { selectedSeats: [], total: 0, theaterName: "" };
        }
      }
      return { ...item, seats: parsedSeats };
    });
    setHistory(parsedData);
    return parsedData;
  };
  useQuery({
    queryKey: ["history"],
    queryFn: apicall,
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    const filtered = history.filter((item) => item.email === email);
    setFilteredData(filtered);
  }, [history]);
  return (
    <div className="h-full w-full bg-zinc-800">
      <div className="min-h-screen bg-black/60">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-white text-center mt-10 mb-10">
            History
          </h1>

          <div className="space-y-6">
            {filteredData.map((item) => (
              <div key={item.id} className="flex justify-center">
                <div className="w-full md:w-[650px] bg-zinc-900 rounded-2xl border border-zinc-700 shadow-xl hover:border-blue-500 hover:scale-[1.02] transition-all duration-300">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-5">
                      🎬 {item.movieName}
                    </h2>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-zinc-800 rounded-xl p-4">
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="text-white font-semibold mt-1">
                          {item.date}
                        </p>
                      </div>

                      <div className="bg-zinc-800 rounded-xl p-4">
                        <p className="text-sm text-gray-400">Time</p>
                        <p className="text-white font-semibold mt-1">
                          {item.time}:00
                        </p>
                      </div>

                      <div className="bg-zinc-800 rounded-xl p-4">
                        <p className="text-sm text-gray-400">Seats</p>
                        <p className="text-white font-semibold mt-1">
                          {item.seats.join(" ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketBookedHistory;
