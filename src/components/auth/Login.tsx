import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@reduxToolkit/movieSlice";
import Input from "@reusableComponents/Input";
import { reg_url } from "@url";
import { useAppDispatch } from "@reduxToolkit/hook";
import Button from "@reusableComponents/Button";

interface registration {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<registration[]>([]);
  const navigate = useNavigate();
  const disp = useAppDispatch();

  const apicall = async () => {
    const { data } = await axios.get(reg_url);
    setData(data);
    return data;
  };
  useQuery({
    queryKey: ["person"],
    queryFn: apicall,
  });

  const submit = (email: string, password: string) => {
    let flag = false;
    for (let item of data) {
      if (email === item.email && password === item.password) {
        flag = true;
        disp(login({ user: email }));
        navigate("/home");
        break;
      }
    }
    if (flag === false) {
      navigate("/registration");
    }
  };
  return (
    <section className="bg-zinc-800 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href=""
          className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white"
        >
          Login
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                placeHolder="Enter email..."
                handleChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                placeHolder="Enter password"
                handleChange={(e: any) => setPassword(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <Button label="login" handleClick={() => submit(email, password)}></Button>
              {/* <button
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={() => submit(email, password)}
              >
                login
              </button> */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  href="/registration"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;
