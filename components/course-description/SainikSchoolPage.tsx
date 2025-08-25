"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DescriptionWithSeeMore from "./DescriptionWithSeeMore";
import QueryForm from "../home/QueryForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MobilePopup from '@/components/popups/MobilePopup';
import Enroll from "./enroll";
import ValidityMonths from "./validitymonths";
import CustomVideoPlayer from "@/components/custom-video-player/CutomVideoPlayer";

// Demo video modal
function DemoVideoModal({ open, onClose, videoUrl, poster }: { open: boolean; onClose: () => void; videoUrl: string; poster?: string }) {
  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full max-w-3xl mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-60 rounded-full px-3 py-1 z-10"
          aria-label="Close"
        >
          &times;
        </button>
        <video
          controls
          autoPlay
          width="100%"
          height="100%"
          className="w-full h-[60vh] object-contain rounded-lg bg-black"
          poster={poster || "/assets/images/demo-video-poster.jpg"}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  ) : null;
}

export default function SainikSchoolPage({
  batchDetails,
}: {
  batchDetails: any;
}) {
  console.log(batchDetails, "batch full view");
  const [availableTabs, setAvailableTabs] = useState<number[]>(batchDetails?.validities.map((validity: any) => validity.month) || []);
  const [selectedTab, setSelectedTab] = useState<number | null>(availableTabs.length > 0 ? availableTabs[0] : null);
  const [selectedValidity, setSelectedValidity] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState<{ open: boolean; index: number | null }>({ open: false, index: null });

  const [showValidityModal, setShowValidityModal] = useState(false);
  const handleOpenOverPopup = () => {
    setShowValidityModal(prev => !prev);
  }

  useEffect(() => {
    if (!batchDetails?.validities) return;

    const months = batchDetails.validities.map((v: { month: number }) => v.month);
    const uniqueSorted = Array.from(new Set(months) as Set<number>).sort((a, b) => b - a); // highest first
    setAvailableTabs(uniqueSorted);
    if (uniqueSorted.length > 0) {
      setSelectedTab(uniqueSorted[0]); // select highest month

    }
  }, [batchDetails]);

  useEffect(() => {
    if (!selectedTab || !batchDetails?.validities) return;

    const match = batchDetails.validities.find((v: any) => v.month === selectedTab);
    setSelectedValidity(match ?? null);
  }, [selectedTab, batchDetails]);

  useEffect(() => {
    if (batchDetails?.validities && batchDetails.validities.length > 0) {
      const highestValidity = batchDetails.validities.reduce((prev: any, current: any) => {
        return (prev.month > current.month) ? prev : current;
      });
      setSelectedValidity(highestValidity);
      setSelectedTab(highestValidity.month);
    }
  }, [batchDetails?.validities]);

  const handleOpenPopup = () => {
    if (!selectedValidity) {
      alert("Please select a validity option first.");
      return;
    }
    if (selectedValidity.month === 0) {
      alert("This batch is not available for enrollment.");
      return;
    }
    if (localStorage.getItem("authToken")) {
      setShowEnroll(prev => !prev);
    } else {
      setShowModal(prev => !prev);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 shadow-lg rounded-2xl p-6 border">
        {/* Left Image */}
        <div className="md:w-1/2">
          <Image
            src={batchDetails?.banner ?? ''}
            width={515}
            height={200}
            alt="Sainik School"
            className="rounded-xl w-full object-cover"
          />
        </div>


        {/* Right Content */}
        <div className="w-full space-y-4 flex flex-col justify-between">

          <div className="space-y-2">
            <h1 className="text-xl font-bold leading-tight">
              {batchDetails?.batchName}
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              {batchDetails?.categoryDetails?.title} ({batchDetails?.batchId})
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Targeted for: </span>
              {batchDetails?.categoryDetails?.tags.join(", ")}
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3">
              {batchDetails?.batchFeatures?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 border rounded-lg p-2 shadow-sm text-xs sm:text-sm min-w-0 w-full bg-white"
                  style={{ minHeight: 48 }}
                >
                  <Image
                    src={item.icon}
                    alt={item.feature || 'feature'}
                    width={28}
                    height={28}
                    className="min-w-[28px] min-h-[28px] sm:w-[35px] sm:h-[35px] object-contain"
                  />
                  <span className="capitalize truncate block w-full">{item.feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price + Validity + Enroll */}
          <div className="space-y-4 pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Validity</h2>
              <div className="text-right">
                <p className="text-xl font-bold text-orange-600">
                  ₹{Math.round(selectedValidity?.salePrice)}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ₹{Math.round(selectedValidity?.regularPrice)}
                </p>
                <p className="text-green-600 text-xs font-semibold">
                  ({Math.round(((selectedValidity?.regularPrice - selectedValidity?.salePrice) / selectedValidity?.regularPrice) * 100)}% OFF)
                </p>
              </div>
            </div>

            {/* Validity Tabs */}
            <div className="flex justify-between items-center gap-4 flex-wrap">
              {batchDetails?.validities && batchDetails.validities.length > 1 && batchDetails?.validities.map((validity: any) => (
                <button
                  key={validity.month}
                  onClick={() => setSelectedTab(validity.month)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium ${selectedTab === validity.month
                    ? "bg-orange-500 text-white"
                    : "text-orange-500 border-orange-500 bg-white hover:bg-orange-100"
                    }`}
                >
                  {validity.month} {validity.month === 5 ? "Days" : "Months"}
                  <span className="ml-1 text-xs">/ ₹{validity.salePrice}</span>
                </button>
              ))}{
                batchDetails?.validities && batchDetails.validities.length === 1 && (
                  <button
                    className={`px-4 py-1.5 rounded-full border text-sm font-medium 
                      bg-orange-500 text-white`}
                  >

                    <span className="ml-1 text-xs">{batchDetails.validities[0].month === 24 ? "24 Months" : "Till Exam"}</span>
                  </button>
                )
              }


              {/* Enroll Button */}
              <Button
                onClick={handleOpenPopup}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition cursor-pointer"
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 shadow-lg rounded-2xl p-6 border items-stretch">
        {/* Left Image */}
        <div className="md:w-1/2">
          {batchDetails?.description && (
            <DescriptionWithSeeMore html={batchDetails.description} />
          )}
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 space-y-2">
          <div className={`flex flex-col gap-6`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Book A
                  <span className="text-primary"> Free Demo Session Now</span>
                </CardTitle>
                {/* <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription> */}
              </CardHeader>
              <CardContent>
                <QueryForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Demo Video Section with fullscreen modal logic (restored) */}
    
      {Array.isArray(batchDetails?.demoVideo) && batchDetails.demoVideo.length > 0 && (
        <>
          <div className="w-full max-w-6xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-orange-600 mb-8 text-left drop-shadow-sm">Demo Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {batchDetails?.demoVideo?.map((videoUrl: string, idx: number) => (
                <div
                  key={idx}
                  className="group cursor-pointer w-full max-w-xs mx-auto bg-gradient-to-br from-orange-50 via-white to-orange-100 border border-orange-200 shadow-lg rounded-2xl overflow-hidden flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-2xl"
                  // onClick={() => setShowDemoModal({ open: true, index: idx })}
                >
                  <div className="relative w-full aspect-video bg-black rounded-t-2xl flex items-center justify-center">
                    <CustomVideoPlayer url={videoUrl} autoplay={idx === 100} muted={idx === 0}/>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-black bg-opacity-60 text-white text-4xl rounded-full px-5 py-3 group-hover:bg-orange-500 group-hover:text-white transition">&#9654;</span>
                    </div>
                  </div>
                  <div className="w-full px-4 py-3 flex flex-col items-center">
                    <h3 className="text-base sm:text-lg font-semibold text-orange-600 mb-1">Demo Video {idx + 1}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Fullscreen modal for selected video */}
          {showDemoModal.open && showDemoModal.index !== null && (
            <DemoVideoModal
              open={true}
              onClose={() => setShowDemoModal({ open: false, index: null })}
              videoUrl={batchDetails.demoVideo[showDemoModal.index]}
            />
          )}
        </>
      )}


      {/* Only show login/signin popups if user is NOT logged in */}
      {typeof window !== 'undefined' && !localStorage.getItem("authToken") && (
        <>
          <MobilePopup isOpen={showModal} onClose={() => setShowModal(false)} />
          {/* <ValidityMonths isOpen={showModal} onClose={() => setShowModal(false)} /> */}
        </>
      )}
      {/* Only show Enroll popup if user IS logged in */}
      {typeof window !== 'undefined' && localStorage.getItem("authToken") && (
        <Enroll
          isOpen={showEnroll}
          onClose={() => setShowEnroll(false)}
          batchDetails={batchDetails}
          selectedValidity={selectedValidity}
          selectedTab={selectedTab}
        />
      )}
    </div>
  );
}
