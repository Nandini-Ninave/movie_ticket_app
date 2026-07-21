import axios from "axios";
import { get_theater, set_theater } from "../url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface PopUpModelProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Theater {
  theaterName: string;
  location: string;
}

const Modal = (props: { isOpen: boolean; onClose: any; children: any }) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md  w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={props.onClose}
        >
          &#x2715;
        </button>
        {props.children}
      </div>
    </div>
  );
};

const Addtheater = ({ isOpen, onClose }: PopUpModelProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const apicall = async (): Promise<Theater[]> => {
    const { data } = await axios.get(get_theater);
    return data;
  };

  const { data: theaters = [] } = useQuery({
    queryKey: ["theater"],
    queryFn: apicall,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: Theater) => {
      return axios.post(set_theater, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["theater"],
      });

      onClose();
    },
  });
  const handleSubmit = () => {
    const theaterName = name.trim();
    const theaterLocation = location.trim();
    if (!theaterName || !theaterLocation) {
      alert("fill all fields");
      return;
    }
    if (
      theaters.some(
        (theater) =>
          theater.theaterName.toLowerCase() === theaterName.toLowerCase() &&
          theater.location.toLowerCase() === theaterLocation.toLowerCase(),
      )
    ) {
      alert("Theater already exists");
      return;
    }
    mutate({ theaterName, location: theaterLocation });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <section className="bg-zinc-800 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <a
              href=""
              className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white"
            >
              Add new theater
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Theater Name
                    </label>
                    <input
                      id="theatername"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter theater name..."
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Location
                    </label>
                    <input
                      id="location"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter location..."
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg ml-80"
        onClick={onClose}
      >
        close
      </button>
    </Modal>
  );
};
export default Addtheater;
