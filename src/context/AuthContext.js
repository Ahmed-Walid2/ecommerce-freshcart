import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      setUserToken(token);
      const { id } = jwtDecode(token);
      setUserId(id);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
