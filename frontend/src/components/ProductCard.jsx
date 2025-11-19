import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [status, setStatus] = useState("");

  const handleAdd = () => {
    addToCart(product);
    setStatus("Added!");
    setTimeout(() => setStatus(""), 1000);
  };

  return (
    <div className="p-4 bg-white border rounded shadow">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price}</p>

      <button
        className="mt-3 px-4 py-1 bg-green-600 text-white rounded"
        onClick={handleAdd}
      >
        Add to Cart
      </button>

      {status && <p className="text-green-600 text-sm mt-2">{status}</p>}
    </div>
  );
}
