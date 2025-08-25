
import {
  getBannerApi,
  getCatApi,
  getAllTeachersApi,
  getAllTestimonalApi,
  signupApi,
  verifyOtpApi,
  getAllBatchesApi,
  getFAQsApi,
  getBatchPlanApi,
  getSubjectDetailsOfBatchApi,
  getAllNotificationsApi,
  getBatchDetailsBySlugApi,
  getLecturesByBatchSlugApi,
  getRecommendedCoursesApi,
  getMyCoursesApi,
  getShortVideosApi,
  getFreeCoursesApi,
  verifyCouponApi,
  initiateCoursePaymentApi,
  getMyProfileApi,
  getLectureByIdApi,
  getTodayClassesApi,
  getMyCoursesByBatchApi,
  getSubjectOfBatchApi,
  getBatchDoubtsApi,
  getQuizzDetailsByBatchIdApi,
  getQuizzByIdApi,
  getQuestionsByQuizzIdApi,
  attemptQuizzApi,
  getQuizzResultApi,
  getLeaderBoardApi,
  getLecturesOfSubjectApi,
  getBatchCommunityApi,
  getBatchMycommunitiesApi,
  createCommunityApi,
  getAnnouncementsByBatchApi,
  likeOrRemoveLikeOfShortApi,
  viewedApi,
  getReferralTransApi,
  getAllPostsApi,
  likeOrRemoveLikeApi,
  getPostByIdApi,
  getCommentsByPostIdApi,
  addCommentsToPostApi,
  updateIsReadNotificationApi,
  createCtaApi,
  getCategoriesPageApi,
  resendOtpApi,
  createBatchDoubtCommentApi,
  createMyDoubtApi

} from "@/api/Home";

