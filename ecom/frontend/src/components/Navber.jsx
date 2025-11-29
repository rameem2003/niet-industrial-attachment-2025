import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router";
import { HiOutlineUser } from "react-icons/hi2";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import Container from "./common/Container";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutReducer } from "../redux/slices/authSlice";
import { fetchCartItem } from "../redux/slices/cartSlice";

const Navber = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  let logginUser = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const fetchCart = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/cart/items`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      dispatch(fetchCartItem(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(logoutReducer());
    let res = await axios.post(
      `${import.meta.env.VITE_API}/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <nav className="bg-white ">
      <Container>
        <div className="h-[75px] text-white items-center flex justify-between">
          {/* menuber */}
          <div className=" w-2/12 md:w-4/12 block sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block sm:hidden sm:px-8 "
            >
              <GiHamburgerMenu className=" text-black text-[25px]" />
            </button>
          </div>
          {/* logo */}
          <div className=" w-4/12 sm:w-3/12 ">
            <Link className=" mx-auto sm:mr-auto block" to="/">
              <img src={logo} alt="" className="w-[126px] h-[34px] " />
            </Link>
          </div>
          {/* menu buttons dasktop   */}
          <div className="hidden sm:flex gap-4 items-center justify-center sm:w-6/12">
            <Link to="/" className=" text-base text-black font-medium">
              Home
            </Link>
            <Link to="/shop" className=" text-base text-black font-medium">
              Shop
            </Link>
            <Link to="/" className=" text-base text-black font-medium">
              Discovery
            </Link>
            <Link to="/" className=" text-base text-black font-medium">
              Contuct us
            </Link>
          </div>
          <div className="w-2/12 sm:w-3/12 flex justify-end gap-5">
            {logginUser ? (
              <div className=" group relative">
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src={logginUser.image}
                  alt={logginUser.name}
                />

                <ul className=" bg-white z-[1000] group-hover:block absolute top-[40px] left-0 hidden">
                  <li>
                    <Link className="text-black text-xl p-4">Profile</Link>
                  </li>
                  <li onClick={logout} className=" text-red-500 text-xl p-4">
                    Logout
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="text-black text-[25px]" />
              </Link>
            )}

            <Link className=" relative" to="/cart">
              <span className=" absolute top-[-6px] right-[-6px] flex items-center justify-center h-4 w-4 bg-green-500 rounded-full text-white">
                {cart.length ? cart.length : 0}
              </span>
              <BsCart3 className="text-black text-[25px]" />
            </Link>
          </div>
        </div>
        {/* menu buttons Mobail   */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } sm:hidden bg-gray-400 space-y-2 pb-3`}
        >
          <a href="" className="px-4 block">
            Home
          </a>
          <a href="" className="px-4 block">
            About
          </a>
          <a href="" className="px-4 block">
            Discovery
          </a>
          <a href="" className="px-4 block">
            Contuct us
          </a>
        </div>
      </Container>
    </nav>
  );
};

export default Navber;
