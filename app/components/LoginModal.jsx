"use client";
import { RiEyeCloseFill, RiEye2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // State for sign-up modal
  const [showPass, setShowPass] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const openSignUp = () => {
    setIsModalOpen(false); // Close the original modal
    setIsSignUpOpen(true); // Open the sign-up modal
  };

  const closeSignUp = () => setIsSignUpOpen(false);

  // Close the modal when clicking outside of it
  const handleClickOutside = (event) => {
    const modalElement = document.querySelector(".modal");
    if (modalElement && !modalElement.contains(event.target)) {
      setIsModalOpen(false);
      setIsSignUpOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      {/* Login Modal */}
      {isModalOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-md z-10 modal">
          <ul className="py-2">
            <li
              className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer"
              onClick={openSignUp}
            >
              Sign Up
            </li>
            <li className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer">
              Log In
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

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 modal">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8 hover:cursor-pointer"
                  onClick={closeSignUp}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <form>
              <h2 className="font-medium text-xl mb-3">
                Welcome Back to AirClone
              </h2>
              <input type="text" placeholder="Username" />
              <input type="email" placeholder="Email" className="" />
              <div className="flex justify-center items-center gap-3">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="flex justify-center items-center mb-3 text-3xl cursor-pointer"
                >
                  <span>{showPass ? <RiEye2Line /> : <RiEyeCloseFill />}</span>
                </div>
              </div>
              <input type="password" placeholder="Confirm Password" />
              <button type="submit" className="primary">
                Create Account
              </button>
            </form>
            <span>
              Already Have an Account?{" "}
              <Link href={"/login"} className="underline text-blue-500">
                Login here
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
