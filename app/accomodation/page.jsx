"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import axios from "axios";
import PlacesCard from "../components/PlacesCard";
import { toast } from "sonner";

const Page = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("/api/get-place");
        setPlaces(response.data.places);
      } catch (error) {
        console.error("Error fetching places:", error);
        toast.error("Failed to load accommodations. Please try again.");
        setPlaces([]);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col pb-5">
      <Navbar />
      <div className="flex">
        <span className="text-center text-3xl  mx-auto mt-5">
          Accomodations
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-5 md:max-w-[70%] mx-auto">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                href={"/places/" + place._id}
                key={place._id}
                className="bg-gray-200 p-3 rounded-2xl flex gap-4 mx-10 max-sm:flex-col"
              >
                <div className="w-32 h-32 max-sm:w-full bg-gray-400 rounded-lg flex justify-center items-center overflow-hidden flex-shrink-0">
                  {place.photos[0] ? (
                    <img
                      src={"/uploads/" + place.photos[0]}
                      className="object-cover w-full h-full"
                      alt="place"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>
                <div className="flex flex-col gap-5 mt-2">
                  <span className="text-lg">{place.title}</span>
                  <p className="text-sm text-gray-600 max-sm:hidden">
                    {place.description}
                  </p>
                </div>
              </Link>
            );
          })}
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

export default Page;
