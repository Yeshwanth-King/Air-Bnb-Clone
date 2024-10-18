import { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "flowbite-react"; // Import specific components

const SignUp = ({ showModal, setShowModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle user creation logic here
    console.log("User created:", { username, email, password });
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <ModalHeader>Create User</ModalHeader>
      <ModalBody className="space-y-4 px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700" // Removed dark text color
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700" // Removed dark text color
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700" // Removed dark text color
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="" justify-end>
        {" "}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Create User
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default SignUp;
