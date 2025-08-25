"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Banner from "@/components/home/Banner";
import YouTubeSection from "@/components/home/YouTubeSection";
import { Card, CardFooter, CardContent, CardTitle } from "@/components/ui/card";
import Questions from "@/assets/images/my-courses/questions.png";
import useFetch from "@/hooks/use-fetch";
import { getBanner, getTodayClasses } from "@/actions/home";
import { useParams } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getAllBatchesAfterLoginApi } from "@/api/Home";

const HomeClient = () => {
  const params = useParams();
  const {
    loading: todayLoading,
    data: todayClasses = [],
    fn: fetchTodayClasses,
  } = useFetch(getTodayClasses);

  console.log("Today Classes:", todayClasses);

  const {
    loading: loadingBanner,
    data: bannerData,
    fn: fnGetBannerData,
  } = useFetch(getBanner);

  const {
    loading: loadingBatch,
    data: batchDetails,
    fn: fnGetAllBatchesDetailsApi,
  } = useFetch(getAllBatchesAfterLoginApi);
  // getAllBatchesDetailsApi
  // Fetch today's classes on mount
  useEffect(() => {
    todayClassesLoad();
    getBannerData();
    getBatchClasses();
  }, []);

  async function todayClassesLoad() {
    await fetchTodayClasses();
    // console.log("Today Classes API response:", res);
  }

  async function getBatchClasses() {
    await fnGetAllBatchesDetailsApi({
      categorySlug: "school-entrance-exams",
      limit: 100,
    });
  }
  console.log("Batch Details:", batchDetails);
  async function getBannerData() {
    await fnGetBannerData();
  }

  // console.log(todayClasses,"today classes");
  return (
    <section className="space-y-8">
      <section className="">
        {/* Banner */}
        {bannerData && <Banner bannerData={bannerData} />}
      </section>

      {/* Today Classes Section */}
      <section className="px-4 md:px-2">
        <div className="border rounded-xl shadow bg-white">
          <div className="border-b px-4 py-4">
            <h2 className="text-2xl font-bold text-black">Today’s Classes</h2>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="p-4">
              {todayLoading ? (
                <div>Loading...</div>
              ) : todayClasses.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-start">
                  {todayClasses.map((cls: any, idx: number) => {
                    // Calculate duration from starting_time and ending_time if not present
                    let duration = cls?.duration;
                    if (!duration && cls?.starting_time && cls?.ending_time) {
                      const [startH, startM] = cls.starting_time.replace(' PM', '').split(':').map(Number);
                      const [endH, endM] = cls.ending_time.replace(' PM', '').split(':').map(Number);
                      let mins = (endH * 60 + endM) - (startH * 60 + startM);
                      let hours = Math.floor(mins / 60);
                      mins = mins % 60;
                      duration = `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
                    }
                    return (
                      <Link
                        href={`/learning/live-lecture?lectureId=${cls?._id}&batchSlug=${cls?.batchDetails?.batchSlug}&subjectName=${cls?.lecture_title || ''}`}
                        key={idx}
                        className="group min-w-[260px] max-w-[260px] w-[260px] bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                      >
                        <div className="relative w-full aspect-[16/9] bg-gray-100 flex items-center justify-center">
                          <img
                            src={cls?.banner || cls?.teacher?.profilePhoto || '/default-class.png'}
                            alt={cls?.lecture_title || 'Class Banner'}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">Live</span>
                        </div>
                        <div className="flex flex-col gap-1 p-4 flex-1">
                          <div className="flex items-center text-xs text-gray-500 mb-1 gap-2">
                            <span className="flex items-center gap-1">
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 2"/></svg>
                              {duration || '0h 00m'}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 2v2M8 2v2M3 10h18M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/></svg>
                              {cls?.starting_time || '00:00'}
                            </span>
                          </div>
                          <hr className="my-2 border-gray-200" />
                          <div className="flex flex-row items-center justify-between gap-2 w-full">
                            <div className="flex flex-col flex-grow min-w-0 pr-2">
                              <div className="font-bold text-sm text-gray-800 truncate mb-0.5 max-w-full">
                                {cls?.lecture_title || ''}
                              </div>
                              <div className="text-xs text-gray-600 mb-0.5 truncate max-w-full">
                                Subject: <span className="font-medium">{cls?.subject?.title || ''}</span>
                              </div>
                              <div className="text-xs text-gray-600 mb-0.5 truncate max-w-full">
                                By: <span className="text-orange-600 font-medium">{cls?.teacher?.FullName || ''}</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0 flex items-center justify-end ml-2">
                              <Button className=" from-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-110 hover:from-orange-600 hover:to-orange-500 transition-all duration-200 cursor-pointer">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-gray-500">
                  No classes scheduled for today.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offering Courses */}

      <section className="px-4 md:px-2">
        <div className="border rounded-xl shadow bg-white">
          <div className="border-b px-4 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">
              Offering Courses for School Entrance Exams
            </h2>
            {batchDetails && batchDetails.length > 10 && (
              <Link
                href="/courses"
                className="text-orange-600 hover:underline text-sm md:text-base"
              >
                View all
              </Link>
            )}
          </div>
          {batchDetails ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {batchDetails?.data?.batches.map((batch: any, index: number) => {
                // Find the matched category for this batch if needed
                let matchedCategory = null;
                if (batchDetails?.categories && Array.isArray(batchDetails.categories)) {
                  matchedCategory = batchDetails.categories.find((cat: any) =>
                    cat?.slug && batch?.categorySlug && cat.slug === batch.categorySlug
                  );
                }
                // fallback: if not found, use first category or empty string
                if (!matchedCategory && batchDetails?.categories && batchDetails.categories.length > 0) {
                  matchedCategory = batchDetails.categories[0];
                }
                return (
                  <div
                    key={index}
                    className="w-full rounded-[12px] border border-gray-300 shadow-md p-2 "
                  >
                    {/* Top tags row: language left, batch id right */}
                    <div className="flex justify-between items-center mb-2">
                      <span className={
                        batch?.language === "en"
                          ? "bg-gradient-to-r from-red-600 to-red-200 text-[10px] sm:text-xs font-bold px-2 py-1 rounded shadow-md uppercase tracking-wide"
                          : "bg-gradient-to-r from-green-600 to-green-200 text-[10px] sm:text-xs font-bold px-2 py-1 rounded shadow-md uppercase tracking-wide"
                      }>
                        {batch?.language === "en" ? "English" : "Hinglish"}
                      </span>
                      <span className="bg-blue-900 text-white text-xs font-bold px-2 py-1 shadow-md uppercase tracking-wide">
                        {batch?.batchId}
                      </span>
                    </div>
                    <img
                      src={batch?.banner ?? ""}
                      alt="Batch"
                      className="w-full rounded-t-[12px]"
                    />
                    <hr className="mb-3" />
                    {/* Truncate batch name + batch id to 50 chars, show ... if longer, as in courses-tabs.tsx */}
                    <h4 className="text-gray-500 flex justify-center font-bold ">
                      {(() => {
                        const nameWithId = `${batch?.batchName}-${batch?.batchId}`;
                        return nameWithId.length > 40 ? nameWithId.slice(0, 40) + '...' : nameWithId;
                      })()}
                    </h4>

                    <div className="flex justify-between gap-2 mt-3">
                      <Link
                        className="w-full"
                        href={`/${batch?.category?.slug}/${batch?.batchSlug || ''}`}
                      >
                        <Button className="w-full h-[46px] rounded-[6px] border border-[#FF3D00] bg-white text-[#FF3D00] font-medium cursor-pointer">
                          Explore
                        </Button>
                      </Link>
                      <Link
                        className="w-full"
                        href={`/${batch?.category?.slug}/${batch?.batchSlug || ''}`}
                      >
                        <Button className="w-full h-[46px] cursor-pointer rounded-[6px] border border-[#FF3D00] bg-[#FF3D00] text-white font-medium">
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-500 p-5">
              No classes scheduled for today.
            </div>
          )}

          {/* Content */}
          <div className="p-4">{/* Add your course cards here */}</div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="px-4 md:px-2">
        <div className="border rounded-xl shadow bg-white">
          {/* Styled Heading */}
          <div className="border-b px-4 py-4">
            <h2 className="text-2xl font-bold text-black">
              SD Campus YouTube Channels
            </h2>
          </div>

          {/* Content */}
          <div className="p-4">
            <YouTubeSection />
            {/* Optional bottom color strip */}
            {/* <div className="h-1 mt-4 bg-[#a855f7] rounded" /> */}
          </div>
        </div>
      </section>

      {/* Help & Social */}
      <section className="px-4 md:px-2 flex flex-col md:flex-row gap-4 py-2">
        {/* Help Box */}
        <div className="flex-1 rounded-xl p-2 bg-white border shadow-md flex flex-col md:flex-row items-center justify-between px-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Need Our Help?</h3>

            <a
              href="tel:+918130700157"
              className="flex items-center justify-center gap-3 text-orange-600 border border-orange-500 px-5 py-3 rounded-lg w-60 mb-3 font-medium text-base hover:shadow transition"
            >
              <FaPhoneAlt className="text-xl" />
              Call +918130700157 / 8130700156
            </a>

            <a
              href="https://wa.me/917428394524"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 from bg-orange-600 text-white px-4 py-3 rounded-lg w-60 font-medium text-base hover:shadow transition"
            >
              <FaWhatsapp className="text-xl" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="w-32 h-32 mt-6 md:mt-0">
            <Image
              src={Questions}
              alt="Support"
              width={128}
              height={128}
              className="object-conver"
            />
          </div>
        </div>

        {/* Social Box */}
        <div className="flex-1 min-h-[140px] p-4 border rounded-xl shadow bg-white flex flex-col justify-center">
          <h3 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-8">
            Join Us On
          </h3>
          <div className="flex gap-4">
            {[
              {
                icon: FaFacebookF,
                color: "text-blue-600",
                link: "https://www.facebook.com/sdcampus1?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp",
              },
              {
                icon: FaInstagram,
                color: "text-pink-500",
                link: "https://www.instagram.com/sd_campus/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp",
              },
              {
                icon: FaLinkedinIn,
                color: "text-blue-700",
                link: "https://www.linkedin.com/company/sd-campus/",
              },
              {
                icon: FaTelegramPlane,
                color: "text-sky-400",
                link: "https://t.me",
              },
              {
                icon: FaXTwitter,
                color: "text-black",
                link: "https://x.com/SdCampus?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp",
              },
            ].map(({ icon: Icon, color, link }, i) => (
              <a
                title={link}
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white shadow-md border-[#eee] rounded-full flex items-center justify-center hover:scale-105 transition"
              >
                <Icon className={`text-4xl ${color}`} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomeClient;
