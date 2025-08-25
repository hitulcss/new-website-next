import Image from "next/image";
import { Card } from "@/components/ui/card";
import { FaUserGraduate, FaVideo, FaClipboardCheck, FaYoutube } from "react-icons/fa";

export default function OurImpactSection() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-14 px-4">
      <div className="mb-10 text-left text-x md:text-2xl font-semibold px-6 -ml-3 md:-ml-0" style={{ fontFamily: 'inherit' }}>
        Where Students Trust,<span className="text-primary"> Learning Thrives</span>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto"
      >
        {/* Happy Students */}
        <Card className="relative flex flex-col items-center justify-center p-8 sm:p-10 min-w-0 w-full bg-gradient-to-br from-[#FF3D00] to-[#FFAA00] shadow-lg rounded-3xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group min-h-[220px] sm:min-h-[240px] overflow-hidden mx-auto">

          {/* Background Icon - pushed lower and smaller */}
          <span className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 text-6xl text-white drop-shadow-lg z-10 mix-blend-luminosity">
            <FaUserGraduate />
          </span>

          {/* Big Number */}
          <p className="text-yellow-100 text-4xl sm:text-5xl font-black mb-2 tracking-tight z-20 transition-all duration-500 opacity-80 group-hover:-translate-y-6 group-hover:opacity-100 group-hover:text-white text-center">
            150K+
          </p>

          {/* Description */}
          <p className="text-yellow-100 text-base font-semibold z-20 transition-all duration-500 opacity-80 group-hover:translate-y-6 group-hover:opacity-100 group-hover:text-white text-center whitespace-pre-line">
            Registered Students
          </p>
        </Card>

        {/* Video Lectures */}
        <Card className="relative flex flex-col items-center justify-center p-8 sm:p-10 min-w-0 w-full bg-[#FF3D00] shadow-lg rounded-3xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group min-h-[220px] sm:min-h-[240px] overflow-hidden mx-auto">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 text-7xl text-yellow-200 drop-shadow-lg z-10 mix-blend-luminosity">
            {/* <FaVideo /> */}
            < FaYoutube />
          </span>
          <p className="text-yellow-100 text-4xl sm:text-5xl font-black mb-2 tracking-tight z-20 transition-all duration-500 opacity-80 group-hover:-translate-y-6 group-hover:opacity-100 group-hover:text-white text-center">
            180K+
          </p>
          <p className="text-yellow-100 text-base font-semibold z-20 transition-all duration-500 opacity-80 group-hover:translate-y-6 group-hover:opacity-100 group-hover:text-white text-center whitespace-pre-line">Subscribers</p>
        </Card>
        {/* Free Tests */}
        <Card className="relative flex flex-col items-center justify-center p-8 sm:p-10 w-full bg-gradient-to-br from-[#FF3D00] to-[#FFAA00] shadow-lg rounded-3xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group min-h-[220px] sm:min-h-[240px] overflow-hidden mx-auto">

          {/* Background Icon */}
          <span className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 text-7xl text-green-200 drop-shadow-lg z-10 mix-blend-luminosity">
            <FaClipboardCheck />
          </span>

          {/* One-line Heading */}
          <p className="text-yellow-100 text-4xl sm:text-5xl font-black mb-2 tracking-tight z-20 transition-all duration-500 opacity-80 group-hover:-translate-y-6 group-hover:opacity-100 group-hover:text-white text-center whitespace-nowrap leading-tight">
            8+ Years
          </p>

          {/* Subtext */}
          <p className="text-yellow-100 text-base font-semibold z-20 transition-all duration-500 opacity-80 group-hover:translate-y-6 group-hover:opacity-100 group-hover:text-white text-center whitespace-pre-line">
            In the Education Industry
          </p>
        </Card>

        {/* YT Content */}
        <Card className="relative flex flex-col items-center justify-center p-8 sm:p-10 min-w-0 w-full bg-[#FF3D00] shadow-lg rounded-3xl border-0 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group min-h-[220px] sm:min-h-[240px] overflow-hidden mx-auto">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 text-7xl text-yellow-200 drop-shadow-lg z-10 mix-blend-luminosity">
            <FaVideo />
          </span>
          <p className="text-yellow-100 text-4xl sm:text-5xl font-black mb-2 tracking-tight z-20 transition-all duration-500 opacity-80 group-hover:-translate-y-6 group-hover:opacity-100 group-hover:text-white text-center">
            100%
          </p>
          <p className="text-yellow-100 text-base font-semibold z-20 transition-all duration-500 opacity-80 group-hover:translate-y-6 group-hover:opacity-100 group-hover:text-white text-center whitespace-pre-line">Satisfaction Rate</p>
        </Card>
      </div>
    </section>
  );
}
