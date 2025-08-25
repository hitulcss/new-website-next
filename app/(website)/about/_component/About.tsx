"use client";
import React from "react";
import Image from "next/image";

const WhatWeOfferSection = () => {
  const timeline = [
    { date: "Jan 2018", event: "SD Campus Started", detail: "We launched our first offline center." },
    { date: "Nov 2018", event: "SD Publication Founded", detail: "We officially started SD Publication." },
    { date: "July 2019", event: "First Book Launched", detail: "Our first book was published under SD Publication." },
    { date: "Aug 2020", event: "Expansion to Delhi", detail: "We expanded our offline centers to Delhi." },
    { date: "2021", event: "BhatiyaMod Center Opened", detail: "A new offline center was established in BhattaMod." },
    // { date: "Dec 2021", event: "App Development Started", detail: "Initiated work on our own learning platform app for competitive exams." },
    { date: "May 2023", event: "YouTube Channel Launched", detail: "Launched a dedicated YouTube channel for competitive exam preparation." },
    { date: "Oct 2023", event: "SD Campus App Launched", detail: "Released our official SD Campus mobile application." },
    { date: "Jan 2024", event: "Sainik/JNV/RMS Batches Started", detail: "Specialized batches for Sainik School, JNV, and RMS entrance exams." },
    { date: "2024", event: "UP Police Radio Operator Batch Launched", detail: "New batch for UP Police Radio Operator exam launched." },
    { date: "May 2025", event: "My Tuition Classes YouTube Channel", detail: "Launched a new YouTube channel named 'My Tuition Classes' under SD Campus." },
  ];

  return (
    <section className="px-6 lg:px-20 py-10 bg-white flex flex-col gap-20">
      {/* About Us Section */}
      <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
        <div className="flex items-start gap-4 mb-4">
          <Image src="/logo.png" alt="About Icon" width={40} height={40} />
          <h2 className="text-4xl font-bold text-orange-600">About Us</h2>
        </div>
        <p className="text-gray-800 mb-4 text-lg">
          <strong>SD Empire</strong> began its journey in <strong>2018</strong> with <strong>SD Campus</strong> and <strong>SD Publication offline centers</strong>, driven by a vision to transform education through academic excellence and holistic development. Dedicated to <strong>nurturing future leaders with integrity and dedication</strong>, SD Empire has grown into a beacon of hope for students across India.
        </p>
        <p className="text-gray-800 mb-4 text-lg">
          In <strong className="text-red-600">2024, SD Campus</strong> expanded into the digital realm, breaking barriers of geography and accessibility. Supported by <strong>a passionate team of experts</strong>, SD Empire stands by its motto: <strong>"Our Efforts & Your Success"</strong> emphasizing the organization's commitment to every student's journey.
        </p>
        <p className="text-gray-800 mb-2 text-lg"><strong>SD Empire thrives on two strong segments:</strong></p>

        <ol className="text-gray-800 pl-8 list-decimal space-y-4 text-lg">
          <li className="pl-2">
            <strong>SD Campus:</strong>
            <span className="block pl-6 mt-1 text-gray-800">
              A dynamic Ed-Tech platform specializing in preparing students for <strong>School Entrance Exams (Sainik, JNV)</strong> & <strong>Tuition Classes</strong>. SD Campus <strong>leverages innovative teaching methods and technology to redefine the future of education.</strong>
            </span>
          </li>
          <li className="pl-2">
            <strong>SD Publication:</strong>
            <span className="block pl-6 mt-1 text-gray-800">
              A trusted name in educational publishing, offering <strong>600+ titles</strong> in the form of eBooks & Printed Copy for exams like <strong>SSC, DSSSB, KVS, NVS, TETs, UPSC, State PCS, Defence Exams, and school entrance exams such as Sainik, JNV, RIMC, RMS, and CHS.</strong> These are available across <strong>India</strong> through offline and online platforms, including <strong>websites, apps, and e-marketplaces.</strong>
            </span>
          </li>
        </ol>
      </div>

      {/* Our Journey Section */}
      <div className="border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-6 top-12 w-1 bg-red-600 h-full z-0" />
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start mb-12 relative z-10">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 flex items-center justify-center rounded-full border-8 border-gray-100 text-red-600 font-bold text-2xl bg-white shadow">
                  {index + 1}
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500 mb-1">
                  {item.date}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.event}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