export async function getCategoriesPage(data: any) {
  try {
    const response = await getCategoriesPageApi(data);
    // console.log(response, "response from getCategoriesPage");
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getBanner() {
  const bannerInfo = await getBannerApi();
  // console.log(bannerInfo);
  return bannerInfo?.data;
}

export async function getCat() {
  const bannerInfo = await getCatApi();
  // console.log(bannerInfo);
  return bannerInfo?.data;
}

export async function getAllTeachers({ limit }: { limit: number }) {
  const teachersInfo = await getAllTeachersApi({ limit: limit });
  return teachersInfo?.data;
}

export async function getAllTestimonal() {
  const testimonalInfo = await getAllTestimonalApi();
  return testimonalInfo?.data;
}

export async function signup(userDetails: any) {
  const signupInfo = await signupApi(userDetails);
  return signupInfo;
}

export async function verifyOtp(otp: any) {
  const otpInfo = await verifyOtpApi(otp);
  return otpInfo;
}

export async function resend(userDetails: any) {
  const resendInfo = await resendOtpApi(userDetails);
  return resendInfo;
}

export async function resendOtp() {
  try {
    const response = await fetch("/api/resend-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in resendOtp:", error);
    return { status: false, message: "Something went wrong" };
  }
}

export async function getAllBatches(batchDetails: any) {
  const batchInfo = await getAllBatchesApi(batchDetails);
  return batchInfo?.data;
}

export async function getFAQs(paramDetails: any) {
  const faqsInfo = await getFAQsApi(paramDetails);
  return faqsInfo?.data;
}

export async function getBatchPlan(paramDetails: any) {
  const batchPlanInfo = await getBatchPlanApi(paramDetails);
  return batchPlanInfo?.data;
}

export async function getSubjectDetailsOfBatch(paramDetails: any) {
  const subjectDetailsInfo = await getSubjectDetailsOfBatchApi(paramDetails);
  return subjectDetailsInfo?.data;
}

export async function getAllNotifications() {
  const notificationInfo = await getAllNotificationsApi();
  return notificationInfo?.data;
}

export async function getBatchDetailsBySlug(paramDetails: any) {
  const batchDetailsInfo = await getBatchDetailsBySlugApi(paramDetails);
  console.log(batchDetailsInfo, "Batch Details Info");
  return batchDetailsInfo;
}

export async function getLecturesByBatchSlug(paramDetails: any) {
  const lectureInfo = await getLecturesByBatchSlugApi(paramDetails);
  return lectureInfo?.data;
}

export async function getRecommendedCourses() {
  const recommendedCoursesInfo = await getRecommendedCoursesApi();
  return recommendedCoursesInfo?.data;
}

export async function getMyCourses() {
  // Cookies.get("authToken")
  const myCoursesInfo = await getMyCoursesApi();
  // console.log(myCoursesInfo,"mh couseibvijs");
  return myCoursesInfo?.data;
}

export async function getShortVideos(paramDetails: any) {
  const shortVideosInfo = await getShortVideosApi(paramDetails);
  return shortVideosInfo?.data;
}

export async function getFreeCourses(paramDetails: any) {
  const freeCoursesInfo = await getFreeCoursesApi(paramDetails);
  return freeCoursesInfo?.data;
}

export async function veryCoupon(paramDetails: any) {
  const couponVerifyInfo = await verifyCouponApi(paramDetails);
  return couponVerifyInfo?.data;
}

export async function initiateCoursePayment(paramDetails: any) {
  const paymentInitiateInfo = await initiateCoursePaymentApi(paramDetails);
  return paymentInitiateInfo?.data;
}

export async function getMyProfile() {
  const myProfileInfo = await getMyProfileApi();
  return myProfileInfo?.data;
}

export async function getLectureById(paramDetails: any) {
  const lectureInfo = await getLectureByIdApi(paramDetails);
  return lectureInfo?.data;
}

export async function getTodayClasses() {
  const todayClassesInfo = await getTodayClassesApi();
  // console.log(todayClassesInfo, "Today Classes Info");
  return todayClassesInfo;
}

export async function getMyCoursesByBatch(paramDetails: any) {
  const myCoursesInfo = await getMyCoursesByBatchApi(paramDetails);
  return myCoursesInfo?.data;
}

export async function createBatchDoubtComment(paramDetails: any) {
  const batchDoubtInfo = await createBatchDoubtCommentApi(paramDetails);
  return batchDoubtInfo?.data;
}

export async function getSubjectOfBatch(paramDetails: any) {
  const subjectByBatchInfo = await getSubjectOfBatchApi(paramDetails);
  return subjectByBatchInfo?.data;
}

export async function getBatchDoubt(paramDetails: any) {
  const batchDoubtInfo = await getBatchDoubtsApi(paramDetails);
  return batchDoubtInfo?.data;
}

export async function getQuizzDetailsByBatchId(paramDetails: any) {
  const quizzInfo = await getQuizzDetailsByBatchIdApi(paramDetails);
  return quizzInfo;
}

export async function getQuizzById(paramDetails: any) {
  const quizzDetailsInfo = await getQuizzByIdApi(paramDetails);
  return quizzDetailsInfo?.data;
}

export async function getQuestionsByQuizzId(paramDetails: any) {
  const questionsInfo = await getQuestionsByQuizzIdApi(paramDetails);
  return questionsInfo?.data;
}

export async function attemptQuizz(paramDetails: any) {
  const attemptQuizzInfo = await attemptQuizzApi(paramDetails);
  return attemptQuizzInfo?.data;
}

export async function getQuizzResult(paramDetails: any) {
  const quizzResultInfo = await getQuizzResultApi(paramDetails);
  return quizzResultInfo?.data;
}

export async function getLeaderBoard(paramDetails: any) {
  const leaderBoardInfo = await getLeaderBoardApi(paramDetails);
  return leaderBoardInfo?.data;
}

export async function getLecturesOfSubject(paramDetails: any) {
  // console.log("Fetching lectures of subject with params:", paramDetails);
  const lecturesOfSubjectInfo = await getLecturesOfSubjectApi(paramDetails);
  // console.log("Fetched lectures:kdfiuhdbgbdigbd", lecturesOfSubjectInfo);
  return lecturesOfSubjectInfo?.data;
}

export async function getBatchCommunities(paramDetails: any) {
  const batchCommunitiesInfo = await getBatchCommunityApi(paramDetails);
  return batchCommunitiesInfo?.data;
}

//get Lecture Details by Batch Slug and Lecture Id
export async function getLectureDetailsByBatchSlugAndId(paramDetails: any) {
  try {
    const lectureDetailsInfo = await getLectureByIdApi(paramDetails);
    return lectureDetailsInfo?.data;
  } catch (error) {
    console.error("Error fetching lecture details:", error);
    return null;
  }
}


export async function getBatchMyCommunities(paramDetails: any) {
  const batchMyCommunitiesInfo = await getBatchMycommunitiesApi(paramDetails);
  return batchMyCommunitiesInfo?.data;
}

export async function createDoubt(paramDetails: any) {
  const doubtResponse = await createMyDoubtApi(paramDetails);
  return doubtResponse?.data;
}

export async function createCommunity(paramDetails: any) {
  const createCommunityInfo = await createCommunityApi(paramDetails);
  return createCommunityInfo?.data;
}

export async function getAnnouncementsByBatch(paramDetails: any) {
  const announcementsInfo = await getAnnouncementsByBatchApi(paramDetails);
  return announcementsInfo?.data;
}

export async function likeOrRemoveLikeOfShort(paramDetails: any) {
  const likeOrRemoveInfo = await likeOrRemoveLikeOfShortApi(paramDetails);
  return likeOrRemoveInfo?.data;
}

export async function viewed(paramDetails: any) {
  const viewInfo = await viewedApi(paramDetails);
  return viewInfo?.data;
}

export async function getReferralTrans() {
  const referralTransInfo = await getReferralTransApi();
  return referralTransInfo?.data;
}

export async function getAllPosts(paramDetails: any) {
  const allPostsInfo = await getAllPostsApi(paramDetails);
  return allPostsInfo?.data;
}

export async function likeOrRemoveLike(paramDetails: any) {
  const likeOrRemoveInfo = await likeOrRemoveLikeApi(paramDetails);
  return likeOrRemoveInfo?.data;
}

export async function getPostById(paramDetails: any) {
  const postInfo = await getPostByIdApi(paramDetails);
  return postInfo?.data;
}

export async function getCommentsByPostId(paramDetails: any) {
  const commentsInfo = await getCommentsByPostIdApi(paramDetails);
  return commentsInfo?.data;
}

export async function addCommentsToPost(paramDetails: any) {
  const addCommentInfo = await addCommentsToPostApi(paramDetails);
  return addCommentInfo?.data;
}

export async function updateIsReadNotification(paramDetails: any) {
  const isReadInfo = await updateIsReadNotificationApi(paramDetails);
  return isReadInfo?.data;
}

export async function createCta(paramDetails: any) {
  const createCtaInfo = await createCtaApi(paramDetails);
  return createCtaInfo;
}
