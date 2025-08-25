"use client";
import React from "react";
import Image from "next/image";
import { FaEye, FaHeart, FaCommentDots, FaEllipsisV } from "react-icons/fa";

const Feed: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 space-y-6">
      {/* First Content Wrapper */}
      <div className="w-[1020px] h-[534px] border rounded-[12px] p-4 space-y-3">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-start">
            <div className="w-[37px] h-[37px] bg-gray-300 rounded-full" />
            <div>
              <h5 className="text-base font-semibold">Sainik School Form Out 2025 🥳🥳</h5>
              <p className="text-sm text-gray-500">56 min ago</p>
            </div>
          </div>
          <FaEllipsisV className="text-gray-500 mt-1 cursor-pointer" />
        </div>
        <hr />

        {/* Image Section */}
        <div className="w-full h-[290px] bg-gray-200 rounded-md overflow-hidden">
          <Image
            src="/assets/sainik-form-banner.png"
            alt="Sainik School Banner"
            width={1020}
            height={290}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Reaction Section */}
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <FaEye /> 100
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <FaHeart /> 10
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FaCommentDots /> Comment
          </div>
        </div>

        <hr />
        <p className="text-center text-sm text-gray-500">No comment yet!</p>
      </div>

      {/* Second Content Wrapper WITH Comment Box */}
      <div className="w-[1020px] h-[290px] border rounded-[12px] p-4 space-y-3">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-start">
            <div className="w-[37px] h-[37px] bg-gray-300 rounded-full" />
            <div>
              <h5 className="text-base font-semibold">Upcoming Exam Notification</h5>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <FaEllipsisV className="text-gray-500 mt-1 cursor-pointer" />
        </div>
        <hr />

        {/* Comment Box Replacing Placeholder */}
        <div className="w-[341px] h-[96px] bg-gray-100 rounded-[6px] p-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">Ajay Singh</span>
            <span className="text-xs text-gray-500">5 min ago</span>
          </div>
          <p className="text-sm text-gray-700 mt-2">
            Hi, Kindly call at 080-49232873 for purchase related information so that team can help you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
