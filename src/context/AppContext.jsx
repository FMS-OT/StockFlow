import { createContext, useState, useEffect } from "react";
import { getProducts } from "../services/productsService";
import { getCategories } from "../services/categoriesServices";
import { getSales, saveSales } from "../services/salesService";
export const AppContext = createContext();
export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sales, setSales] = useState(() => getSales());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);
  useEffect(() => {
    saveSales(sales);
  }, [sales]);
  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        sales,
        setSales,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
