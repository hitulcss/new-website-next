"use client";
import React, { useState, useEffect } from "react";
import WeeklyTestPage from "@/components/learning/quiz/quiz";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { formatDistanceToNowStrict, parseISO, isValid } from "date-fns";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import {
  getMyCoursesByBatch,
  getSubjectOfBatch,
  getBatchDoubt,
  getQuizzDetailsByBatchId,
  getBatchCommunities,
  getAnnouncementsByBatch,
  createBatchDoubtComment,
  createDoubt,
} from "@/actions/home";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMyDoubtApi } from "@/api/Home";

import DoubtsImg from "@/assets/images/my-courses/doubt.png";
import Image from "next/image";
import { AskQuestionForm } from "./AskQuestionForm";
interface PaidCoursesDetailsProps {
  batchSlug: string;
}

const PiadCoursesDetails = ({ batchSlug }: PaidCoursesDetailsProps) => {
  const [activeTab, setActiveTab] = useState<
    "info" | "lecture" | "doubt" | "quiz" | "announcement"
  >("info");
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showAskPopup, setShowAskPopup] = useState(false);

  // Fetch hooks for each API
  const {
    data: lectureDetails,
    fn: fetchLectureDetails,
    loading: loadingLecture,
  } = useFetch(getMyCoursesByBatch);
  const {
    data: subjectDetails,
    fn: fetchSubjectDetails,
    loading: loadingSubjects,
  } = useFetch(getSubjectOfBatch);
  const {
    data: batchDoubts,
    fn: fetchBatchDoubts,
    loading: loadingDoubts,
  } = useFetch(getBatchDoubt);

  const {
    data: myDoubts,
    fn: fnGetMydoubts,
    loading: loadingMyDoubts,
  } = useFetch(getMyDoubtApi);
  const {
    data: quizDetails,
    fn: fetchQuizDetails,
    loading: loadingQuiz,
  } = useFetch(getQuizzDetailsByBatchId);
  const {
    data: batchCommunities,
    fn: fetchBatchCommunities,
    loading: loadingCommunities,
  } = useFetch(getBatchCommunities);
  const {
    data: announcements,
    fn: fetchAnnouncements,
    loading: loadingAnnouncements,
  } = useFetch(getAnnouncementsByBatch);

  const {
    data: dataCreated,
    fn: fnCreateDoubts,
    loading: creatingDoubt,
  } = useFetch(createDoubt);

  const [comment, setComment] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoubtId, setSelectedDoubtId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const paramDetails = { batchSlug };
        const lecture = (await fetchLectureDetails(paramDetails)) as any;
        await Promise.all([
          fetchSubjectDetails(paramDetails),
          fetchAnnouncements(paramDetails),
        ]);
      } catch (err) {
        console.error("Failed to fetch batch details", err);
      }
    };

    fetchAll();
  }, [batchSlug]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = [];

        if (lectureDetails?.batchId) {
          const batchParamDetails = {
            batchId: lectureDetails.batchId,
            page: 1,
            pageSize: 10,
          };

          promises.push(fetchBatchDoubts(batchParamDetails));
          promises.push(fnGetMydoubts(batchParamDetails));
          promises.push(fetchQuizDetails(batchParamDetails));
          promises.push(fetchBatchCommunities(batchParamDetails));
        }

        await Promise.all(promises);
      } catch (err) {
        console.error("Failed to fetch batch details", err);
      }
    };

    fetchAll();
  }, [lectureDetails]);

  useEffect(() => {
    if (dataCreated) {
      console.log(dataCreated, "docubt creation response");
    }
  }, [dataCreated]);

  const handleSubmitComment = async () => {
    if (!selectedDoubtId || !comment.trim()) return;
    // Add message to chat box
    setChatMessages((prev) => [...prev, comment]);
    setComment("");
    await fnCreateDoubts({
      batchDoubtId: selectedDoubtId,
      msg: comment,
    });
  };

  const handleSubmit = async (values: any) => {
    // Build payload for createDoubt API
    const payload = {
      batchId: lectureDetails?.batchId,
      lectureId: values.lectureId,
      subjectId: values.subject,
      desc: values.description,
      file: values.attachment || null,
    };
    await fnCreateDoubts(payload).then(() => {
      // Refresh doubts after submission
      if (lectureDetails?.batchId) {
        const batchParamDetails = {
          batchId: lectureDetails.batchId,
          page: 1,
          pageSize: 10,
        };
        Promise.all([
          fetchBatchDoubts(batchParamDetails),
          fnGetMydoubts(batchParamDetails)
        ]);
      }
      setShowAskPopup(false);
    });
  };

  console.log(lectureDetails, "lectureDetails");
  console.log(subjectDetails, "subjectDetails");
  console.log(batchDoubts, "batchDoubts");
  console.log(quizDetails, "quizDetails");
  console.log(batchCommunities, "batchCommunities");
  console.log(myDoubts, "My Doubts");

  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [showWeeklyTest, setShowWeeklyTest] = useState(false);

  const handleQuizButtonClick = (quiz: any) => {
    if (!quiz.is_attempted) {
      setSelectedQuiz(quiz);
      setShowQuizPopup(true);
    } else {
      console.log("Viewing quiz...");
    }
  };
  const handleGoFullScreen = () => {
    setShowQuizPopup(false);
    setShowWeeklyTest(true);
  };

  const tabs: (typeof activeTab)[] = [
    "info",
    "lecture",
    "doubt",
    "quiz",
    "announcement",
  ];
  return (
    <div className="p-4 space-y-6">
      {/* Heading */}
      <div className="content-wrapper">
        <h1 className="text-2xl font-bold text-gray-800">
          {lectureDetails?.batchName || "Batch Details"}
          <span className="text-orange-500">
            {" "}
            - {lectureDetails?.batchType || "Paid"}
          </span>
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2  cursor-pointer rounded-t-md text-sm font-medium transition-all ${activeTab === tab
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
        <div>
          <div className="info_wrapper space-y-4">
            <div className="info_upper">
              <h2 className="text-xl font-semibold text-gray-800">
                Course Description
              </h2>
              <div className="LAPTOP-btn mt-4">
                {/* <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-amber-600">
                hhh
              </button> */}
              </div>
            </div>
          </div>

          <Card>
            <div className="flex items-center justify-between p-4">
              <h1>Today's Lectures</h1>
            </div>

            {lectureDetails?.todayLectures && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lectureDetails?.todayLectures.map(
                  (lecture: any, index: number) => (
                    <div
                      key={index}
                      className="w-full rounded-[12px] border border-gray-300 shadow-md p-2"
                    >
                      <img
                        src={lecture?.banner ?? ""}
                        alt="lecture"
                        className="w-full rounded-t-[12px]"
                      />
                      <hr className="mb-3" />
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-800 font-bold">
                          <span className="inline-block mr-1 text-gray-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 00.553.894l2 1a1 1 0 10.894-1.788L11 10.382V7z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span className="text-gray-600">
                            {lecture?.duration} Minutes
                          </span>
                        </h4>
                        <h4 className="text-gray-800 font-bold">
                          <span className="inline-block w-5 h-5 text-gray-800 mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="w-5 h-5"
                            >
                              <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.1a6.5 6.5 0 016.9-10V6a2 2 0 00-2-2zm0 14a4.5 4.5 0 104.5 4.5A4.5 4.5 0 0019 18zm.75-2.5v2.25l1.75 1.05-.75 1.25-2.5-1.5V15.5h1.5zM19 20a2 2 0 112-2 2 2 0 01-2 2zM5 8h14v2H5zm0 4h6v2H5zm0 4h4v2H5z" />
                            </svg>
                          </span>
                          <span className="text-gray-600">
                            {lecture?.starting_time}
                          </span>
                        </h4>
                      </div>
                      {lecture?.teacher && (
                        <h4 className="text-gray-800 flex justify-center font-bold ">
                          By : {lecture?.teacher?.name}
                        </h4>
                      )}

                      <div className="flex justify-between gap-2">
                        <Link
                          className="w-full"
                          href={`/learning/live-lecture?lectureId=${lecture._id}&batchSlug=${lectureDetails?.slug}&subjectName=${lecture?.subject?.title}`}
                        >
                          <button className="w-full h-[46px] cursor-pointer rounded-[6px] border border-[#FF3D00] bg-[#FF3D00] text-white font-medium">
                            Lets Study
                          </button>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </Card>
          <div className="info_lower space-y-4 px-4 py-6">
            {lectureDetails?.description && (
              <div
                className="text-base text-gray-700 leading-relaxed [&_a]:text-orange-600 [&_a:hover]:underline"
                dangerouslySetInnerHTML={{
                  __html: lectureDetails?.description || "",
                }}
              ></div>
            )}
          </div>
        </div>
      )}

      {/* Lecture Tab */}
      {activeTab === "lecture" && (
        <div className="multibox-root space-y-6">
          <p className="text-gray-700 text-base"></p>

          <div className="subject-wrappper">
            <h4 className="text-lg font-semibold text-gray-800">
              Choose your favourite subject & start learning
            </h4>
            <p className="border border-gray-200 mt-4 mb-4" />
          </div>

          {/* Subject Container Grid */}

          <div className="subject-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 hover:gap-6 transition-all duration-300">
            {/* {subjectDetails?.subjects && subjectDetails?.subjects.length === 0 && (
            <p>No subjects available at the moment.</p>
          )} */}
            {subjectDetails &&
              subjectDetails.map((subject: any, index: number) => (
                // <Card key={index} className="subject-card">
                <Link
                  // href={`/my-courses/subject/${subject.slug}`}
                  href={`/learning/subject-details?subjectId=${subject?.id}&batchSlug=${lectureDetails?.slug}&subjectName=${subject?.title}`}
                  key={index}
                  className="subject-box bg-white shadow rounded-lg hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-center items-center p-4">
                    <img
                      src={subject?.icon}
                      alt={subject?.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div className="items-center text-center p-4">
                    <p className="sub_name text-base font-medium text-gray-800">
                      {subject?.title}
                    </p>
                    <p className="chapter text-sm text-gray-600">
                      {subject?.chapter} Lectures
                    </p>
                  </div>
                </Link>
                // </Card>
              ))}
          </div>
        </div>
      )}

      {/* ... inside the component ... */}
      {activeTab === "doubt" && (
        <div className="space-y-6 relative">
          <Tabs defaultValue="alldoubts">
            <TabsList>
              <TabsTrigger value="alldoubts">All Doubts</TabsTrigger>
              <TabsTrigger value="mydoubts">My Doubts</TabsTrigger>
            </TabsList>
            <TabsContent value="alldoubts">
              {batchDoubts && batchDoubts.totalCounts > 0 ? (
                <div className="space-y-6">
                  {batchDoubts.doubts.map((doubt: any, idx: number) => {
                    const parsedDate = parseISO(doubt?.createdAt);
                    const timeAgo = isValid(parsedDate)
                      ? formatDistanceToNowStrict(parsedDate, {
                        addSuffix: true,
                      })
                      : "Invalid date";

                    // Fix date formatting
                    let displayDate = timeAgo;
                    if (displayDate === 'Invalid date' && doubt?.createdAt) {
                      try {
                        const dateObj = new Date(doubt.createdAt);
                        displayDate = dateObj.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
                      } catch { }
                    }
                    return (
                      <div
                        key={idx}
                        className="max-w-2xl mx-auto rounded-2xl border border-orange-600 bg-white relative p-0"
                      >
                        <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white">
                          {/* User Info */}
                          <div className="flex items-center gap-3 mb-1">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 via-white to-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg shadow">
                              <span>{doubt.user?.name?.[0] || "?"}</span>
                            </div>
                            <div>
                              <div className="font-semibold text-base text-gray-700">{doubt.user?.name || "Anonymous"}</div>
                              <div className="text-xs text-gray-400">{displayDate}</div>
                            </div>
                          </div>
                          {/* Subject & Lecture Badges */}
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-orange-600 text-white border border-orange-600 px-2 py-1 rounded text-xs font-medium shadow-sm">{doubt.lectureName}</span>
                            <span className="bg-orange-600 text-white border border-orange-600 px-2 py-1 rounded text-xs font-medium shadow-sm">{doubt.subject}</span>
                          </div>
                          {/* Doubt Text */}
                          <div className="text-gray-700 text-base mb-2 leading-relaxed">
                            {doubt.desc}
                          </div>
                        </div>
                        {/* Footer - Like, Comment, Pending (centered comment) */}
                        <div className="flex items-center justify-between px-6 py-4 border-t rounded-b-2xl">
                          <button className="flex items-center gap-1 text-gray-400 hover:text-orange-500 transition font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                            <span>Like</span>
                            <span className="ml-1 text-xs font-semibold">{doubt.likes || 0}</span>
                          </button>
                          <button
                            className="flex items-center gap-1 text-gray-400 hover:text-orange-500 transition font-medium"
                            onClick={() => {
                              setSelectedDoubtId(doubt.id);
                              setShowCommentPopup(true);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2m2-4h4a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2V6a2 2 0 012-2z" /></svg>
                            <span>Comment</span>
                            <span className="ml-1 text-xs font-semibold">{doubt.comments || 0}</span>
                          </button>
                          {doubt.isResolved ? (
                            <span className="flex items-center gap-1 text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-full border border-green-200 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Resolved
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-orange-600 font-semibold bg-white px-3 py-1 rounded-full border border-blue-100 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-gray-200 rounded-lg">
                  <img
                    src="/assets/images/my-courses/doubt.png"
                    alt="No doubts"
                    className="w-20 h-20 mb-4"
                  />
                  <p className="text-gray-500 text-sm mb-4">No Doubts Found</p>
                  <Button className="bg-orange-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md">
                    Ask Doubt
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="mydoubts">
              {myDoubts && myDoubts.totalCounts > 0 ? (
                <div className="space-y-6">
                  {myDoubts.doubts.map((doubt: any, idx: number) => {
                    const parsedDate = parseISO(doubt?.createdAt);
                    const timeAgo = isValid(parsedDate)
                      ? formatDistanceToNowStrict(parsedDate, {
                        addSuffix: true,
                      })
                      : "Invalid date";

                    return (
                      <Card
                        key={idx}
                        className="w-full border border-orange-200 rounded-xl shadow-sm transition hover:shadow-md"
                      >
                        <div className="flex flex-col p-4 gap-2">
                          {/* Top - User Info (avatar removed) */}
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-semibold text-base text-gray-800">
                                {doubt.user?.name || "Anonymous"}
                              </h3>
                              <p className="text-sm text-gray-500">{timeAgo}</p>
                            </div>
                          </div>

                          {/* Doubt Content */}
                          <div className="mt-2">
                            <div className="flex gap-2 mb-2">
                              <Badge className="bg-orange-100 text-orange-700 border border-orange-300 text-xs">
                                {doubt.lectureName}
                              </Badge>
                              <Badge className="bg-gray-100 text-gray-600 border border-gray-300 text-xs">
                                {doubt.subject}
                              </Badge>
                            </div>
                            <p className="text-gray-800 text-base">
                              {doubt.desc}
                            </p>
                          </div>

                          <hr className="my-3" />

                          {/* Footer Line - Icons */}
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1 cursor-pointer">
                                ❤️ <span>Like</span>
                              </span>
                              <span
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={() => {
                                  // console.log("doubtId ",doubt._id,doubt);
                                  setSelectedDoubtId(doubt.id);
                                  setShowCommentPopup(true);
                                }}
                              >
                                💬 <span>Comment</span>
                              </span>
                            </div>
                            <div
                              className={`text-sm px-3 py-1 rounded-md font-semibold *:${doubt.isResolved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-600"}`}
                            >
                              {doubt.isResolved ? "Resolved" : "Pending"}
                            </div>

                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-gray-200 rounded-lg">
                  <Image
                    src={DoubtsImg}
                    alt="No doubts"
                    className="w-20 h-20 mb-4"
                  />
                  <p className="text-gray-500 text-sm mb-4">No Doubts Found</p>
                  <Button className="bg-orange-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md">
                    Ask Doubt
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Floating Ask a Doubt Button */}
          <button
            onClick={() => setShowAskPopup(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-orange-600 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg transition-all cursor-pointer"
          >
            <span className="text-lg">❓</span>
            <span className="font-semibold">Ask a Doubt</span>
          </button>

          {/* Comment Popup */}
          {showCommentPopup && (
            <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[1000]">
              <div className="bg-gradient-to-br from-white via-gray-50 to-white w-full max-w-lg p-0 rounded-2xl shadow-2xl relative flex flex-col h-[70vh] border border-gray-200">
                <div className="flex items-center justify-between px-8 py-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-700 mx-auto">Comments</h2>
                  <Button
                    className="text-gray-400 hover:text-orange-600 text-2xl px-2 py-0 bg-transparent hover:bg-gray-100"
                    onClick={() => setShowCommentPopup(false)}
                  >
                    &times;
                  </Button>
                </div>
                {/* Chat messages area */}
                {/* Delete selected messages button */}
                {selectedMessages.length > 0 && (
                  <div className="flex justify-end px-8 pt-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                      title="Delete selected messages"
                      onClick={() => {
                        setChatMessages(msgs => msgs.filter((_, i) => !selectedMessages.includes(i)));
                        setSelectedMessages([]);
                      }}
                    >
                      {/* Trash/Bucket icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="flex-1 overflow-y-auto px-8 py-6 bg-gradient-to-br from-white via-gray-50 to-white rounded-xl" id="chat-messages">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-gray-400 text-sm">No comments yet. Be the first one to comment.</div>
                  )}
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex items-end mb-2 justify-center group cursor-pointer select-none ${selectedMessages.includes(idx) ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}
                      onClick={() => {
                        setSelectedMessages(selected =>
                          selected.includes(idx)
                            ? selected.filter(i => i !== idx)
                            : [...selected, idx]
                        );
                      }}
                    >
                      <div className="flex flex-col items-center relative w-full">
                        <div className="bg-white text-gray-700 px-5 py-3 rounded-xl max-w-md text-base shadow border border-gray-200">
                          {msg}
                        </div>
                        <span className="text-xs text-gray-400 mt-1">You</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Input area */}
                <form
                  className="flex items-center gap-2 border-t px-8 py-6 bg-white justify-center"
                  onSubmit={e => {
                    e.preventDefault();
                    if (comment.trim()) handleSubmitComment();
                  }}
                >
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-white shadow"
                    placeholder="Type your message..."
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (comment.trim()) handleSubmitComment();
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow"
                  >
                    Send
                  </Button>
                </form>
              </div>
            </div>
          )}
          {/* Ask a Doubt Popup */}
          {showAskPopup && (
            <AskQuestionForm
              onClose={() => setShowAskPopup(false)}
              subjects={subjectDetails}
              batchSlug={batchSlug}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="quiz_wrapper space-y-6 px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">All Quizzes</h1>
            <p className="text-gray-500 mb-6">
              Total: {quizDetails?.data?.not_attempted?.length || 0} quizzes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizDetails?.data?.not_attempted.map(
              (quiz: any, index: number) => (
                <Link className="w-full"
                  href={`/quiz-description/${quiz.id}`}>
                  <Card
                    key={index}
                    className="bg-gradient-to-br from-orange-50 via-white to-white border border-orange-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold">
                          📝
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {quiz.quiz_title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {quiz.no_ques} Questions •{" "}
                            {quiz.no_ques * quiz.eachQueMarks} Marks
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>
                          📅 {new Date(quiz.quiz_created_at).toLocaleDateString()}
                        </span>
                        <span className="font-medium">
                          ⏳ {quiz.time_duration} mins
                        </span>
                      </div>

                      <Link href={`/quiz-description/${quiz.id}`} className="w-full">
                        <Button
                          className={`w-full mt-2 cursor-pointer ${quiz.is_attempted
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-orange-500 hover:bg-amber-600"} text-white transition`}
                          disabled={quiz.is_attempted}
                        >
                          {quiz.is_attempted ? "View Quiz" : "Start Quiz"}
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Link>
              )
            )}
          </div>

          {/* Quiz Popup Modal - Only one button centered on white bg */}
          {showQuizPopup && selectedQuiz && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
              <Link href={`/quiz-description/${selectedQuiz.id}`}>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg cursor-pointer"
                >
                  Go Full Screen
                </Button>
              </Link>
            </div>
          )}

          {/* WeeklyTest Full Screen Overlay */}
          {/* {showWeeklyTest && (
            <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
              <WeeklyTestPage />
            </div>
          )} */}
        </div>
      )}

      {/* Announcement tab */}

      {activeTab === "announcement" && (
        <div className="announce_wrapper space-y-6">
          <div className="contentwrapper">
            <div className="flex flex-wrap -mx-2">
              {announcements &&
                announcements.length > 0 &&
                announcements.map((announcement: any, index: number) => (
                  <div key={index} className="w-full md:w-1/2 px-2 mb-4">
                    <div className="border border-gray-200 rounded-xl bg-gray-100 p-5 shadow-md h-full transition hover:shadow-lg">
                      <h2 className="text-xl font-bold text-gray-800 mb-3">
                        {announcement?.title}
                      </h2>

                      {/* Render description with blue <a> tags */}
                      <div
                        className="text-base text-gray-700 leading-relaxed [&_a]:text-blue-600 [&_a:hover]:underline"
                        dangerouslySetInnerHTML={{
                          __html: announcement?.description || "",
                        }}
                      ></div>

                      <p className="mt-4 text-sm text-gray-500">
                        {announcement?.createdAt}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PiadCoursesDetails;
