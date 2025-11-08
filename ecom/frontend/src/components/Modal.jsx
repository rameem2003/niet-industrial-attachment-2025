import React, { useContext, useEffect } from "react";
import { userContext } from "../context/UserContextProvider";

const Modal = ({ onClick }) => {
  const user = useContext(userContext);
  useEffect(() => {
    console.log("Component Mounted");

    return () => {
      console.log("Unmounting");
    };
  }, []);
  return (
    <div
      style={{
        backgroundColor: "red",
        padding: "8px",
        borderRadius: "8px",
        width: "500px",
      }}
    >
      <h1>Modal Title {user.name}</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
        necessitatibus nobis repellat ea molestiae natus voluptatum excepturi
        asperiores ducimus accusantium magnam aspernatur veniam blanditiis, id
        consectetur? Iste molestias accusantium quasi quis! Odio facilis facere
        expedita tenetur nihil, eum aspernatur vel illo illum cupiditate quam,
        tempora possimus, necessitatibus eligendi labore odit
      </p>
      <button onClick={onClick}>Close</button>
    </div>
  );
};

export default Modal;
