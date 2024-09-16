/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { api } from "@/services/api";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageToken && storageUser) {
        const decodedToken = jwtDecode(storageToken);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decodedToken.exp < currentTime) {
          signOut();
        } else {
          setUser(JSON.parse(storageUser));
          api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
        }
      }
    };
    loadingStoreData();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.name === "AxiosError") {
        throw new Error(response);
      } else {
        const decoded = jwtDecode(response.data.token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          throw new Error("Token expirado. Por favor, faça login novamente.");
        }

        setUser({ id: decoded.userID, username: decoded.username });
        
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("@Auth:token", response.data.token);
        localStorage.setItem("@Auth:user", JSON.stringify({ id: decoded.userID, username: decoded.username }));

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      navigate("/");
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
