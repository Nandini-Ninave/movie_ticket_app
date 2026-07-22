import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupValidation } from "@components/formValidation/yupValidation";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_TITLE } from "@constant";
import { reg_url } from "@url";

interface Registration{
  fullname:string,
  email:string,
  password:string,
  id:string,
  confirmPassword:string
}


function RegistrationForm() {
  const [, setName] = useState("");
  const [, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCnfPwd] = useState("");
  const [, setData] = useState("");
  const [info, setInfo] = useState<Registration[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupValidation) });

  const apicall = async () => {
    const { data } = await axios.get(reg_url);
    setInfo(data);
    return data;
  };
  useQuery({
    queryKey: ["person"],
    queryFn: apicall,
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(reg_url, data);
      return response.data;
    },
  });
  const handleRegistration = (data: any) => {
    if (password !== confirmPassword) {
      alert("Confirm password and password are not same");
    } else {
      setData(data);
      let flag = true;
      for (let item of info) {
        if (item.email === data.email) {
          flag = false;
          alert("Email already exists");
          break;
        }
      }
      if (flag === true) {
        mutate(data);
        alert("Registration successfull");
        navigate("/");
      }
    }
  };
  return (
    <section className="bg-zinc-800 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href=""
          className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white"
        >
          {SIGN_UP_TITLE}
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your full name
                </label>
                <input
                  type="fullname"
                  id="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="full name"
                  {...register("fullname")}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.fullname && (
                  <p className="text-red-400 ml-2 mb-1">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email")}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-400 ml-2 mb-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-400 ml-2 mb-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("confirmPassword")}
                  onChange={(e) => setCnfPwd(e.target.value)}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 ml-2 mb-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default RegistrationForm;
