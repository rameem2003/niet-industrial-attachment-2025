import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

const Registration = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registration = async (data) => {
    setLoading(true);
    console.log(data);

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/register`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      if (res.data.success) {
        setLoading(false);
        setSuccess(true);
      } else if (!res.success) {
        setLoading(false);
        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }

      console.log(res);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  if (success) {
    return (
      <>
        <main className=" w-full py-10 h-screen flex items-center justify-center">
          <div className="bg-white border border-gray-200 shadow-md w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
            <div className="p-6">
              <div>
                <h3 className="text-lg font-semibold text-center">
                  Registration Success
                </h3>
                <p className="mt-2 text-sm text-center text-slate-500 leading-relaxed">
                  An email is sent to your email. Please check your mailbox or
                  spambox
                </p>
              </div>
              <div className=" text-center">
                <Link
                  to="/"
                  className="mt-6 inline-block px-5 py-2 rounded-md text-white text-sm font-medium tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (loading) {
    return (
      <div className=" fixed top-0 left-0 h-screen w-full bg-white flex items-center justify-center">
        <Rings
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <main className=" w-full py-10 h-screen flex items-center justify-center">
      <form
        // onSubmit={}
        onSubmit={handleSubmit(registration)}
        // onSubmit={handleClick}
        action=""
        className=" p-3 shadow-lg bg-gray-100 w-[500px] max-w-[500px] rounded-md"
      >
        <div className="mb-5">
          <img className="w-[200px] mx-auto" src={logo} alt="" />
          <h2 className=" text-center font-semibold text-2xl text-green-500 mt-3">
            Registration Here
          </h2>
        </div>

        <div className=" mb-2">
          <label className=" text-sm text-green-500 font-medium" htmlFor="">
            Name
          </label>
          <input
            {...register("name", { required: "Name Must reqired" })}
            type="text"
            className=" mt-1 p-2 w-full bg-white border-2 border-green-500 rounded-md focus:border-green-600 active:border-green-600 outline-0"
            name="name"
            id="name"
            placeholder="Enter Your Name"
          />
          {errors.name && <span>{errors.name.message}</span>}
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
          Register
        </button>
      </form>
    </main>
  );
};

export default Registration;
