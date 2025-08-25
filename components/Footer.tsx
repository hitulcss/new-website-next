import Link from "next/link";
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
import { Button } from "./ui/button";
import Logo from "@/public/logo.png";
import PlayStoreImg from "@/assets/images/footer/playStore.png";
import QrImage from "@/assets/images/footer/qr-img.png";
import FooterSideImage from "@/assets/images/footer/footersideimage.png";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-(--footer-bg-color)  text-gray-600  py-12 xl:px-20 lg:px-20 md:10 w-full">
      <div className="lg:px-18 xl:px-18 md:px-5 sm:px-10">
        {/* QR Code and App Download Section */}
        <div className="w-full flex sm:flex-col lg:flex-row md:flex-row items-end gap-0">
          <div className="w-full">
            <h3 className="text-xl md:text-2xl font-semibold ml-4">Scan The QR Code To</h3>
            <h3 className="text-xl text-primary font-semibold ml-4">
              Download Our App
            </h3>

            <div className="flex flex-col gap-3 mt-3 w-full">
              <div className="ml-4">
                <Image
                  width={180}
                  height={180}
                  src={QrImage}
                  alt="SD Campus App"
                />
              </div>
              <div className="ml-4 md:-ml-1">
                <Image
                  src={PlayStoreImg}
                  alt="SD Campus App"
                  width={220}
                  height={200}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
          <div className="">
            <Image
              src={FooterSideImage}
              alt="Sd Campus"
              height={590} />
          </div>
        </div>
        <div className="py-4 ">
          <hr className="border-1 border-gray-500 mb-1" />
        </div>
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 mb-6 md:px-10 ml-8 md:ml-0 ">
          {/* Company */}
          <div>
            <h3 className="text-x md:text-lg font-bold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.sdcampus.com/" className="hover:text-orange-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-orange-600">
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-orange-600">
                  Exams
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-x md:text-lg font-bold mb-4">POLICIES</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-orange-600"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/return-and-refund-policy" className="hover:text-orange-600">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-orange-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-x md:text-lg font-bold mb-4">COURSES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.sdcampus.com/school-entrance-exams/sainik-school" className="hover:text-orange-600">
                  Sainik School
                </Link>
              </li>
              <li>
                <Link href="https://www.sdcampus.com/school-entrance-exams/jnv-school" className="hover:text-orange-600">
                  JNV School
                </Link>
              </li>
              <li>
                <Link href="https://www.sdcampus.com/school-entrance-exams/combo-batch-jnv-sainik" className="hover:text-orange-600">
                  Combo Batch (JNV | Sainik)
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="text-x md:text-lg font-bold mb-4">Download Our App</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://play.google.com/store/apps/details?id=com.sdcampus.app&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp" className="hover:text-orange-600">
                  SD Campus App
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-1 border-gray-500 mb-5" />

        {/* Social Media Links */}
        <div className="flex flex-row justify-center gap-2 ml-4 md:ml-0">
          <div className="border-gray-700 font-semibold">
            Copyright © 2025-26 SD Empire EdTech Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="flex space-x-2 text-center justify-center items-center mr-5 md:mr-0 -mt-2">
            <Link
              href="https://www.facebook.com/sdcampus1?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
              className="text-blue-900 hover:text-orange-600"
            >
              <BsFacebook size={35} />
            </Link>
            <Link
              href="https://x.com/SdCampus?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
              className="text-black hover:text-orange-600"
            >
              <BsTwitterX size={35} />
            </Link>
            <Link
              href="https://www.instagram.com/sd_campus/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
              className="text-pink-600 hover:text-orange-500"
            >
              <BsInstagram size={35} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/sd-campus/"
              className="text-blue-600 hover:text-orange-500"
            >
              <BsLinkedin size={35} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
