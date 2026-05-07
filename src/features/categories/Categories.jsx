import { useState } from "react";
import { useAppContext } from "../../hooks/useAppContext.js";
import ProductsSkeleton from "../products/ProductsSkeleton";
import { PageError } from "../../components/ui/PageState";
import { Pencil, Trash2 } from "lucide-react";
import CategoriesEmptyState from "./CategoriesEmptyState";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/categoriesServices.js";
import toast from "react-hot-toast";
export default function Categories() {
  const { categories, setCategories, products, loading, error } =
    useAppContext();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const trimmedName = name.trim();
  async function handleSave(event) {
    try {
      event.preventDefault();
      if (!trimmedName) return;
      const isDuplicate = categories.some(
        (c) =>
          c.name.toLowerCase() === trimmedName.toLowerCase() &&
          c.id !== editingCategory?.id,
      );
      if (isDuplicate) {
        setErrorMessage("Category already exists");
        return;
      }
      if (editingCategory) {
        const updatedCategoryData = {
          name: trimmedName,
        };
        const updatedCategory = await toast.promise(
          updateCategory(editingCategory.id, updatedCategoryData),
          {
            loading: "Updating category...",
            success: "Category updated successfully",
            error: "Failed to update category",
          },
        );
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? updatedCategory : c)),
        );
        toast.success("Category updated successfully");
      } else {
        const newCategory = {
          name: trimmedName,
        };
        const createdCategory = await toast.promise(
          createCategory(newCategory),
          {
            loading: "Adding category...",
            success: "Category added successfully",
            error: "Failed to add category",
          },
        );
        setCategories((prev) => [createdCategory, ...prev]);
        toast.success("Category added successfully");
      }

      handleCloseAddForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong, please try again");
    }
  }
  function handleEdit(category) {
    setEditingCategory(category);
    setIsAddFormOpen(true);
    setName(category.name);
  }
  function handleOpenAddForm() {
    setEditingCategory(null);
    setName("");
    setIsAddFormOpen(true);
    setErrorMessage("");
  }
  function handleCloseAddForm() {
    setIsAddFormOpen(false);
    setName("");
    setEditingCategory(null);
    setErrorMessage("");
  }
  async function handleDelete(id) {
    const hasProducts = products.some(
      (p) => String(p.categoryId) === String(id),
    );
    if (hasProducts) {
      setErrorMessage("You can't delete this category because it has products");
      return;
    }
    const isConfirmed = window.confirm("Do you want to delete this category?");
    if (!isConfirmed) return;
    try {
      await toast.promise(deleteCategory(id), {
        loading: "Deleting category...",
        success: "Category deleted successfully",
        error: "Failed to delete category",
      });
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Category deleted successfully");
    } catch {
      toast.error("Something went wrong");
      setErrorMessage("Failed to delete category. Please try again");
    }
  }
  if (loading) return <ProductsSkeleton />;
  if (error) return <PageError message={error} />;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        <button
          type="button"
          onClick={handleOpenAddForm}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          + Add Category
        </button>
      </div>
      <div>
        <p className="text-lg font-medium px-4 py-2 text-red-500">
          {errorMessage}
        </p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        {isAddFormOpen && (
          <form onSubmit={handleSave} className="p-3 space-y-3">
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-xs rounded-lg border px-3 py-2 text-sm"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-green-50 text-green-500 text-sm font-semibold transition hover:bg-green-100"
              >
                {editingCategory ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 bg-red-50 text-red-500 font-semibold text-sm transition hover:bg-red-100"
                onClick={handleCloseAddForm}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {categories.length === 0 ? (
          <CategoriesEmptyState onAdd={handleOpenAddForm} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-150 text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="p-4">Category Name</th>
                  <th className="p-4">Total Products</th>

                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{cat.name}</td>
                    <td className="p-4">
                      {
                        products.filter(
                          (p) => String(p.categoryId) === String(cat.id),
                        ).length
                      }
                    </td>
                    <td className="p-4">
                      <div className="flex gap-3 text-sm">
                        <button
                          type="button"
                          aria-label="Edit category"
                          className="w-10 h-10 rounded-lg text-blue-600 bg-blue-50 py-1 px-2 font-semibold hover:bg-blue-100 transition flex items-center justify-center"
                          onClick={() => handleEdit(cat)}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete category"
                          className="w-10 h-10 rounded-lg text-red-600 bg-red-50 py-1 px-2 font-semibold hover:bg-red-100 transition flex items-center justify-center"
                          onClick={() => handleDelete(cat.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
