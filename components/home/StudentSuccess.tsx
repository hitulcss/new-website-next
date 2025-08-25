"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsHeartFill } from "react-icons/bs";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentSuccess({
  testimonalData,
}: {
  testimonalData: any;
}) {
  return (
    <section className="bg-[#FDFBF6] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:text-x md:text-2xl font-semibold flex items-center gap-2 font-sans">
          Our Success{" "}
          <span className="text-primary flex items-center gap-2">
            <BsHeartFill size={20} className="mt-1" /> Stories
          </span>
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {testimonalData?.map((testimonal: any, index: number) => (
              <CarouselItem
                key={index}
                className="px-0 md:px-4 basis-full flex justify-center"
              >
                <Card className="w-full max-w-4xl flex flex-col md:flex-row items-center bg-white shadow-lg border-l-8 border-orange-500 rounded-2xl p-2 sm:p-4 md:p-6 ml-4 md:ml-0 mr-2 md:mr-0">
                  {/* Student Image and Info */}
                  <div className="w-full md:w-1/3 flex flex-col items-center mb-4 md:mb-0">
                    <div className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 overflow-hidden rounded-xl border-4 border-orange-200 bg-gray-100 shadow-md mb-2">
                      <Image
                        src={testimonal?.photo}
                        alt="Student"
                        width={128}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs md:text-lg font-bold text-orange-600">
                        {testimonal?.studentName}
                      </p>
                      <p className="text-xs font-semibold text-gray-500">
                        {testimonal?.exam}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <CardContent className="w-full md:w-2/3 text-left md:pl-6 p-0 sm:-ml-0 md:-ml-4 -mt-3 md:-mt-0">
                    <FaQuoteLeft className="text-orange-300 text-3xl mb-2" />
                    <TestimonialMessage message={testimonal?.message} />
                    <FaQuoteRight className="text-orange-300 text-2xl mt-2 float-right" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
}

function TestimonialMessage({ message }: { message: string }) {
  const [expanded, setExpanded] = useState(false);
  const wordLimit = 45;

  const words = message?.split(" ") || [];
  const isLong = words.length > wordLimit;
  const displayText = expanded
    ? message
    : words.slice(0, wordLimit).join(" ") + (isLong ? "..." : "");

  return (
    <div>
      <p className="text-base sm:text-lg text-gray-700 font-medium mb-2 leading-relaxed">
        {displayText}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-orange-600 font-semibold hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
