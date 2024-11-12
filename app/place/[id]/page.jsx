"use client";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [place, setPlace] = useState(null);
  const id = params.id;
  useEffect(() => {
    (async () => {
      const response = await axios.post("/api/getInfo", { id });
      setPlace(response.data.place);
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-[80%] p-10 mx-auto">
        <span className="text-3xl font-medium p-2">{place?.title}</span>
        <div className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden mt-5">
          <div>
            <img
              className="object-cover aspect-square cursor-pointer hover:brightness-50 transition-all duration-300"
              src={"/uploads/" + place?.photos[0]}
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {place?.photos.length > 0 &&
              place.photos.map((photo, index) => {
                if (index === 0 || index > 4) {
                  return;
                }
                return (
                  <div className="">
                    <img
                      className="object-cover aspect-square cursor-pointer hover:brightness-50 transition-all duration-300"
                      src={"/uploads/" + photo}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mt-5 text-xl font-bold">{place?.address}</div>
        <div className="">{place?.maxGuests} Guests</div>
      </div>
    </div>
  );
};

export default page;
