import React, { useState } from "react";
import logo from "../assets/logo.png";
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router";
import { HiOutlineUser } from "react-icons/hi2";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import Container from "./common/Container";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            <Link to="/about" className=" text-base text-black font-medium">
              About
            </Link>
            <Link to="/" className=" text-base text-black font-medium">
              Discovery
            </Link>
            <Link to="/" className=" text-base text-black font-medium">
              Contuct us
            </Link>
          </div>
          <div className="w-2/12 sm:w-3/12 flex justify-end gap-5">
            <Link to={null}>
              <HiOutlineUser className="text-black text-[25px]" />
            </Link>
            <Link to={null}>
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
