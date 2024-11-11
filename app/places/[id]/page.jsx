"use client";
import Navbar from "@/app/components/Navbar";
import React, { useState, useEffect } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";
import Perks from "@/app/components/Perks";
import { FaRegMinusSquare } from "react-icons/fa";
import axios from "axios";
import SpinnerLoader from "@/app/components/SpinnerLoader";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
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
  const Router = useRouter();

  const id = params.id;

  useEffect(() => {
    (async () => {
      if (!id || id === "new") {
        return;
      }
      const response = await axios.post("/api/getInfo", { id });
      console.log(response.data.place.title);
      setTitle(response.data.place.title);
      setAddress(response.data.place.address);
      setAddPhotos(response.data.place.photos);
      setDescription(response.data.place.description);
      setPerks(response.data.place.perks);
      setExtraInfo(response.data.place.extraInfo);
      setCheckIn(response.data.place.checkIn);
      setCheckOut(response.data.place.checkOut);
      setMaxGuests(response.data.place.maxGuests);
    })();
  }, [id]);

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

    if (response.data.photos) {
      setAddPhotos((prev) => {
        return [...prev, ...response.data.photos];
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (id === "new") {
      const data = {
        title,
        address,
        description,
        photos: addPhotos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      };
      try {
        let response = await axios.post("/api/add-place", data);
        console.log(response.data);
        Router.push("/accomodation");
      } catch (error) {
        console.log(error);
      }
    } else {
      const data = {
        id: id,
        title,
        address,
        description,
        photos: addPhotos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      };
      try {
        let response = await axios.put("/api/add-place", data);
        console.log(response.data);
        Router.push("/accomodation");
      } catch (error) {
        alert(error);
      }
    }
  };

  const removePhoto = (ev, link) => {
    ev.preventDefault();
    setAddPhotos((prev) => {
      return prev.filter((item) => link !== item);
    });
  };

  const setTofirst = (ev, link) => {
    ev.preventDefault();
    setAddPhotos((prev) => {
      return [link, ...prev.filter((item) => link !== item)];
    });
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl mt-5 text-center">Accomodations</h1>
      <div className="max-w-[800px] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="p-5 flex flex-col gap-2 rounded-xl"
        >
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
                    className="flex relative justify-center items-center rounded-lg overflow-hidden w-40 h-40" // Use TailwindCSS for fixed dimensions
                  >
                    <img
                      className="rounded-lg object-cover w-full h-full" // Ensure the image covers the container
                      src={"/uploads/" + link}
                      alt=""
                    />
                    <button
                      onClick={(ev) => removePhoto(ev, link)}
                      className="absolute bg-red-500 cursor-pointer opacity-80 p-1 top-1 rounded-lg right-1"
                    >
                      <FaRegMinusSquare className=" text-white text-xl font-bold" />
                    </button>
                    <button
                      onClick={(ev) => setTofirst(ev, link)}
                      className="absolute bg-black cursor-pointer opacity-80 p-1 top-1 rounded-lg left-1"
                    >
                      {link == addPhotos[0] && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 text-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {link !== addPhotos[0] && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="0"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 text-white text-xl font-bold"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            <label className="md:p-14 p-10 cursor-pointer rounded-xl flex justify-center items-center bg-gray-200 hover:bg-gray-400 transition-all duration-200 text-gray-700 text-4xl">
              <input
                multiple
                onChange={(ev) => uploadFiles(ev)}
                type="file"
                className="hidden"
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
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
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

export default Page;
