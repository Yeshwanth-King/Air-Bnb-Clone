import Navbar from "@/app/components/Navbar";
import React from "react";
import { MdOutlineWifi } from "react-icons/md";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaCarOn, FaRadio } from "react-icons/fa6";
import { FaCloudShowersHeavy, FaToriiGate } from "react-icons/fa";
import { IoMdTv } from "react-icons/io";

const page = () => {
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
          <input type="text" placeholder="For example, My lovely apt" />
          <h2 className="text-2xl pl-2">Address</h2>
          <p className="text-sm pl-2 text-gray-400">City Name</p>
          <input type="text" placeholder="For example, Bangalore,Karnataka" />
          <h2 className="text-2xl pl-2">Photos</h2>
          <p className="text-sm pl-2 text-gray-400">
            More Photos = more People
          </p>
          <div>
            <input type="text" placeholder="Add using Link" />
            <button className="bg-gray-300 py-2 px-4 hover:bg-gray-400 transition-all duration-200 rounded-full">
              Grab Photo
            </button>
          </div>
          <div className="grid mt-5 grid-cols-3 gap-2 md:grid-cols-4">
            <button className="p-14 rounded-xl flex justify-center items-center bg-gray-300 hover:bg-gray-400 transition-all duration-200 text-gray-700 text-4xl">
              <RiUploadCloud2Line />
            </button>
          </div>
          <h2 className="text-2xl pl-2">Description</h2>
          <p className="text-sm pl-2 text-gray-400">
            Add Description of the place
          </p>
          <textarea />
          <h2 className="text-2xl pl-2">Perks</h2>
          <p className="text-sm pl-2 text-gray-400">Add Perks of your place</p>
          <div className="grid grid-cols-3 gap-3">
            <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
              <input type="checkbox" name="" id="" />
              <span className="text-lg">
                <MdOutlineWifi />
              </span>
              <span className="text-sm">Wifi</span>
            </label>
            <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
              <input type="checkbox" name="" id="" />
              <span className="text-lg">
                <FaCarOn />
              </span>
              <span className="text-sm">Parking</span>
            </label>
            <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
              <input type="checkbox" name="" id="" />
              <span className="text-lg">
                <FaCloudShowersHeavy />
              </span>
              <span className="text-sm">AC</span>
            </label>
            <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
              <input type="checkbox" name="" id="" />
              <span className="text-lg">
                <IoMdTv />
              </span>
              <span className="text-sm">TV</span>
            </label>
            <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
              <input type="checkbox" name="" id="" />
              <span className="text-lg">
                <FaRadio />
              </span>
              <span className="text-sm">Radio</span>
            </label>
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
              <input type="text" placeholder="7:00" />
            </div>
            <div>
              Check Out
              <input type="text" placeholder="9:00" />
            </div>
            <div>
              Max Guests
              <input type="text" placeholder="5" />
            </div>
          </div>
          <button className="primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default page;
