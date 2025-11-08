import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Navber from "./components/Navber";
import List from "./components/List";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Modal from "./components/Modal";
import axios from "axios";

const App = () => {
  const [count, setCount] = useState(0);
  const [products, AllProducts] = useState([]);
  const [state, setState] = useState("");
  const [isModalOpen, setIsModalOPen] = useState(false);
  const ref = useRef();
  const handleClick = () => {
    setState("Niet");
  };

  const handleModal = () => {
    setIsModalOPen(!isModalOpen);
  };

  const fetchData = async () => {
    let data = await axios.get("http://localhost:5000/api/product/all");
    console.log(data.data.data);

    AllProducts(data.data.data);
    // console.log(data);
  };

  useEffect(() => {
    console.log("Render");
  }, [state, isModalOpen]);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(ref);

  return (
    <>
      <Navber />
      <button
        ref={ref}
        onClick={() => {
          ref.current.style.backgroundColor = "red";
        }}
      >
        Click
      </button>
      <h1 className="text-3xl text-red-500 font-bold">Count {count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
      {isModalOpen && <Modal onClick={handleModal} />}
      <button onClick={handleModal}>Modal</button>
      <h1>Hello {state}</h1>
      <button onClick={handleClick}>Change</button>
      {products?.map((product, i) => (
        <h1 key={product._id}>{product.name}</h1>
      ))}
    </>
  );
};

export default App;
