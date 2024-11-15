"use client";
import Navbar from "@/app/components/Navbar";
import { UserContext } from "@/app/components/UserContext";
import React, { useContext } from "react";

const page = ({ params }) => {
  const id = params.id;
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default page;
