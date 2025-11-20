import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductPage";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar toggleCart={toggleCart} />

      {/* Slide Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} closeCart={closeCart} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
