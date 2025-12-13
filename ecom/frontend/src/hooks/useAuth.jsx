import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginReducer } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const userFetch = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/auth/user`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      dispatch(loginReducer(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const userProfileUpdate = async (data) => {
    let form = new FormData();
    form.append("name", data.name);
    form.append("phone", data.phone);
    form.append("email", data.email);
    form.append("address", data.address);
    try {
      let res = await axios.patch(
        `${import.meta.env.VITE_API}/auth/profile-update`,
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }

      await userFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const userProfileImageUpdate = async (file) => {
    let form = new FormData();
    form.append("image", file);

    try {
      let res = await axios.patch(
        `${import.meta.env.VITE_API}/auth/profile-update`,
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }

      await userFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const userPasswordUpdate = async (data) => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/update-password`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.response.data.message);
      }

      await userFetch();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const resendEmailVerification = async () => {
    console.log(user);

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/resend`,
        { email: user.data.email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.response.data.message);
      }

      await userFetch();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  return {
    user,
    userFetch,
    userProfileUpdate,
    userPasswordUpdate,
    resendEmailVerification,
    userProfileImageUpdate,
  };
};

export default useAuth;
