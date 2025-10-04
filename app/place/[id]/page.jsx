"use client";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import { ImCancelCircle } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { differenceInCalendarDays } from "date-fns";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/components/UserContext";
import { toast } from "sonner";

const Page = ({ params }) => {
  const [place, setPlace] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  useEffect(() => {
    setNumberOfNights(
      differenceInCalendarDays(new Date(checkOutDate), new Date(checkInDate))
    );
  }, [checkInDate, checkOutDate]);

  const router = useRouter();

  const id = params.id;
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post("/api/getInfo", { id });
        setPlace(response.data.place);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    })();
  }, [id]);

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  const bookingPlace = async (ev) => {
    ev.preventDefault();
    if (!user) {
      toast.error("Please login to book a place");
      return;
    }
    if (!place) {
      toast.error("Place information not available");
      return;
    }
    const data = {
      place: place._id,
      user: user._id,
      name,
      phone,
      checkInDate,
      checkOutDate,
      guests,
      price: numberOfNights * place.price,
    };
    console.log(data);
    try {
      toast.loading("Booking your place...", { id: "booking" });
      const response = await axios.post("/api/booking", data);
      toast.success("Place booked successfully!", { id: "booking" });
      router.push(`/account/booking/`);
    } catch (error) {
      console.error("Error booking place:", error);
      toast.error("Failed to book place. Please try again.", { id: "booking" });
    }
  };
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
            place?.photos.map((photo, index) => {
              return (
                <div key={index} className="min-w-full mx-auto">
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
      <div className="md:max-w-[80%] p-5 md:p-10 mx-auto">
        <span className="text-3xl font-medium p-2">{place?.title}</span>
        <div className="p-2 font-semibold flex items-center underline">
          <IoLocationOutline className="font-bold text-lg" />
          {place?.address}
        </div>
        <div className="grid relative grid-cols-2 gap-3 rounded-2xl overflow-hidden mt-5">
          <div>
            <img
              onClick={() => {
                setShowPhotos(true);
              }}
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
                      onClick={() => {
                        setShowPhotos(true);
                      }}
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
              <span className="max-sm:hidden">Show all photos</span>
            </button>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">Description:</h2>
          <p>{place?.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-2 mt-5">
            <span className="font-bold">Check In : {place?.checkIn}</span>
            <span className="font-bold">Check Out : {place?.checkOut}</span>
            <span className="font-bold">
              Maximum Number of Guests : {place?.maxGuests}
            </span>
          </div>
          <div className="bg-white m-2  rounded-2xl p-4 flex flex-col gap-4">
            <span className="text-lg flex items-center">
              Price: <span className="font-bold">₹{place?.price}</span> / Per
              Night
            </span>

            <div className="rounded-xl flex flex-col p-3 justify-center items-center gap-2">
              <div className="flex max-md:flex-col max-md:gap-1">
                <div className="flex flex-col gap-1 border rounded-lg border-gray-200 p-3">
                  <label className="text-sm font-medium text-gray-700">
                    Check In
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(ev) => setCheckInDate(ev.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="flex flex-col gap-1 border rounded-lg border-gray-200 p-3">
                  <label className="text-sm font-medium text-gray-700">
                    Check Out
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(ev) => setCheckOutDate(ev.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-1 border rounded-lg border-gray-200 p-3">
                  <label className="text-sm font-medium text-gray-700">
                    Guests
                  </label>
                  <select
                    className="border cursor-pointer rounded p-2"
                    value={guests}
                    onChange={(ev) => setGuests(ev.target.value)}
                    name="guests"
                    id="guests"
                  >
                    {place?.maxGuests > 0 &&
                      Array.from({ length: place.maxGuests }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {numberOfNights > 0 && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Your Name:
                </label>
                <input
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  type="text"
                  required
                  placeholder="Yeshwanth"
                />
                <label className="text-sm font-medium text-gray-700">
                  Phone Number:
                </label>
                <input
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  type="tel"
                  required
                  placeholder="123"
                />
              </div>
            )}

            <button
              onClick={(ev) => bookingPlace(ev)}
              className="primary flex items-center justify-center"
            >
              {numberOfNights > 0 ? (
                <span>₹{numberOfNights * place?.price}</span>
              ) : (
                "Book Place"
              )}
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl mt-5">
          <h2 className="text-2xl font-bold">Extra Info:</h2>
          <p>{place?.extraInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
