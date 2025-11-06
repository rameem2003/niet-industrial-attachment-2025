import React from "react";
import Header from "./components/Header";
import Navber from "./components/Navber";
import List from "./components/List";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  let isLoggedIn = true;
  let list = [
    {
      name: "Marzan",
    },
    {
      name: "Anik",
    },
  ];
  return (
    <>
      <Navber data={list} data1={"REACT"} />
      <Header />
      <Layout>{isLoggedIn ? <Home /> : <Login />}</Layout>
    </>
  );
};

export default App;
