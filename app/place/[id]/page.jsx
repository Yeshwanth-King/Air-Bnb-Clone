"use client";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import { ImCancelCircle } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";

const page = ({ params }) => {
  const [place, setPlace] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const id = params.id;
  useEffect(() => {
    (async () => {
      const response = await axios.post("/api/getInfo", { id });
      setPlace(response.data.place);
    })();
  }, []);
  if (showPhotos) {
    return (
      <div className=" flex flex-col p-10 bg-black relative">
        <span className="text-white text-3xl">{place?.title}</span>
        <button
          onClick={() => setShowPhotos(false)}
          className="bg-gray-300 right-5 top-5 flex gap-2 justify-center items-center px-3 py-1 rounded-2xl fixed"
        >
          <ImCancelCircle />
          Close Photos
        </button>
        <div className="flex flex-col gap-3 justify-center items-center min-w-full mx-auto p-8">
          {place?.photos.length > 0 &&
            place?.photos.map((photo) => {
              return (
                <div className="min-w-full mx-auto">
                  <img
                    className="object-cover aspect-square"
                    src={"/uploads/" + photo}
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <div className="max-w-[80%] p-10 mx-auto">
        <span className="text-3xl font-medium p-2">{place?.title}</span>
        <div className="p-2 font-semibold flex items-center underline">
          <IoLocationOutline className="font-bold text-lg" />
          {place?.address}
        </div>
        <div className="grid relative grid-cols-2 gap-3 rounded-2xl overflow-hidden mt-5">
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
                  <div key={index}>
                    <img
                      className="object-cover aspect-square cursor-pointer hover:brightness-75 transition-all duration-300"
                      src={"/uploads/" + photo}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
          {place?.photos.length > 4 && (
            <button
              onClick={() => {
                setShowPhotos(true);
              }}
              className="absolute bottom-4 right-4 flex gap-2 justify-center items-center bg-white hover:bg-gray-200 py-1 px-3 rounded-xl"
            >
              <PiDotsNineBold />
              Show all photos
            </button>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">Description:</h2>
          <p>{place?.description}</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-2 mt-5">
            <span className="font-bold">Check In : {place?.checkIn}</span>
            <span className="font-bold">Check Out : {place?.checkOut}</span>
            <span className="font-bold">
              Maximum Number of Guests : {place?.maxGuests}
            </span>
          </div>
          <div className="bg-white m-2 mx-5 rounded-2xl p-4">
            <span className="text-lg">
              Price :<span className="font-bold">₹{place?.price}</span> / Per
              Night
            </span>
            <div class="border border-gray-200 rounded-xl flex flex-col justify-center items-center mt-3 gap-2">
              <div className="flex flex-col">
                <div className="flex">
                  <div class="flex flex-col gap-1 border border-gray-200 p-3">
                    <label class="text-sm font-medium text-gray-700">
                      Check In
                    </label>
                    <input
                      type="date"
                      class="border border-gray-300 p-2 rounded"
                    />
                  </div>
                  <div class="flex flex-col gap-1 border border-gray-200 p-3">
                    <label class="text-sm font-medium text-gray-700">
                      Check Out
                    </label>
                    <input
                      type="date"
                      class="border border-gray-300 p-2 rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 border border-gray-200 p-2">
                  <label>Guests</label>
                  <select className="border p-2" name="" id="">
                    <option>1</option>
                    <option>1</option>
                    <option>1</option>
                    <option>1</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="primary">Book Place</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
