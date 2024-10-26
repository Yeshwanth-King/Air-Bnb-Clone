"use client";
import { RiEyeCloseFill, RiEye2Line } from "react-icons/ri";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserContext } from "./UserContext";
import DynamicBadge from "./Dynamicbadge";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const Router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };
    try {
      let response = await axios.post("/api/signUp", data);
      console.log(response.data.userData);
      console.log("User created: ", { name, email, password });
      setIsSignUpOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loginhandleSubmit = async (ev) => {
    ev.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      let response = await axios.post("/api/signUp", data);

      console.log(response.data);
      setUser(response.data);
      console.log(user);
      setIsSignIn(false);
    } catch (error) {
      console.log("Wrong Password");
    }
  };

  const openSignIn = () => {
    setIsSignUpOpen(false);
    setIsModalOpen(false);
    setIsSignIn(true);
  };

  const openSignUp = () => {
    setIsSignIn(false);
    setIsModalOpen(false); // Close the original modal
    setIsSignUpOpen(true); // Open the sign-up modal
  };

  const closeSignIn = () => setIsSignIn(false);

  const closeSignUp = () => setIsSignUpOpen(false);

  // Close the modal when clicking outside of it
  const handleClickOutside = (event) => {
    const modalElement = document.querySelector(".modal");
    if (modalElement && !modalElement.contains(event.target)) {
      setIsModalOpen(false);
      setIsSignUpOpen(false);
      setIsLoginModal(false);
    }
  };
  const toggleLoginModal = () => {
    setIsLoginModal(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative">
      {/* Clickable Div */}
      <div
        className="flex justify-center items-center gap-2 border-2 px-3 py-2 rounded-full hover:shadow-md cursor-pointer"
        onClick={user ? toggleLoginModal : toggleModal}
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

        {user ? (
          <DynamicBadge letter={user.name[0]} notificationCount={0} />
        ) : (
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
        )}
      </div>

      {/* Login Modal */}
      {isModalOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-md z-10 modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ul className="py-2">
            <li
              className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer"
              onClick={openSignUp}
            >
              Sign Up
            </li>
            <li
              onClick={openSignIn}
              className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer"
            >
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
        </motion.div>
      )}

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
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
            <form onSubmit={(e) => handleSubmit(e)}>
              <h2 className="font-medium text-xl mb-3">Welcome to AirClone</h2>
              <input
                required
                autoComplete="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <input
                required
                autoComplete="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <div className="flex justify-center items-center gap-3">
                <input
                  required
                  autoComplete="new-password"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="flex justify-center items-center mb-3 text-3xl cursor-pointer"
                >
                  <span>{showPass ? <RiEye2Line /> : <RiEyeCloseFill />}</span>
                </div>
              </div>
              <input
                required
                autoComplete="new-password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
              />
              <button type="submit" className="primary w-full">
                Create Account
              </button>
            </form>
            <div className="text-center pt-2">
              Already Have an Account?{" "}
              <button onClick={openSignIn} className="underline text-blue-500">
                Login here
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Login In Modal */}
      {isSignIn && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold mb-4">Sign In</h2>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8 hover:cursor-pointer"
                  onClick={closeSignIn}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <form onSubmit={(e) => loginhandleSubmit(e)}>
              <h2 className="font-medium text-xl mb-3">
                Welcome Back to AirClone
              </h2>
              <input
                required
                autoComplete="email"
                type="text"
                autoSave="true"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />

              <div className="flex justify-center items-center gap-3">
                <input
                  required
                  autoComplete="new-password"
                  autoSave="true"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="flex justify-center items-center mb-3 text-3xl cursor-pointer"
                >
                  <span>{showPass ? <RiEye2Line /> : <RiEyeCloseFill />}</span>
                </div>
              </div>

              <button type="submit" className="primary w-full">
                log In
              </button>
            </form>
            <div className="text-center pt-2">
              Don't Have an Account?{" "}
              <button onClick={openSignUp} className="underline text-blue-500">
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* LOGINED MAIN MENU */}
      {isLoginModal && (
        <motion.div
          className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-md z-10 modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ul className="py-2">
            <li
              className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                Router.push("/account");
              }}
            >
              Account
            </li>
            <li
              onClick={() => {
                Router.push("/accomodation");
              }}
              className="px-6 py-2 text-sm hover:font-medium hover:bg-gray-100 cursor-pointer"
            >
              My Accomodation
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
        </motion.div>
      )}
    </div>
  );
}
