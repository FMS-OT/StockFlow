const BASE_URL = "http://localhost:3001/products";

// GET
export async function getProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

// POST
export async function createProduct(product) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("Failed to create product");
  }
  return res.json();
}

// PUT
export async function updateProduct(id, product) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("Failed to update product");
  }
  return res.json();
}

// Delete
export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete product");
  }
  return true
}
