import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

const page = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <span className="text-center text-3xl  mx-auto mt-5">
          Accomodations
        </span>
      </div>
      <div className="flex mt-5">
        <Link
          className="bg-[#ff385c] flex gap-2 justify-center items-center hover:bg-[#e33450] px-4 py-2 rounded-full text-white mx-auto"
          href={"/places/new"}
        >
          <GoPlus className="text-3xl" />
          Add New Place
        </Link>
      </div>
    </div>
  );
};

export default page;
