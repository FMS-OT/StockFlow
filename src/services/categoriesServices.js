const BASE_URL = "http://localhost:3001/categories";
// GET
export async function getCategories() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

// POST
export async function createCategory(category) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) {
    throw new Error("Failed to create category");
  }
  return res.json();
}

// PUT
export async function updateCategory(id, category) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!res.ok) {
    throw new Error("Failed to update category");
  }
  return res.json();
}

// DElETE
export async function deleteCategory(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete category");
  }
  return true;
}
