'use client';

import React from 'react';
import Image from 'next/image';
import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaVideo,
  FaQuestionCircle,
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaUserCircle,
  FaUndoAlt,
  FaWhatsapp,
  FaPhoneAlt,
} from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import SupportImg from '@/assets/images/my-courses/support.jpg';

const helpOptions = [
  { label: 'Course & Enrolments', color: 'bg-purple-100', icon: <FaChalkboardTeacher size={20} /> },
  { label: 'Mock Tests & Quizzes', color: 'bg-yellow-100', icon: <FaClipboardList size={20} /> },
  { label: 'Live Classes', color: 'bg-green-100', icon: <FaVideo size={20} /> },
  { label: 'My Doubts', color: 'bg-indigo-100', icon: <FaQuestionCircle size={20} /> },
  { label: 'Orders & Payments', color: 'bg-green-50', icon: <FaMoneyCheckAlt size={20} /> },
  { label: 'Switch Courses', color: 'bg-purple-50', icon: <FaExchangeAlt size={20} /> },
  { label: 'Account Basics', color: 'bg-yellow-50', icon: <FaUserCircle size={20} /> },
  { label: 'Refunds', color: 'bg-green-100', icon: <FaUndoAlt size={20} /> },
];

export default function NeedHelpPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Need Help</h2>
      <p className="text-gray-600 mb-6">Related to any of the below Query:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {helpOptions.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-4 rounded-md shadow-sm ${item.color} cursor-pointer hover:shadow-md transition`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <BsArrowRight />
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="mt-10 bg-white shadow-sm rounded-md p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">Have any question about the courses purchase</h3>
          <p className="text-gray-600 mb-4">Our Expert Can Answer All Your Questions.</p>
          <a
            href="https://api.whatsapp.com/send/?phone=917428394524&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 text-white font-bold py-2 px-6 rounded-md text-sm inline-block"
          >
            <FaWhatsapp className="inline-block mr-2 text-2xl" />
            Chat on WhatsApp
          </a>
          <div className="mt-6 w-fit bg-orange-600 border border-orange-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
              <FaPhoneAlt className="w-5 h-5" />
            </div>
            <div className="text-sm">
              {/* <p className="text-gray-700 font-bold text-x">Call Us</p> */}
              <p className="text-white font-bold text-base cursor-pointer">+91 8130700157</p>
            </div>  
          </div>

        </div>

        {/* You can optionally keep the image or remove it */}

        <Image
          src={SupportImg}
          alt="Support Agent"
          width={208}
          height={208}
          className="h-auto w-52 object-cover rounded-md"
        />

      </div>
    </div>
  );
}
