"use client";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      if (!user) {
        try {
          const response = await axios.get("/api/profile");
          setUser(response.data.user);
          setReady(true);
        } catch (error) {}
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
