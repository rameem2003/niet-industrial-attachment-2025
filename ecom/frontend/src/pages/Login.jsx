import React from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = (data) => {
    console.log("login successfull");
    console.log(data);
  };

  const handleClick = () => {
    // e.preventDefault();
    handleSubmit(login);
  };

  return (
    <main className=" w-full py-10 h-screen flex items-center justify-center">
      <form
        // onSubmit={}
        onSubmit={handleSubmit((data) => console.log(data))}
        // onSubmit={handleClick}
        action=""
        className=" p-3 shadow-lg bg-gray-100 w-[500px] max-w-[500px] rounded-md"
      >
        <div className="mb-5">
          <img className="w-[200px] mx-auto" src={logo} alt="" />
          <h2 className=" text-center font-semibold text-2xl text-green-500 mt-3">
            Login Here
          </h2>
        </div>

        <div className=" mb-2">
          <label className=" text-sm text-green-500 font-medium" htmlFor="">
            Email
          </label>
          <input
            {...register("email", { required: "Email Must reqired" })}
            type="text"
            className=" mt-1 p-2 w-full bg-white border-2 border-green-500 rounded-md focus:border-green-600 active:border-green-600 outline-0"
            name="email"
            id="email"
            placeholder="Enter Email Address"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className=" mb-2">
          <label className=" text-sm text-green-500 font-medium" htmlFor="">
            Password
          </label>
          <input
            {...register("password", { required: "Password Must reqired" })}
            type="password"
            className=" mt-1 p-2 w-full bg-white border-2 border-green-500 rounded-md focus:border-green-600 active:border-green-600 outline-0"
            name="password"
            id="password"
            placeholder="Enter Enter Password"
          />

          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          className=" mb-2 p-3 bg-green-600 text-white text-center w-full rounded-md hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
