import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./features/dashboard/Dashboard";
import Categories from "./features/categories/Categories";
import Sales from "./features/sales/Sales";
import Products from "./features/products/Products";
import Login from "./features/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Unauthorized from "./features/auth/Unauthorized";
import NotFound from "./features/not-found/NotFound";
import Register from "./features/auth/Register";
import Settings from "./features/settings/Settings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="products"
            element={
              <ProtectedRoute requiredRole="admin">
                <Products />
              </ProtectedRoute>
            }
          />
          <Route path="categories" element={<Categories />} />
          <Route path="sales" element={<Sales />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
