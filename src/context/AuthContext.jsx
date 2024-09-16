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
        setUser(JSON.parse(storageUser));
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
        
        setUser({ id: decoded.userID, username: decoded.username });
        
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("@Auth:token", JSON.stringify(response.data.token));
        localStorage.setItem("@Auth:user", JSON.stringify({ id: decoded.userID, username: decoded.username }));

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      navigate("/");
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
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
