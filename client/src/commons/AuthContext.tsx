import { createContext, useState, useEffect } from "react";
import React from "react";
const AuthContext = createContext({ jwt: "" });

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [jwt, setJwt] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedJwt = localStorage.getItem("jwt");
    if (storedJwt) {
      setIsLoggedIn(true);
      setJwt(storedJwt);
      // console.log('Set token'+)
    }
    setIsLoading(false);
  }, []);
  function login(token) {
    setIsLoggedIn(true);
    setJwt(token);
    localStorage.setItem("jwt", token);
  }

  function logout() {
    setIsLoggedIn(false);
    setJwt(null);
    localStorage.removeItem("jwt");
  }

  const authValue = {
    isLoggedIn,
    isLoading,
    login,
    logout,
    jwt,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
