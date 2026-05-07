import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  function login(email, role = "user") {
    const fakeUser = { email, role };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  }
  function register(email) {
    const fakeUser = { email, role: "user" };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  }
  function updateUser(updatedData) {
    const updatedUser = {
      ...user,
      ...updatedData,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }
  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
