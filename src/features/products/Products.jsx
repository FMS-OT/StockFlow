import ProductsEmptyState from "./ProductsEmptyState";
import { useAppContext } from "../../hooks/useAppContext";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useMemo} from "react";
import ProductsNoResults from "./ProductsNoResults";
import ProductsSkeleton from "./ProductsSkeleton";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productsService";
import { PageError } from "../../components/ui/PageState";
import { z } from "zod";
const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  image: z.string().trim().min(1, "Image is required"),
  categoryId: z.string().min(1, "Category is required"),
});
export default function Products() {
  const { products, setProducts, categories, loading, error } = useAppContext();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const initialForm = {
    name: "",
    price: "",
    image: "",
    categoryId: "",
  };
  const [form, setForm] = useState(initialForm);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Source of Categories Data
  const formCategories = [...categories];
  const filterCategories = [{ id: "", name: "All" }, ...formCategories];

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  function handleCloseAddForm() {
    setIsAddFormOpen(false);
    setEditingProduct(null);
    setForm(initialForm);
  }
  function handleResetFilters() {
    setSearchTerm("");
    setSelectedCategory("");
    setSortType("");
    setCurrentPage(1);
  }
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter((p) =>
        selectedCategory ? String(p.categoryId) === selectedCategory : true,
      );
  }, [products, searchTerm, selectedCategory]);
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortType === "low") return a.price - b.price;
      if (sortType === "high") return b.price - a.price;
      return 0;
    });
  }, [filteredProducts, sortType]);
  const validationResult = productSchema.safeParse(form);
  const isFormValid = validationResult.success;
  const errorMessage = !validationResult.success
    ? validationResult.error.issues[0]?.message
    : "";
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  async function handleSave(e) {
    e.preventDefault();
    const result = productSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Invalid product data");
      return;
    }
    const productData = result.data;
    try {
      if (editingProduct) {
        const updatedProduct = await updateProduct(
          editingProduct.id,
          productData,
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p)),
        );
        handleCloseAddForm();
        toast.success("Product updated successfully");
      } else {
        const createdProduct = await createProduct(productData);
        setProducts((prev) => [createdProduct, ...prev]);
        handleResetFilters();
        handleCloseAddForm();
        toast.success("Product added successfully");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  function handleEdit(product) {
    setEditingProduct(product);
    setIsAddFormOpen(true);
    setForm({
      name: product.name,
      price: String(product.price),
      image: product.image,
      categoryId: String(product.categoryId),
    });
  }
  function handleAddOpenForm() {
    setEditingProduct(null);
    setForm(initialForm);
    setIsAddFormOpen(true);
  }
  if (loading) return <ProductsSkeleton />;
  if (error) return <PageError message={error} />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <button
          type="button"
          onClick={handleAddOpenForm}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>
      {isAddFormOpen && (
        <form onSubmit={handleSave} className="p-3 space-y-3">
          <h3 className="px-2 text-sm font-semibold text-gray-700">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h3>
          {formCategories.length === 0 && (
            <p className="text-sm px-2 font-medium text-red-500">
              You need to add at least one category first
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            <input
              type="number"
              placeholder="price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
            {form.image && (
              <div className="w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={form.image}
                  alt="Preview"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/100x100";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <select
              value={form.categoryId}
              disabled={formCategories.length === 0}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select category</option>
              {formCategories.map((cat) => (
                <option key={cat.id} value={cat.id ? cat.id : ""}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center p-1 justify-around">
            <button
              type="submit"
              aria-label="Save product"
              disabled={!isFormValid || formCategories.length === 0}
              className={`px-4 py-2 bg-green-50 text-green-500 text-sm font-semibold rounded-lg transition  disabled:opacity-50 disabled:cursor-not-allowed ${isFormValid ? "hover:bg-green-100" : ""}`}
            >
              {editingProduct ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCloseAddForm}
              className="rounded-lg px-4 py-2 bg-red-50 text-red-500 font-semibold text-sm transition hover:bg-red-100 "
            >
              Cancel
            </button>
          </div>
          {!isFormValid && (
            <p className="text-sm text-red-500 px-2">{errorMessage}</p>
          )}
        </form>
      )}
      {products.length === 0 ? (
        <ProductsEmptyState onAdd={handleAddOpenForm} />
      ) : (
        <div className="px-2 py-3 rounded-xl border border-gray-100 bg-white shadow-sm overflow-auto">
          <div className="mb-3 flex items-center flex-wrap gap-3">
            <input
              type="text"
              className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            >
              {filterCategories.map((cat) => (
                <option key={cat.id} value={cat.id ? cat.id : ""}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              value={sortType}
              onChange={(e) => {
                setSortType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Sort by price</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            {(searchTerm || selectedCategory || sortType) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
              >
                Reset
              </button>
            )}
          </div>
          {sortedProducts.length === 0 ? (
            <ProductsNoResults />
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="p-4 w-[50%]">Name</th>
                  <th className="p-4 w-[25%]">Price</th>
                  <th className="p-4 w-[25%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={p.image || "https://placehold.co/100x100"}
                            alt={p.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/100x100";
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-500">
                            {formCategories.find(
                              (cat) => String(cat.id) === String(p.categoryId),
                            )?.name || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">${Number(p.price).toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex gap-3 text-sm">
                        <button
                          type="button"
                          aria-label="Edit product"
                          onClick={() => handleEdit(p)}
                          className="w-10 h-10 rounded-lg text-blue-600 bg-blue-50 py-1 px-2 font-semibold hover:bg-blue-100 transition  flex items-center justify-center"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(p)}
                          aria-label="Delete product"
                          className="w-10 h-10 rounded-lg text-red-600 bg-red-50 py-1 px-2 font-semibold hover:bg-red-100 transition 
                        flex items-center justify-center"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {deleteTarget && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Confirm Delete
                </h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this product?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(deleteTarget.id);
                      setDeleteTarget(null);
                    }}
                    className="px-4 py-3 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
