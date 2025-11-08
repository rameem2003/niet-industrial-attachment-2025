import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Navber from "./components/Navber";
import List from "./components/List";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Modal from "./components/Modal";
import axios from "axios";

const App = () => {
  const [state, setState] = useState("");
  const [isModalOpen, setIsModalOPen] = useState(false);
  const handleClick = () => {
    setState("Niet");
  };

  const handleModal = () => {
    setIsModalOPen(!isModalOpen);
  };

  const fetchData = async () => {
    let data = await axios.get("https://niet-ia.onrender.com/api/product/all");

    console.log(data);
  };

  useEffect(() => {
    console.log("Render");
  }, [state, isModalOpen]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {isModalOpen && <Modal onClick={handleModal} />}
      <button onClick={handleModal}>Modal</button>
      <h1>Hello {state}</h1>
      <button onClick={handleClick}>Change</button>
    </>
  );
};

export default App;
