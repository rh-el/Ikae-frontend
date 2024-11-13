import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Basket from "./components/Basket";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState<string>("");

  return (
    <>
      <BrowserRouter>
        <Header setFilter={setFilter} />
        <Routes>
          <Route path="/" element={<Home filter={filter} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
