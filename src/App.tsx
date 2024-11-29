import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Basket from "./components/Basket";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import DashboardProduct from "./components/DashboardProduct";
import OrderConfirmation from "./components/OrderConfirmation";

type orderData = {
  order_id?: number;
  user_email?: string
}

function App() {
  const [ filter, setFilter ] = useState<string>("");
  const [ orderData, setOrderData ] = useState<orderData>({})

  console.log(orderData);
  
  
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-4 ">
      <BrowserRouter>
        <Header setFilter={setFilter} />
        <Routes>
          <Route path="/" element={<Home filter={filter} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/basket" element={<Basket setOrderData={setOrderData} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/product/:id" element={<DashboardProduct />} />
          <Route path="/confirmation" element={<OrderConfirmation orderData={orderData} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </div>
  );
}

export default App;
