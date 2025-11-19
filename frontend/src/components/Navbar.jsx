import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Navbar({ toggleCart }) {
  const { cart } = useContext(CartContext);

  return (
    <nav className="flex items-center px-20 justify-between p-4 bg-blue-600 text-white">
      <h1 className="text-2xl font-bold">RestoPulse Store</h1>

      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/products" className="hover:text-gray-300">Products</Link>

        {/* Cart Icon */}
        <button onClick={toggleCart} className="relative hover:text-gray-300">
          🛒
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
            {cart.length}
          </span>
        </button>
      </div>
    </nav>
  );
}
