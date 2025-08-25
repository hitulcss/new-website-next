"use client";
import * as React from "react";
import Image from "next/image";
import QueryFormImg from "@/assets/images/home/books/book-demo.png";
import QueryForm from "./QueryForm";
import { Card, CardContent } from "@/components/ui/card";
import Avtar1 from "@/assets/images/books/queryFormStudents/image.png";
import Avtar2 from "@/assets/images/books/queryFormStudents/image1.png";
import Avtar3 from "@/assets/images/books/queryFormStudents/image2.png";
import Avtar4 from "@/assets/images/books/queryFormStudents/image3.png";
export default function FormSection() {
  return (
    <section className="px-2 sm:px-6 py-10 bg-[#FFFBEF] w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-3 items-center">
        {/* Form Section */}
      
        <Card className="w-full md:w-1/2 rounded-lg border-none p-0 flex flex-col justify-between">
          <CardContent className="p-0 flex flex-col items-center text-center">
            <Image
              src={QueryFormImg}
              alt="Happy students learning"
              className="object-cover"
              priority
            />
          </CardContent>
        </Card>
        <Card className="w-full  items-center md:w-1/2 rounded-xl border-none bg-white shadow p-6 flex flex-col justify-between">
          <CardContent className="p-0 flex flex-col items-center text-center">
            <h2 className="font-bold md:text-2xl sm:text-xl mb-6">
              Book a <span className="text-orange-600">FREE Demo </span>{" "}
               session now
            </h2>
            <div className="w-full">
              <QueryForm />
            </div>
            {/* Enrolled Students Row */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex -space-x-2">
                <Image
                  src={Avtar4}
                  alt="Student 1"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src={Avtar1}
                  alt="Student 2"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src={Avtar2}
                  alt="Student 3"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src={Avtar3}
                  alt="Student 4"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <span className="text-gray-700 text-xs sm:text-sm font-medium whitespace-nowrap">
                1 Millions+ Students Already Attended Demo
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Image Section */}
        {/* <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative aspect-[4/3] w-full max-w-[420px] rounded-lg overflow-hidden shadow">
            <Image
              src={QueryFormImg}
              alt="Happy students learning"
              
              className="object-cover"
              priority
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
