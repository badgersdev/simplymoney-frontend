"use client";

import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/me", {
          method: "GET",
          credentials: "include", // upewnij się, że cookies idą
        });

        if (response.ok) {
          setIsAuthenticated(true);
          console.log("✅ JWT OK, użytkownik zalogowany");
        } else {
          setIsAuthenticated(false);
          console.log("⛔ JWT nieprawidłowy, gość");
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log("❌ Błąd podczas sprawdzania JWT:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
