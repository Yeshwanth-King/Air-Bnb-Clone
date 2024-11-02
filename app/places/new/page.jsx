"use client";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";

import Perks from "@/app/components/Perks";
import axios from "axios";
import Image from "next/image";
import SpinnerLoader from "@/app/components/SpinnerLoader";

const page = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [addPhotos, setAddPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const addPhotoToPhotos = async (ev, photoLink) => {
    setLoading(true);
    ev.preventDefault();
    let response = await axios.post("/api/upload-by-link", { link: photoLink });
    setAddPhotos((prev) => {
      return [...prev, response.data.newName];
    });
    setPhotoLink("");
    setLoading(false);
  };

  const uploadFiles = async (ev) => {
    setLoading(true);
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]); // Ensure field name is 'photos'
    }

    const response = await axios.post("/api/uploads", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data.photos);
    if (response.data.photos) {
      setAddPhotos((prev) => {
        return [...prev, ...response.data.photos];
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl mt-5 text-center">Accomodations</h1>
      <div className="max-w-[800px] mx-auto">
        <form className="p-5 flex flex-col gap-2 rounded-xl">
          <h2 className="text-2xl pl-2">Title</h2>
          <p className="text-sm pl-2 text-gray-400">
            Give a good name to your hotel
          </p>
          <input
            value={title}
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
            type="text"
            placeholder="For example, My lovely apt"
          />
          <h2 className="text-2xl pl-2">Address</h2>
          <p className="text-sm pl-2 text-gray-400">City Name</p>
          <input
            value={address}
            onChange={(ev) => {
              setAddress(ev.target.value);
            }}
            type="text"
            placeholder="For example, Bangalore,Karnataka"
          />
          <h2 className="text-2xl pl-2">Photos</h2>
          <p className="text-sm pl-2 text-gray-400">
            More Photos = more People
          </p>
          <div>
            <input
              value={photoLink}
              onChange={(ev) => {
                setPhotoLink(ev.target.value);
              }}
              type="text"
              placeholder="Add using Link"
            />
            <button
              onClick={(ev) => {
                addPhotoToPhotos(ev, photoLink);
              }}
              className="bg-gray-200 py-2 px-4 hover:bg-gray-400 transition-all duration-200 rounded-full"
            >
              Grab Photo
            </button>
          </div>
          <div className="grid mt-5 grid-cols-3 gap-2 md:grid-cols-4">
            {loading && (
              <div className="flex justify-center items-center">
                <SpinnerLoader />
              </div>
            )}
            {addPhotos.length > 0 &&
              addPhotos.map((link) => {
                return (
                  <div
                    key={link}
                    className="flex justify-center items-center rounded-lg overflow-hidden w-40 h-40" // Use TailwindCSS for fixed dimensions
                  >
                    <img
                      className="rounded-lg object-cover w-full h-full" // Ensure the image covers the container
                      src={"/uploads/" + link}
                      alt=""
                    />
                  </div>
                );
              })}
            <label className="md:p-14 p-10 cursor-pointer rounded-xl flex justify-center items-center bg-gray-200 hover:bg-gray-400 transition-all duration-200 text-gray-700 text-4xl">
              <input
                multiple
                onChange={(ev) => uploadFiles(ev)}
                type="file"
                className="hidden"
                id=""
              />
              <RiUploadCloud2Line />
            </label>
          </div>
          <h2 className="text-2xl pl-2">Description</h2>
          <p className="text-sm pl-2 text-gray-400">
            Add Description of the place
          </p>
          <textarea
            value={description}
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
          />
          <h2 className="text-2xl pl-2">Perks</h2>
          <p className="text-sm pl-2 text-gray-400">Add Perks of your place</p>
          <div className="grid grid-cols-3 gap-3">
            <Perks perks={perks} setPerks={setPerks} />
          </div>
          <h2 className="text-2xl pl-2">Extra Info</h2>
          <p className="text-sm pl-2 text-gray-400">
            Add Rules and Regulations
          </p>
          <textarea />
          <h2 className="text-2xl pl-2">Check in & out time</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              Check In
              <input
                value={checkIn}
                onChange={(ev) => {
                  setCheckIn(ev.target.value);
                }}
                type="text"
                placeholder="7:00"
              />
            </div>
            <div>
              Check Out
              <input
                value={checkOut}
                onChange={(ev) => {
                  setCheckOut(ev.target.value);
                }}
                type="text"
                placeholder="9:00"
              />
            </div>
            <div>
              Max Guests
              <input
                value={maxGuests}
                onChange={(ev) => {
                  setMaxGuests(ev.target.value);
                }}
                type="text"
                placeholder="5"
              />
            </div>
          </div>
          <button className="primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default page;
