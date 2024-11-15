"use client";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/booking");
      console.log(response.data.bookings);
      setBookings(response.data.bookings);
    })();
  }, []);

  return (
    <div>
      <Navbar />
      {bookings.length > 0 && (
        <>
          <div>
            {bookings.map((place) => (
              <div>
                {place.checkInDate} - {place.checkOutDate}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
