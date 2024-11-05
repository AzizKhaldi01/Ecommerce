import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "../utils/zodSchemas/loginSchema";
import {  setCookie } from 'typescript-cookie'
import { Login as LoginAPI } from "../Api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { TextField } from "@mui/material";
import dashboardImg from "../assets/login/images/dashboard.png";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [isloading, setisloading] = useState(false);

  const dispatch = useDispatch();
  const navTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);
    setisloading(true);

    try {
      const userData = await LoginAPI(data);
      console.log(userData.user);

      // Save token to cookies
      if (userData.token) {
        setCookie('token', userData.token)
      }

      dispatch(setUser(userData.user));
      
      setisloading(false);

      setTimeout(() => {
        navTo("/");
      }, 200);
    } catch (error) {
      console.error("Login failed", error);
      setisloading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen  flex   h-[100vh]   w-full lg:flex-row flex-col  ">
      <div className=" text-center text-white w-full h-full  flex items-center justify-center bg-blue-500  flex-col gap-10 ">
        <h1 className=" text-6xl ">Login in to your Dashboard</h1>
        <img
          src={dashboardImg}
          className="  w-[75%] h-[50vh] rounded-md shadow-lg   "
          alt="dashboard"
        />
      </div>
      <div className="bg-white w-full  h-full justify-center  items-center flex-col flex  p-10 rounded-lg shadow-md  ">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form className=" w-[80%]  " onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              label="email"
              variant="outlined"
              fullWidth
              type="email"
              id="email"
              margin="normal"
              {...register("email")}
            />

            {errors.email && (
              <p className="  -mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className=" pb-5">
            <TextField
              label="password"
              variant="outlined"
              fullWidth
              type="password"
              id="password"
              margin="normal"
              {...register("password")}
            />

            {errors.password && (
              <p className=" -mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button fullWidth isLoading={isloading} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
