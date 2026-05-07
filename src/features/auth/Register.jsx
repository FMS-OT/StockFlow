import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Navigate, Link } from "react-router-dom";

export default function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    register(form.email, form.password);
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm border border-gray-100 space-y-3"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Register
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create your StockFlow account
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        />

        <button
          type="submit"
          disabled={!form.email || !form.password}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition disabled:cursor-not-allowed"
        >
          Register
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-sm text-gray-500 text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-800 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
