"use client";
import { useState, useRef, useEffect } from "react";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Close the modal when clicking outside of it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // Add event listener to close modal on outside click
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Cleanup listener when modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Cleanup on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="relative">
      {/* Clickable Div */}
      <div
        className="flex justify-center items-center gap-2 border-2 px-3 py-2 rounded-full hover:shadow-md cursor-pointer"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-9 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          ref={modalRef} // Attach ref to modal
          className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-md z-10"
        >
          <ul className="py-2">
            <li className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer">
              Sign Up
            </li>
            <li className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer">
              Login in
            </li>
            <hr />
            <li className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer">
              About your AirClone
            </li>
            <li className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer">
              Host An Experience
            </li>
            <li className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer">
              Help Center
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
