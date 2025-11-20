export async function fetchProducts(q = "") {
  const url = q
    ? `http://localhost:5000/api/products?q=${q}`
    : `http://localhost:5000/api/products`;

  const res = await fetch(url);
  return await res.json();
}
