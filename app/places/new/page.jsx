"use client";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";

import Perks from "@/app/components/Perks";
import axios from "axios";
import Image from "next/image";

const page = () => {
  const [title, setTitle] = useState("");
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
    ev.preventDefault();
    let response = await axios.post("/api/upload-by-link", { link: photoLink });
    console.log(response.data);
    setAddPhotos((prev) => {
      return [...prev, response.data.newName];
    });
    setPhotoLink("");
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
            {addPhotos.length > 0 &&
              addPhotos.map((link) => {
                return (
                  <div
                    key={link}
                    className="flex justify-center items-center rounded-lg"
                  >
                    {console.log(link)}
                    {/* <Image src={"/uploads/" + link} width={100} height={100} /> */}
                    <img
                      className="rounded-lg"
                      src={"/uploads/" + link}
                      alt=""
                    />
                  </div>
                );
              })}
            <button className="md:p-14 p-10 rounded-xl flex justify-center items-center bg-gray-200 hover:bg-gray-400 transition-all duration-200 text-gray-700 text-4xl">
              <RiUploadCloud2Line />
            </button>
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
