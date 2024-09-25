"use client";

import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <footer className="text-white pt-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="md:w-1/4 mb-6 md:mb-0">
            <Image
            src={logo}
            alt="ByteMart Logo"
            height={100}

            >

            </Image>
            <div className="flex space-x-4 mt-4">
              <FaFacebook className="text-white hover:text-green-400" size={24} />
              <FaTwitter className="text-white hover:text-green-400" size={24} />
              <FaYoutube className="text-white hover:text-green-400" size={24} />
              <FaInstagram className="text-white hover:text-green-400" size={24} />
              <FaLinkedin className="text-white hover:text-green-400" size={24} />
            </div>
            <button className="bg-red-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-red-700">
              Complaint Box
            </button>
          </div>

          {/* Middle Section */}
          <div className="md:w-1/4 mb-6 md:mb-0">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/branches">Branches & Pickup Points</Link></li>
              <li><Link href="/warranty">Warranty</Link></li>
              <li><Link href="/repair">Repair and Services</Link></li>
              <li><Link href="/emi">EMI</Link></li>
              <li><Link href="/glossary">Glossary</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="md:w-1/4 mb-6 md:mb-0">
            <h3 className="font-bold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li><Link href="/order-procedure">Order Procedure</Link></li>
              <li><Link href="/delivery">Home Delivery</Link></li>
              <li><Link href="/return">Return, Refund & Cancelation</Link></li>
              <li><Link href="/payment">Payment Method</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:w-1/4 mb-6 md:mb-0">
            <h3 className="font-bold mb-4">Contact Us</h3>
            <address className="not-italic space-y-2">
              <p>ByteMart</p>
              <p>Kusholi Bhaban, 4th Floor, 238/1 Begum Rokeya Sharani, Agargaon, Dhaka-1207</p>
              
            </address>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4 text-sm">
          <p>Prices are subject to change without any prior notice.</p>
          <p>ByteMart © 2024 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
