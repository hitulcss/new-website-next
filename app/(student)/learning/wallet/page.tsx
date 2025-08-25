"use client";
import React from "react";
import { FaRupeeSign, FaHandHoldingUsd, FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const WalletPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 space-y-6">

      {/* Wallet Balance Section */}
      <div className="w-[1020px] h-[215px] rounded-[12px] bg-[#FFF8E5] p-6 flex flex-col justify-between">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <FaRupeeSign /> 0
        </h1>
        <h4 className="text-lg font-medium text-gray-600">Wallet Balance</h4>
        <Button variant="ghost" className="text-orange-500 w-fit p-0">Redeem Now</Button>
      </div>

      {/* Help Friends Section */}
      <div className="w-[1020px] h-[129px] rounded-[12px] border p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/friends-help.png"
            alt="Help Friends"
            width={60}
            height={60}
            className="rounded-md"
          />
          <p className="text-lg font-medium">
            Help your Friends & Earn points to unlock premium Content
          </p>
        </div>
        <FaChevronDown className="text-gray-500 cursor-pointer" />
      </div>

      {/* Transaction History Section */}
      <div className="w-[1020px] h-[409px] rounded-[12px] border p-6 space-y-4">
        <h1 className="text-xl font-bold">Transaction History</h1>
        <hr />

        {[1, 2, 3].map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-start">
                <FaHandHoldingUsd className="text-orange-500 mt-1" />
                <div className="space-y-1">
                  <p className="font-semibold">Reward Added</p>
                  <p className="text-gray-600 text-sm">Via SIGNUP</p>
                  <p className="text-gray-400 text-xs">15 Nov, 2023</p>
                </div>
              </div>
              <p className="text-green-600 font-bold flex items-center">
                +<FaRupeeSign className="inline-block" />50
              </p>
            </div>
            <hr className="my-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletPage;
