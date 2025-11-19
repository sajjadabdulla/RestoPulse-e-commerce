import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function CartSidebar({ isOpen, closeCart }) {
  const { cart, total } = useContext(CartContext);
  const [status, setStatus] = useState("");

  const handleCheckout = async () => {
    setStatus("Placing order...");

    const productIds = cart.map((item) => item.id);

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_ids: productIds,
          total_amount: total,
        }),
      });

      const data = await res.json();

      alert(data.message);       // "Order placed!"
      setStatus("Order placed!");

      setTimeout(() => setStatus(""), 1500);

      closeCart();               // close sidebar
    } catch (error) {
      setStatus("Failed to place order");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={closeCart} className="text-2xl">✖</button>
      </div>

      {/* Status Message */}
      {status && (
        <p className="p-4 text-blue-600 font-semibold">{status}</p>
      )}

      {cart.length === 0 ? (
        <p className="p-4">Your cart is empty</p>
      ) : (
        <div className="p-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</h3>

          {/* Checkout button with logic */}
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
