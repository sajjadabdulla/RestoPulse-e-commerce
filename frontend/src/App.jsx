import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import { fetchProducts } from "./api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (searchText = "") => {
    setLoading(true);
    const data = await fetchProducts(searchText);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <SearchBar onSearch={load} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}

export default App;
