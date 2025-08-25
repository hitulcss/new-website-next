"use client";
import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const resultData = {
  total: 20,
  attempted: 19,
  correct: 0,
  incorrect: 19,
  skipped: 1,
  accuracy: 0,
  topperScore: 25,
};

const allQuestions = [
  {
    question: "Cell wall is found in",
    options: [
      "Only in plant cells",
      "Only in animal cells",
      "Only in bacterial cells",
      "Both (a) and (c)",
    ],
    selected: "Both (a) and (c)",
    correctAnswer: "Only in plant cells",
  },
  // Add remaining questions here...
];

export default function QuizResultPage() {
  const [tab, setTab] = useState("summary");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-6 text-sm font-medium border-b mb-4">
          {["summary", "difficulty", "leaderboard"].map((item) => (
            <button
              key={item}
              className={`py-2 px-1 capitalize border-b-2 ${
                tab === item
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        {tab === "summary" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Left: Quiz Performance */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-lg mb-4">🏆 Quiz Performance</h3>
                <div className="flex justify-around text-center">
                  <div>
                    <p className="text-2xl font-bold">
                      {resultData.correct} / {resultData.total}
                    </p>
                    <p className="text-gray-500 text-sm">Correct</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{resultData.accuracy}%</p>
                    <p className="text-gray-500 text-sm">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{resultData.topperScore}%</p>
                    <p className="text-gray-500 text-sm">Topper's Score</p>
                  </div>
                </div>
              </div>

              {/* Right: Pie Chart Section */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-lg mb-4 text-center">Correctness</h3>
                <div className="w-40 h-40 mx-auto bg-gradient-to-r from-purple-500 to-blue-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {/* Replace with real chart if needed */}
                  {((resultData.correct / resultData.total) * 100).toFixed(0)}%
                </div>
                <div className="flex justify-around mt-4 text-xs">
                  <span className="text-blue-600">Total: {resultData.total}</span>
                  <span className="text-yellow-500">Attempted: {resultData.attempted}</span>
                  <span className="text-green-600">Correct: {resultData.correct}</span>
                  <span className="text-purple-600">Incorrect: {resultData.incorrect}</span>
                  <span className="text-gray-500">Skipped: {resultData.skipped}</span>
                </div>
              </div>
            </div>

            {/* Detailed Questions */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4 text-lg">All questions - See the details</h3>
              {allQuestions.map((q, idx) => {
                const isCorrect = q.selected === q.correctAnswer;
                const isSkipped = !q.selected;

                return (
                  <div key={idx} className="mb-6 border-b pb-4">
                    <p className="mb-3 font-medium">{idx + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, i) => (
                        <div
                          key={i}
                          className={`border p-3 rounded-md flex items-center gap-2 ${
                            q.selected === opt
                              ? isCorrect
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${idx}`}
                            checked={q.selected === opt}
                            readOnly
                          />
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      {isSkipped ? (
                        <span>Skipped</span>
                      ) : isCorrect ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Correct Answer
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Wrong Answer
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
