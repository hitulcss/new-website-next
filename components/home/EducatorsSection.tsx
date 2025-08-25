"use client";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { Play, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import headingUnderline from "@/assets/images/home/heading-underline.png";
import VideoPlayer from "../learning/lecture/VideoPlayer";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";



const DetailModal = ({ educator, onClose, onPlayDemo }: any) => {
  if (!educator) return null;

  // Close modal if user clicks outside the modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white border-(--gray-color) rounded-2xl sm:rounded-3xl shadow-2xl w-xl max-w-xs sm:max-w-2xl md:max-w-3xl p-4 sm:p-6 md:p-10 relative animate-fadeInUp">
        {/* Close Button */}
        <Button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-black text-xl font-bold cursor-pointer bg-transparent shadow-none"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </Button>

        {/* Educator Details Layout */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
          {/* Left: Profile Image */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-(--gray-color) shrink-0">
            <Image
              src={educator.profilePhoto}
              alt={educator.FullName}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right: Details */}
          <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center ">{educator.FullName}<BadgeCheck className="w-4 h-4 text-blue-600 mt-0.5" /></h2>
            <p className="text-sm sm:text-md text-orange-600 font-semibold mt-1">{educator.subject || "Subject"}</p>

            <Button
              onClick={() => onPlayDemo(educator.demoVideo)}
              className="mt-3 sm:mt-4 md:mt-6 bg-orange-600 hover:bg-orange-700 text-white rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm"
            >
              <Play className="w-4 h-4 mr-2" /> Play Demo
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-4 sm:my-6" />

        {/* Experience & Expertise */}
        <div>
          <h3 className="text-base sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 text-center md:text-left">
            Experience & Expertise
          </h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
            {educator.qualification?.split(",").map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 text-green-600 mt-0.5" />
                <span>{item.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const VideoModal = ({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) => {
  if (!videoUrl) return null;

  // Close modal if user clicks outside the modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-xs sm:max-w-2xl md:w-1/3 aspect-video rounded-2xl shadow-lg">
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-white text-black rounded-full px-2 sm:px-3 py-1 text-xl sm:text-2xl font-bold hover:bg-gray-200 transition"
          aria-label="Close"
        >
          ✕
        </Button>
        {/* <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-full rounded-2xl"
        /> */}
        {/* VideoPlayer */}
        <VideoPlayer
          url={videoUrl}
        />
        {/* <iframe
              src={videoUrl.replace("watch?v=", "embed/")}
              title={"Demo Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-md"
            ></iframe> */}
      </div>
    </div>
  );
};

const EducatorsSection = ({ teachersData }: { teachersData: any }) => {
  const [selectedEducator, setSelectedEducator] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <section className="py-12 px-4 sm:px-10 bg-[#fffefb]">
      <h1 className="md:text-3xl font-Semibold sm:font-bold mb-10 -mt-4 ml-2">
        India's top{" "}
        <span className="text-primary relative inline-block">
          Educators
          <Image
            src={headingUnderline}
            width={100}
            height={100}
            alt="underline"
            className="absolute bottom-0 left-0 translate-y-full"
          />
        </span>{" "}
        to learn from
      </h1>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        spaceBetween={24}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="mt-6"
      >
        {teachersData.map((educator: any, index: number) => (
          <SwiperSlide key={index}>
            <Card className="rounded-2xl bg-[#F2F9FF] hover:shadow-xl transition-all duration-300 w-full max-w-xs mx-auto">
              <CardContent
                className="p-4 sm:p-6 flex flex-col items-center text-center h-[140px] xs:h-[180px] sm:h-[200px]"
                style={{
                  background:
                    "linear-gradient(180deg, #fef9e6 0%, #fef9e6 50%, white 50%, #F2F9FF 100%)",
                }}
              >
                <Image
                  src={educator.profilePhoto}
                  width={160}
                  height={160}
                  quality={100}
                  alt={educator.FullName}
                  className="rounded-full object-cover w-[100px] h-[100px] sm:w-[120px] sm:h-[150px] md:w-[160px] md:h-[160px]"
                />

              </CardContent>
              <CardFooter className="flex flex-col items-center justify-center p-3 sm:p-4 space-y-1 sm:space-y-2 bg-white rounded-b-2xl">
                <h3 className="text-base sm:text-lg font-semibold">{educator.FullName}</h3>
                <p className="text-xs sm:text-sm text-red-500 font-medium">{educator.subject[0]}</p>
                <Button
                  onClick={() => setSelectedEducator(educator)}
                  variant="outline"
                  className="rounded-full border border-gray-400 hover:bg-gray-100 cursor-pointer px-4 py-1 sm:px-6 sm:py-2 text-xs sm:text-base"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modals */}
      <DetailModal
        educator={selectedEducator}
        onClose={() => setSelectedEducator(null)}
        onPlayDemo={(url: string) => setVideoUrl(url)}
      />
      <VideoModal videoUrl={videoUrl} onClose={() => setVideoUrl("")} />
    </section>
  );
};

export default EducatorsSection;
