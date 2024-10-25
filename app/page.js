"use client";
import axios from "axios";
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    (async () => {
      if (!user) {
        const response = await axios.get("/api/profile");
        console.log(response.data);
      }
    })();
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
}
