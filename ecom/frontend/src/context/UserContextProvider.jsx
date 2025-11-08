import React, { createContext } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  let user = {
    name: "Anik",
    email: "anik@gmail.com",
  };
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserContextProvider;
