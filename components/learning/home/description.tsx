"use client";
import React, { useState } from "react";
import Image from "next/image";
import EducatorsSection from "@/components/home/EducatorsSection";

const MyCourses: React.FC = () => {
    const [activeTab, setActiveTab] = useState<
        "info" | "Resources" | "Demo Video" | "Top Educators"
    >("info");

    const tabs: typeof activeTab[] = [
        "info",
        "Resources",
        "Demo Video",
        "Top Educators",
    ];

    const teachersData = [
        {
            id: 1,
            name: "Sanjay Sir",
            qualification: "M.Sc. (CSB, M University, Kanpur)",
            profilePhoto: "/images/home/teachers/sanjay.png",
            experience: 4,
            
        },
        {
            id: 2,
            name: "Sechin Sir",
            qualification: "M.Sc. (CSB, M University, Kanpur)",
            profilePhoto: "/images/home/teachers/sachin.png",
            experience: 4,
        },
        {
            id: 3,
            name: "Juhi Ma'am",
            qualification: "M.Sc. (CSB, M University, Kanpur)",
            profilePhoto: "/images/home/teachers/juhi.png",
            experience: 4,
        },
        {
            id: 4,
            name: "Mannu Sir",
            qualification: "M.Sc. (CSB, M University, Kanpur)",
            profilePhoto: "/images/home/teachers/mannu.png",
            experience: 4,
        },
        {
            id: 5,
            name: "Amit Sir",
            qualification: "M.Sc. (CSB, M University, Kanpur)",
            profilePhoto: "/images/home/teachers/amit.png",
            experience: 4,
        },
    ];

    return (
        <div className="p-4 space-y-6">
            {/* Heading */}
            <div className="content-wrapper">
                <h1 className="text-2xl font-bold text-gray-800">
                    SHAKTI Batch for Sainik School
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-4 border-b pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`capitalize px-4 py-2 rounded-t-md text-sm font-medium transition-all ${
                            activeTab === tab
                                ? "bg-orange-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Info Tab */}
            {activeTab === "info" && (
                <div className="space-y-8">
                    {/* Image Box */}
                    <div className="w-[661px] h-[371px] rounded-[8px] border overflow-hidden">
                        <Image
                            src="/placeholder-image.jpg"
                            alt="Course Preview"
                            width={661}
                            height={371}
                            className="object-cover"
                        />
                    </div>

                    {/* Description Section */}
                    <div className="w-[665px] h-[468px] border rounded-[8px] p-4 space-y-4">
                        <h1 className="text-xl font-semibold">Description</h1>
                        <hr />
                        <p className="text-sm">
                            The best faculties in India will cover the full syllabus of each
                            subject General Awareness Reasoning Ability...{" "}
                            <span className="text-blue-600 cursor-pointer">See More</span>
                        </p>

                        {/* 4 Info Boxes */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            {["Batch Starts On", "Duration", "Recorded Classes", "Download"].map((item, index) => (
                                <div
                                    key={index}
                                    className="w-[151px] h-[46px] flex items-center justify-center border rounded-[6px] bg-gray-100 text-sm"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Free Demo Videos Section */}
                    <div className="w-[661px] h-[343px] border rounded-[8px] p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold">Free Demo Videos</h1>
                            <div className="space-x-4">
                                <button className="text-lg font-bold">&lt;</button>
                                <button className="text-lg font-bold">&gt;</button>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            {[1, 2].map((num) => (
                                <div
                                    key={num}
                                    className="w-[297px] h-[227px] border rounded-[12px] p-4 space-y-2"
                                >
                                    <div className="w-full h-[150px] bg-gray-200 rounded" />
                                    <p className="text-sm">
                                        Introduction & International Organisation Demo-{num}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Resources Tab */}
            {activeTab === "Resources" && (
                <div className="w-[661px] h-[542px] border rounded-[8px] p-4 space-y-6">
                    <h1 className="text-xl font-semibold">Study</h1>
                    <hr />

                    <div className="grid grid-cols-3 gap-6">
                        {[
                            { label: "Classes", img: "/images/class.png" },
                            { label: "Quiz", img: "/images/quiz.png" },
                            { label: "DPPs", img: "/images/dpp.png" },
                            { label: "Notes", img: "/images/notes.png" },
                            { label: "Doubt", img: "/images/doubt.png" },
                            { label: "Community", img: "/images/community.png" },
                            { label: "Announcement", img: "/images/announcement.png" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center border rounded-lg p-4"
                            >
                                <div className="w-12 h-12 mb-2">
                                    <Image
                                        src={item.img}
                                        alt={item.label}
                                        width={48}
                                        height={48}
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm text-gray-700">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Demo Video Tab */}
            {activeTab === "Demo Video" && (
                <div className="flex flex-col items-center space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold underline decoration-orange-500 underline-offset-4">
                            Free Demo Videos
                        </h1>
                    </div>

                    <div className="w-[661px] h-[371px] border rounded-[8px] overflow-hidden">
                        <video
                            width="100%"
                            height="100%"
                            controls
                            className="rounded-[8px] w-full h-full object-cover"
                        >
                            <source src="/videos/demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

            {/* Top Educators Tab */}
            {activeTab === "Top Educators" && (
                <div className="mt-6">
                    <EducatorsSection teachersData={teachersData} />
                </div>
            )}
        </div>
    );
};

export default MyCourses;
