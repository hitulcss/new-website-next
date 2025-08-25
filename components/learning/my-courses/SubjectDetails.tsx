"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { FileText, Eye } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import useFetch from "@/hooks/use-fetch";
import { subjectDetailsAPI } from "@/api/subjectDetails";
import { sub } from "date-fns";

const SubjectDetails = () => {
    const [activeTab, setActiveTab] = useState<"lecture" | "note">("lecture")
    const [lectureData, setLectureData] = useState<any[]>([])
    const searchParams = useSearchParams();
    const subjectId = searchParams.get('subjectId') as string;
    const batchSlug = searchParams.get('batchSlug') as string;
    const subjectName = searchParams.get('subjectName') as string;
    const { loading, data: lecturesData, fn: fnGetLeactures } = useFetch(subjectDetailsAPI);

    // const lectures = await congetLecturesOfSubject(subjectId, batchSlug);

    useEffect(() => {
        async function fetchLectures() {

            await fnGetLeactures(subjectId, batchSlug);
        }

        fetchLectures()
    }, [])

    console.log(lecturesData,"lecture data");


    return (
        <div className="p-6 space-y-6">
            {/* Title */}
            <div className="content-wrapper bg-white p-4 border rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">{subjectName || "Lecture Title"}</h1>
            </div>

            <hr className="border-gray-300" />

            {/* Tabs */}
            <div className="flex gap-4 border-b pb-2">
                {["lecture", "note"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as "lecture" | "note")}
                        className={`capitalize px-4 py-2 text-sm font-medium rounded-t-md transition-all ${activeTab === tab
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Lecture Tab */}
            {activeTab === "lecture" && (
                <Card>
                    <CardHeader className="bg-gray-100 text-gray-800 font-semibold">
                        <h2>Lecture Videos</h2>
                    </CardHeader>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {lecturesData?.lectures?.data.map((lecture:any, index:number) => (
                            <Link
                            // href={`/my-courses/subject/${subject.slug}`}
                            href={`/learning/live-lecture?lectureId=${lecture._id}&batchSlug=${batchSlug}&subjectName=${subjectName}`}
                            key={index}
                            className="subject-box bg-white shadow rounded-lg hover:shadow-md transition-all duration-300">
                                
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 shadow-md p-2"
                            >
                                <img
                                    src={lecture.banner}
                                    alt={lecture.lectureTitle}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <h3 className="text-md text-gray-800 font-semibold mt-2 text-center">
                                    {lecture.lectureTitle}
                                </h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-gray-500">
                                        {lecture.starting_date}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {lecture.duration} mins
                                    </span>
                                    </div>
                                <hr className="my-2" />
                                { lecture?.teacher && (
                                <h4 className="text-gray-800 flex justify-left font-bold ">
                                By : { lecture?.teacher?.name }
                                </h4>
                                )}
                                
                                <button
                                    // href={`/learning/live-lecture`}
                                    className="block w-full mt-3 bg-orange-600 text-white text-center py-2 rounded-md hover:bg-orange-700 transition"
                                >
                                    Study
                                </button>

                            </div>
                            </Link>
                        ))}
                    </div>
                </Card>
            )}

            {/* Notes Tab */}
            {activeTab === "note" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lecturesData?.notes?.data.map((item:any, idx:number) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow-md border space-y-4 w-full"
                        >
                            <h1 className="text-xl font-bold text-gray-800">
                                {item.title}
                            </h1>
                            <hr className="border-gray-200" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-red-100 text-red-600 p-2 rounded-full">
                                        <FileText size={24} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-700 font-medium">
                                            {item?.res[0]?.resource_title || "Untitled Note"}
                                        </span>
                                        <span className="text-sm text-gray-500">{item?.res[0]?.file?.fileSize}</span>
                                    </div>
                                </div>

                                <button
                                    className="flex items-center gap-2 px-4 py-2 text-orange-500 text-sm rounded-md transition"
                                    onClick={() =>
                                        window.open(`${item?.res[0]?.file?.fileLoc}`, "_blank")
                                    }
                                >
                                    <Eye size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SubjectDetails;
