import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer class="bg-gray-100 text-blue-800 py-4">
      <div class="container mx-auto flex justify-between items-center px-4">
        <p class="text-sm">&copy; 2020 Nereus. All rights reserved.</p>
        <div class="flex space-x-4">
          <Link href="#" aria-label="Twitter" class="hover:text-blue-600">
            <FaTwitter />
          </Link>
          <Link href="#" aria-label="Instagram" class="hover:text-blue-600">
            <FaInstagram />
          </Link>
          <Link href="#" aria-label="Github" class="hover:text-blue-600">
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
