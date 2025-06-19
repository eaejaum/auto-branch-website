import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [managers, setManagers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function restoreUser() {
      const storedUser = localStorage.getItem("user");
      const storedAuth = localStorage.getItem("authentication");
  
      if (storedUser && storedAuth) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
      }
  
      setIsRestoringSession(false);
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

  async function deleteUser(userId) {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message);
        return false
      }

      setError(false);
      if(user.roleId == 1) {
        getAllUsers();
      } else {
        getAllUsersByBranchId(user.branchId)
      }

      return true;

    } catch (error) {
      setError("Erro ao deletar usuário");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function editUser(id, name, email, cpf, roleId, branchId) {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`http://localhost:3000/api/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, name, email, cpf, roleId, branchId })
      });
      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message);
        return false
      }

      setError(false);

      if(user.roleId == 1) {
        getAllUsers();
      } else {
        getAllUsersByBranchId(user.branchId)
      }

    } catch (error) {
      setError("Erro ao editar funcionário");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function getAllManagers() {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch("http://localhost:3000/api/users/managers/", {
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

      setManagers(responseData.data);
      setError(null);
      return true;
    } catch (error) {
      setError("Erro ao listar gerentes");
      return false;
    } finally {
      setLoading(false);
    }
  };

  async function getAllUsersByBranchId(branchId) {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(`http://localhost:3000/api/users/branch/${branchId}`, {
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
      setError("Erro ao listar usuarios");
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
      if (rememberUser) {
        localStorage.setItem("user", JSON.stringify(responseData.data[0]));
        localStorage.setItem("authentication", true);
      }

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

  async function register(name, email, cpf, password, roleId, branchId) {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, cpf, password, roleId, branchId })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return false;
      }

      if(user.roleId == 1) {
        getAllUsers();
      } else {
        getAllUsersByBranchId(user.branchId)
      }
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
    localStorage.removeItem("authentication");
  }

  return (
    <AuthContext.Provider
      value={{ user, users, managers, error, loading, isAuthenticated, isRestoringSession, login, register, getAllUsers, getAllManagers, getAllUsersByBranchId, deleteUser, editUser, logout }}
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
