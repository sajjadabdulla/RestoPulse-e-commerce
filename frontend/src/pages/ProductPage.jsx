import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const load = async (q = "") => {
    setLoading(true);
    setStatus("Loading products...");
    const data = await fetchProducts(q);
    setProducts(data);
    setLoading(false);
    setStatus("Products loaded!");
    setTimeout(() => setStatus(""), 1500);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {status && <p className="text-blue-600 mb-2">{status}</p>}

      <SearchBar onSearch={load} />
      {loading ? <p>Loading...</p> : <ProductGrid products={products} />}
    </div>
  );
}
