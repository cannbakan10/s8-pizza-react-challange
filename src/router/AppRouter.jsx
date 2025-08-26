import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import OrderForm from "../pages/OrderForm";
import OrderSuccess from "../pages/OrderSuccess";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/success" element={<OrderSuccess />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
