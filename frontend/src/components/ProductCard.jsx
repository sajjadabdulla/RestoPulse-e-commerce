export default function ProductCard({ product }) {
  return (
    <div className="p-4 bg-white rounded shadow border">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-2">${product.price}</p>
    </div>
  );
}
