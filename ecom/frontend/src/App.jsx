import Parent from "./components/Parent";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import RootLayout from "./layout/RootLayout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
