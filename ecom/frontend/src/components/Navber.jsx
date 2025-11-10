import React, { useState } from "react";
import logo from "../assets/logo.png";
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-black ">
      <div className="h-[75px] text-white items-center flex justify-between">
        {/* menuber */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden sm:px-8 "
        >
          <RiMenu2Fill />
        </button>
        {/* logo */}
        <div className="sm:px-12">
          <Link to="/">
            <img src={logo} alt="" className="w-[126px] h-[34px]" />
          </Link>
        </div>
        {/* menu buttons dasktop   */}
        <div className="hidden sm:block">
          <Link to="/" className="px-4">
            Home
          </Link>
          <Link to="/about" className="px-4">
            About
          </Link>
          <Link to="/" className="px-4">
            Discovery
          </Link>
          <Link to="/" className="px-4">
            Contuct us
          </Link>
        </div>
        <div className="px-4 flex">
          <Link to={null}>
            <FaUser />
          </Link>
          <Link to={null}>
            <FaShoppingCart />
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
    </nav>
  );
};

export default Navber;
