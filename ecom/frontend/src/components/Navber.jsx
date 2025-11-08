import React, { useContext } from "react";
import List from "./List";
import { userContext } from "../context/UserContextProvider";

const Navber = () => {
  const user = useContext(userContext);
  console.log(user);

  return (
    <nav>
      <h1>Ecom</h1>

      <span>{user.name}</span>
    </nav>
  );
};

export default Navber;
