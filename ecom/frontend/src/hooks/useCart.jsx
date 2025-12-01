import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItem } from "../redux/slices/cartSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

const useCart = () => {
  const token = Cookies.get("token");
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/cart/items`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      dispatch(
        fetchCartItem({ data: res.data.data, grandTotal: res.data.grandTotal })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addTocart = async (id) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/cart/add/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        await fetchCart();
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
      } else {
        toast.error(res.data.message, {
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
      console.log(error);
    }
  };

  const decrementCartItem = async (id) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/cart/decrement/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        await fetchCart();
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
      } else {
        toast.error(res.data.message, {
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
      console.log(error);
    }
  };

  const removeCartItem = async (id) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      let res = await axios.delete(
        `${import.meta.env.VITE_API}/cart/delete/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        await fetchCart();
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
      } else {
        toast.error(res.data.message, {
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart, fetchCart, addTocart, decrementCartItem, removeCartItem };
};

export default useCart;
