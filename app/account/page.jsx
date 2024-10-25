"use client";
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../components/UserContext";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

const page = () => {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return (
      <>
        <Navbar />
        <div className="min-h-full flex justify-center items-center">
          <Loader />
        </div>
      </>
    );
  }
  if (ready && !user) {
    const Router = useRouter();
    Router.push("/");
  }
  return (
    <div>
      <Navbar />
      This Account is {user?.name}
    </div>
  );
};

export default page;
