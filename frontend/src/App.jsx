import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductPage";

import ChatButton from "./components/ChatButton";
import ChatWidget from "./components/ChatWidget";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar toggleCart={toggleCart} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} closeCart={closeCart} />

      {/* AI Chat Widget */}
      <ChatWidget isOpen={isChatOpen} closeChat={closeChat} />
      <ChatButton openChat={openChat} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
