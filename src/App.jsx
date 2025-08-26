import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import OrderPizza from "./pages/OrderPizza.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<OrderPizza />} />
      <Route path="/success" element={<OrderSuccess />} />
    </Routes>
  );
}
