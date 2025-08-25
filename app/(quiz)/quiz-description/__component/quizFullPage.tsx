"use client";
import React, { useEffect } from "react";
import WeeklyTestPage from "@/components/learning/quiz/quiz";
import useFetch from "@/hooks/use-fetch";
import { getQuizzById } from "@/actions/home";

function QuizFullPage({ quizId }: { quizId: any }) {
  const {
    loading: quizLoading,
    data: quizData,
    fn: fnGetQuizById,
  } = useFetch(getQuizzById);

console.log(quizId)
  useEffect(() => {
    if (quizId) {
      fnGetQuizById({ quizId });
    }
  }, [quizId]);

  if (quizLoading) return <div>Loading...</div>;
  if (!quizData) return <div>No quiz found.</div>;
  return <div><WeeklyTestPage quizeData={quizData} /></div>;
}

export default QuizFullPage;
