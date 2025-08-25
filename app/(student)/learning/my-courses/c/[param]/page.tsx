// "use server"
import React from 'react'
import PaidCoursesDetails from '@/components/learning/my-courses/paid-courses-details';
// import { getBatchDoubt, getMyCoursesByBatch, getQuizzDetailsByBatchId, getSubjectOfBatch, getBatchCommunities, getAnnouncementsByBatch } from "@/actions/home";
const LecturePage = async ({ params }: {params:any}) =>  {
  const pathname = await params.param;
  // const paramDetails = {
  //     batchSlug: pathname
  // };

  // const lectureDetails = await getMyCoursesByBatch(paramDetails);
  // const subjectDetails = await getSubjectOfBatch(paramDetails);
  // const batchParamDetails = {
  //   batchId: lectureDetails?.batchId,
  //   page: 1,
  //   pageSize: 10
  // };
  // const batchDoubts = await getBatchDoubt(batchParamDetails);
  // const quizDetails = await getQuizzDetailsByBatchId(batchParamDetails);
  // const batchCommunities = await getBatchCommunities(batchParamDetails);
  // const announcements = await getAnnouncementsByBatch(paramDetails);


  return (
    <PaidCoursesDetails batchSlug={pathname} />
  )
}

export default LecturePage;
