import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function restoreUser() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    restoreUser();
  }, []);

  async function getAllUsers() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch("http://localhost:3000/api/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
        return false;
      }

      setUsers(responseData.data);
      setError(null);
      return true;
    } catch (error) {
      setError("Erro ao listar usuários");
      return false;
    } finally {
      setLoading(false);
    }
  };

  async function login(email, password, rememberUser) {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
        return false;
      }

      setUser(responseData.data[0]);
      setIsAuthenticated(true);
      if (rememberUser)
        localStorage.setItem("user", JSON.stringify(responseData.data[0]));
      setError(null);
      return true;
    } catch (error) {
      setError("Erro ao realizar login");
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  async function register(name, email, cpf, password, isAdmin) {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, cpf, password, isAdmin })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return false;
      }

      getAllUsers();
      setError(null);
      return true;
    } catch (error) {
      setError("Erro ao realizar cadastro");
      return false;
    } finally {
      setLoading(false);
    };
  };

  function logout() {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{ user, users, error, loading, isAuthenticated, login, register, getAllUsers, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
