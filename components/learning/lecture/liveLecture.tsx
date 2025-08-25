"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle, Info, FolderOpen, Star, Flag } from "lucide-react";
import { liveLectureAPI } from "@/api/subjectDetails";
import { useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import VideoPlayer from "./VideoPlayer";
import io from "socket.io-client";
import { getItem, removeItem } from "@/lib/storage";
import JitsiComponent from "../../custom-video-player/JitsiComponent";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000");

type Comment = {
  text: string;
  avatar: string;
  name?: string;
  batchName?: string;
  batchId?: string;
};

export default function LiveLecture({ params }: { params: any }) {
  const [showComments, setShowComments] = useState(true);
  const [activeTab, setActiveTab] = useState<"info" | "resources" | "rating" | "report">("info");

  const searchParams = useSearchParams();
  const lectureId = searchParams.get("lectureId") as string;
  const batchSlug = searchParams.get("batchSlug") as string;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const {
    loading,
    data: lecturesData,
    fn: fnGetLectures,
  } = useFetch(liveLectureAPI);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendComment();
  };
console.log("comment",comment)
  let roomId = lecturesData?.data?.commonName;
  const details = JSON.parse(getItem("userProfile") as string);
  const name = details?.name || details?.FullName;
  const avatar = details?.profilePhoto || "/assets/images/avatar.png";
  const sendComment = () => {
    
    if (comment.trim()) {
      const newComment = {
        text: comment,
        name: name,
        roomId: roomId,
        avatar: avatar,
        batchName: lecturesData?.data?.batchDetails?.batchName || "",
        batchId: lecturesData?.data?.batchDetails?.batchId || "",
      };
      socket.emit("send-message", newComment.text, newComment.name, newComment.roomId, newComment.avatar, newComment.batchName, newComment.batchId);
      setComment("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendComment();
    }
  };

  useEffect(() => {
    fnGetLectures(lectureId, batchSlug);
  }, [lectureId, batchSlug]);

  
  useEffect(() => {
    socket.emit("create", lecturesData?.data?.commonName);

    const handleReceiveMessage = (data: Comment) => {
      console.log("Received message:", data);
      setComments((prev) => [...prev, data]);
    };
    setComment("Joined the lecture");
    sendComment();
    socket.on("receive-message", (message, name, userIconUrl, batchName, batchId) => {
      handleReceiveMessage({ text: message, name, avatar: userIconUrl, batchName, batchId });
    });

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [lecturesData]);
  // console.log("Comments:", comments);

  // Auto-scroll when new comment comes and user is at bottom
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]); // when comments update

  // Listen for scroll to detect if user is at bottom
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const bottomThreshold = 100; // pixels before reaching bottom

    setIsAtBottom(scrollHeight - scrollTop - clientHeight < bottomThreshold);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="content-wrapper bg-white shadow-md p-4 rounded-md">
        <h1 className="text-2xl font-bold text-gray-800">
          {lecturesData?.data?.lectureTitle || "Lecture Title"}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {lecturesData?.data?.link && (
          <div className="w-full lg:w-2/3 h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-md shadow-md overflow-hidden">
            <VideoPlayer url={lecturesData.data.link} />
          </div>
        )}

        <div className="lg:w-1/3 bg-gray-100 rounded-md shadow-md p-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-gray-700">
              <MessageCircle className="w-5 h-5" />
              Live Comments
            </div>
            <button onClick={() => setShowComments(!showComments)}>
              {showComments ? "⬆️" : "⬇️"}
            </button>
          </div>

          {showComments && (
            <div className="mt-4 flex flex-col gap-2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-y-auto bg-gray-50 rounded-md p-2 break-words overflow-x-hidden"  >
              {comments.filter((c, i, arr) =>
                  i === 0 || !(c.text === arr[i - 1].text && c.name === arr[i - 1].name)
                ).map((c: Comment, i: number) => (
                <div
                    key={i}
                    className={`flex ${c.name === name ? 'justify-end' : 'justify-start'} w-full mb-2`}
                >
                  <div className="flex items-start gap-2 max-w-[80%]" onScroll={handleScroll} ref={messagesEndRef} >
                    {/* Avatar on left (only for others) */}
                    {c.name !== name && (
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-6 h-6 rounded-full mt-1"
                      />
                    )}

                    <div>
                      <div
                        className={`rounded-lg px-4 py-2 text-sm shadow ${
                          c.name === name
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <span className="font-medium">{c.name}</span>
                        <div className="break-words">{c.text}</div>
                      </div>
                    </div>

                    {/* Avatar on right (only for current user) */}
                    {c.name === name && (
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-6 h-6 rounded-full mt-1"
                      />
                    )}
                  </div>
                </div>
              ))}
              {/* <div ref={messagesEndRef} /> */}
            </div>
          )}
          <div className={`text-center text-gray-500 mt-12`}>
            <form
              className="flex gap-2 absolute bottom-4 left-0 right-0 bg-white p-2 rounded-md shadow-md"
              onSubmit={handleCommentSubmit}
            >
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold shadow"
                disabled={!comment.trim()}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="content-wrapper bg-white shadow-md p-4 rounded-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lecture Details</h2>
        <JitsiComponent roomName={roomId} userName={name} />

      </div> */}

      <div className="mt-8">
        <div className="flex gap-2 sm:gap-6 border-b pb-2 overflow-x-auto scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0">
          {[
            { key: "info", icon: <Info className="w-5 h-5 mr-1" />, label: "Info" },
            { key: "resources", icon: <FolderOpen className="w-5 h-5 mr-1" />, label: "Resources" },
            { key: "rating", icon: <Star className="w-5 h-5 mr-1" />, label: "Rating" },
            { key: "report", icon: <Flag className="w-5 h-5 mr-1" />, label: "Report" },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-t-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === key
                  ? "bg-orange-600 text-white"
                  : "text-gray-700 hover:text-orange-600"
              }`}
              style={{ minWidth: 90 }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "info" && <p className="text-gray-600">📘 Video Description or Lecture Information here.</p>}
          {activeTab === "resources" && <p className="text-gray-600">📁 PDFs or Downloadables will be shown here.</p>}
          {activeTab === "rating" && <p className="text-gray-600">⭐ Users can rate this video here.</p>}
          {activeTab === "report" && <p className="text-gray-600">🚩 Report form will be here.</p>}
        </div>
      </div>
    </div>
  );
}
