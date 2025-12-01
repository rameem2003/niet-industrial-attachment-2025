import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginReducer } from "../redux/slices/authSlice";

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
      dispatch(loginReducer(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  return { user, userFetch };
};

export default useAuth;
