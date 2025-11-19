// src/api/products.js
import { API_BASE_URL } from "./config";

export async function fetchProducts(q = "") {
  const url = q
    ? `${API_BASE_URL}/products?q=${q}`
    : `${API_BASE_URL}/products`;

  const res = await fetch(url);
  return res.json();
}
