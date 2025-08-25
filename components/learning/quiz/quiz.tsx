"use client";
import { useState } from "react";
import QuizResultPage from "@/components/learning/quiz/quiz-score";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Timer,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

export default function WeeklyTestPage({ quizeData }: { quizeData: any }) {
  // Example structure: quizeData = { title, description, questions: [{ question, options: [] }], ... }
  const [showResultPage, setShowResultPage] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0); // 0-based index
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});

  const questions = Array.isArray(quizeData?.questions) ? quizeData.questions : [];
  const totalQuestions = questions.length;
  const attempted = Object.values(selectedOptions).filter((v) => v !== null && v !== undefined).length;
  const skipped = totalQuestions - attempted;

  if (showResultPage) {
    return <QuizResultPage />;
  }
  if (!started) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Banner */}
        <div className="relative w-full">
          <Image
            src={quizeData?.banner}
            alt="Weekly Test Banner"
            width={1920}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Test Info Card */}
        <div className="w-full flex justify-center mt-[-80px] px-4">
          <div className="w-full max-w-6xl bg-white border rounded-xl shadow-md p-6 z-10">
            <h2 className="text-2xl font-semibold mb-2">
              {quizeData?.title || "Weekly Test"}
            </h2>
            <hr />
            <p className="text-gray-600 mb-4 text-sm leading-relaxed py-4">
              {quizeData?.description || "This test contains multiple choice questions."}
            </p>
            <hr />

            {/* Info Boxes */}
            <div className="flex flex-wrap gap-6 mb-0 py-4">
              <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg text-orange-600 text-sm font-medium">
                <Calendar className="w-10 h-10" />
                <span className="text-black font-semibold">{totalQuestions} Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg text-orange-600 text-sm font-medium">
                <Timer className="w-10 h-10" />
                <span className="text-black">{quizeData?.duration || "30 Mins"}</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg text-orange-600 text-sm font-medium">
                <AlertTriangle className="w-10 h-10" />
                <span className="text-black">{quizeData?.negativeMarking ? "Negative Marks" : "No Negative Marking"}</span>
              </div>
            </div>

            {/* Continue Button */}
            <div className="text-right">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm cursor-pointer"
                onClick={() => setStarted(true)}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Mode
  const currentQ = questions[activeQuestion];
  return (
    <div className="min-h-screen bg-white p-2 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b max-w-4xl mx-auto">
        <div className="font-semibold">{totalQuestions} Questions :</div>
        <div className="flex items-center gap-2 text-orange-600">
          <Clock size={18} />
          <span>{quizeData?.duration || "00:30:00"}</span>
        </div>
      </div>

      {/* Question Tabs */}
      <div className="bg-orange-100 flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
        <Button className="p-2" onClick={() => setActiveQuestion((q) => Math.max(0, q - 1))} disabled={activeQuestion === 0}>
          <ChevronLeft />
        </Button>
        <div
          className="flex gap-2 justify-center overflow-x-auto whitespace-nowrap w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {questions.map((_: any, idx: any) => (
            <Button
              key={idx}
              onClick={() => setActiveQuestion(idx)}
              className={`w-8 h-8 rounded-full text-sm inline-block ${
                idx === activeQuestion
                  ? "bg-orange-600 text-white"
                  : "bg-white border text-black"
              }`}
              style={{ minWidth: "2rem" }}
            >
              {idx + 1}
            </Button>
          ))}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          `}</style>
        </div>
        <Button className="p-2" onClick={() => setActiveQuestion((q) => Math.min(totalQuestions - 1, q + 1))} disabled={activeQuestion === totalQuestions - 1}>
          <ChevronRight />
        </Button>
      </div>

      {/* Question Body */}
      <div className="p-6 text-center max-w-5xl mx-auto">
        <h2 className="font-semibold text-lg mb-10">
          {currentQ?.question || "No question"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto text-left">
          {currentQ?.options?.map((option: string, i: number) => (
            <label
              key={i}
              className={`flex items-center gap-2 p-4 border rounded-md hover:bg-gray-50 cursor-pointer ${selectedOptions[activeQuestion] === i ? "bg-orange-100 border-orange-400" : ""}`}
            >
              <input
                type="radio"
                name={`question-${activeQuestion}`}
                className="accent-orange-600"
                checked={selectedOptions[activeQuestion] === i}
                onChange={() => setSelectedOptions((prev) => ({ ...prev, [activeQuestion]: i }))}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="mt-4 text-right">
          <Button className="text-white text-sm hover:underline cursor-pointer" onClick={() => setSelectedOptions((prev) => ({ ...prev, [activeQuestion]: null }))}>
            Clear Option
          </Button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="text-black flex items-center gap-1 cursor-pointer"
          onClick={() => setActiveQuestion((q) => Math.max(0, q - 1))}
          disabled={activeQuestion === 0}
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <Button
          className="bg-orange-600 text-white hover:bg-orange-700 cursor-pointer"
          onClick={() => setShowSubmitPopup(true)}
        >
          Submit
        </Button>

        <Button
          variant="ghost"
          className="text-black flex items-center gap-1 cursor-pointer"
          onClick={() => setActiveQuestion((q) => Math.min(totalQuestions - 1, q + 1))}
          disabled={activeQuestion === totalQuestions - 1}
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Submit Confirmation Popup */}
      {showSubmitPopup && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white w-[90%] max-w-md rounded-md shadow-lg p-6 text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure to submit the Quiz?
            </h2>

            <div className="flex justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="bg-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto text-sm font-semibold">
                  {totalQuestions}
                </div>
                <div className="text-xs mt-1">Total</div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto text-sm font-semibold">
                  {attempted}
                </div>
                <div className="text-xs mt-1">Attempted</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-200 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto text-sm font-semibold">
                  {skipped}
                </div>
                <div className="text-xs mt-1">Skipped</div>
              </div>
            </div>

            <div className="flex justify-around items-center text-sm font-medium">
              <Button
                className="text-white font-semibold hover:underline"
                onClick={() => setShowSubmitPopup(false)}
              >
                No
              </Button>
              <Button
                className="text-white font-semibold hover:underline"
                onClick={() => {
                  setShowSubmitPopup(false);
                  setShowResultPage(true);
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
