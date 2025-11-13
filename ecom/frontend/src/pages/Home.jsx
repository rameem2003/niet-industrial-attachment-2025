import React from "react";
import Banner from "../components/screens/Home/Banner";
import ProductList from "../components/screens/Home/ProductList";
import { useNavigate } from "react-router";

const Home = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/about", {
      state: {
        name: " NIET",
        location: "Dhaka",
      },
    });
  };

  return (
    <>
      <button onClick={handleClick} className=" p-2 bg-red-500 text-white">
        Send Data to About
      </button>
      <Banner />
      <ProductList />
    </>
  );
};

export default Home;
