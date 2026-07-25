"use client";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User } from "@/context/auth-context";
import { authService } from "@/services/auth.service";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    
    const initializeAuth = async () => {
      
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        
        const response = await authService.getProfile();
        setUser(response.data);
        setIsInitializing(false);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("accessToken");
        setUser(null);
        setIsInitializing(false);
      }
    };
    
    initializeAuth();

  }, []);

  const isAuthenticated = user !== null;

  const login = async (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);

    const response = await authService.getProfile();

    setUser(response.data);
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isInitializing,
      login,
      logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}