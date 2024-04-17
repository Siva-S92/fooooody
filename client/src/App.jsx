import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CartDetails from "./pages/CartDetails";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
