import React from "react";
import QuizFullPage from "../../__component/quizFullPage";
async function QuizPage({ params }: { params: any }) {
  const { quizId, batchSlug } = await params;
  return 
  // <QuizFullPage  quizId={quizId} batchSlug={batchSlug} />;
  // <QuizFullPage quizId={params.quizId} batchSlug={params.batchSlug} />
}

export default QuizPage;
