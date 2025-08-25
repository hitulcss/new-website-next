import Link from "next/link";
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.png";
import PlayStoreImg from "@/assets/images/footer/playStore.png";
import QrImage from "@/assets/images/footer/qr-img.png";
import FooterSideImage from "@/assets/images/footer/footer-side-image.png";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-(--footer-bg-color) text-gray-600 py-12 px-9 w-full">
      <div className="px-12">
        {/* QR Code and App Download Section */}
        <div className="w-full flex sm:flex-col lg:flex-row md:flex-row items-end gap-6">
          <div className="w-full">
            <h3 className="text-2xl font-semibold ">Scan The QR Code To</h3>
            <h3 className="text-xl text-primary font-semibold">Download Our App </h3>

            <div className="flex flex-col gap-3 mt-3 w-full">
              <div>
                <Image width={200} height={200} src={QrImage} alt="SD Campus App" />
              </div>
              <div className="w-[180px]">
                <Image src={PlayStoreImg} alt="SD Campus App" />
              </div>
            </div>
          </div>
          <div className="">
            <Image src={FooterSideImage} alt="Sd Campus" />
          </div>
        </div>
        <hr className="border-1 border-gray-500 mb-2" />

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Exams
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">POLICIES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-blue-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">COURSES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Live Classes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Study Material
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Stationery Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">OUR PRODUCTS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-400">
                  SD Campus Learning App
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  SD Parent App
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-1 border-gray-500 mb-5" />

        {/* Social Media Links */}
        <div className="flex flex-row justify-center gap-2">
          <div className="border-gray-700">
            Copyright © 2024 SD Campus EdTech Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="flex space-x-2 text-center justify-center items-center">
            <Link href="#" className="text-gray-400 hover:text-white">
              <BsFacebook size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <BsTwitterX size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <BsInstagram size={18} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <BsLinkedin size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
