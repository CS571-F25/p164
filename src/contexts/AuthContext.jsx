import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("devfolio_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (username, pin) => {
    // MOCK CREDENTIALS: admin / 12345
    if (username === "admin" && pin === "12345") {
      const userData = { username: "Admin", role: "admin" };
      setUser(userData);
      sessionStorage.setItem("devfolio_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("devfolio_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}