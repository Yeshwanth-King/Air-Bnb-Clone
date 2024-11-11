"use client";
import axios from "axios";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [places, setPlaces] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    (async () => {
      let response = await axios.get("/api/getAllPalces");
      console.log(response.data);
      setPlaces([
        ...response.data.place,
        ...response.data.place,
        ...response.data.place,
      ]);
    })();
  }, []);

  return (
    <div>
      <Navbar />
      {places.length > 0 && (
        <div className="grid max-w-[80%] mx-auto mt-10 grid-cols-3 gap-y-8 gap-5 lg:grid-cols-4">
          {places.map((place) => {
            return (
              <div key={place._id}>
                <div className="flex flex-col">
                  <div className=" rounded-xl overflow-hidden">
                    <img
                      className="object-cover aspect-square"
                      src={"/uploads/" + place.photos[0]}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-md">{place.address}</span>
                    <span className="font-medium text-sm text-gray-600">
                      {place.title}
                    </span>
                    <span className="font-bold">₹{place.price} per night</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
