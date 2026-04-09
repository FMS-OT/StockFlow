import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./features/dashboard/Dashboard";
import Categories from "./features/categories/Categories";
import Products from "./features/products/Products";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
