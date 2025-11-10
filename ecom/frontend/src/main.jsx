import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Navber from "./components/Navber.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
