/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = async (token) => {
    try {
      console.log(token)
      const response = await fetch("http://127.0.0.1:5000/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); 
    }
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const login = (token) => {
    Cookies.set("authToken", token, { expires: 7 }); 
    fetchUserData(token);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
