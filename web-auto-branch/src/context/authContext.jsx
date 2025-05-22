import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  async function login(email, password, rememberUser) {
    try {
      setLoading(true);
      setLoginError(null);
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message);
        return false;
      }

      setUser(data.user);
      setIsAuthenticated(true);
      if(rememberUser)
        localStorage.setItem("user", JSON.stringify(data.user));
      setLoginError(null);
      return true;
    } catch (error) {
      setLoginError("Erro ao realizar login");
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  async function register(name, email, cpf, password, isAdmin) {
    try {
      setLoading(true);
      setRegisterError(null);
      const response = await fetch("http://localhost:3000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, cpf, password, isAdmin })
      });
      
      const data = await response.json();

      if(!response.ok) {
        setRegisterError(data.message);
        return false;
      }

      setRegisterError(null);
      return true;
    } catch (error) {
      setRegisterError("Erro ao realizar cadastro");
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
      value={{ user, loginError, registerError, loading, isAuthenticated, login, register, logout }}
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
