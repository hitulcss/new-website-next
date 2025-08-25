import axiosInstance from "@/lib/axios";
import { EndPoints } from "./constant";
import { error } from "console";
import { IconEmpathizeOff } from "@tabler/icons-react";
import { access } from "fs";

const CategoryFullPageEndpoints = [
  { name: "getBanner", type: "get", uri: "webContains/getBanner" },
  {
    name: "getAllStaff",
    type: "get",
    uri: "webContains/getAllStaff?limit=[limit]",
  },
  {
    name: "getAllTestimonal",
    type: "get",
    uri: "webContains/getAllTestimonal",
  },
  {
    name: "getAllBatchesDetails",
    type: "get",
    uri: "webContains/getAllBatchesDetails?categorySlug=[slug]&subCategorySlug=[subCategorySlug]&limit=[limit]",
  },
  {
    name: "getAllCategory",
    type: "get",
    uri: "webContains/getAllCategory",
  },
];

export const getCategoriesPageApi = async (paramsData?: any) => {
  try {
    const res = CategoryFullPageEndpoints.map((endpoint: any): Promise<any> => {
      const { name, uri } = endpoint;
      if (name === "getBanner") {
        return axiosInstance.get(uri);
      } else if (name === "getAllStaff") {
        return axiosInstance.get(uri.replace("[limit]", 100));
      } else if (name === "getAllTestimonal") {
        return axiosInstance.get(uri);
      } else if (name === "getAllBatchesDetails") {
        return axiosInstance.get(
          uri
            .replace("[slug]", paramsData?.catslug)
            .replace("[subCategorySlug]", paramsData?.subcatslug ?? "")
            .replace("[limit]", paramsData?.limit ?? 100)
        );
      } else if (name === "getAllCategory") {
        return axiosInstance.get(uri);
      }
      // Add a fallback return to satisfy the return type
      return Promise.resolve(undefined);
    });
    //serialize the requests with given name key
    const responses = await Promise.all(res);
    const data = responses.reduce(
      (acc: { [key: string]: any }, response, index) => {
        const endpointName = CategoryFullPageEndpoints[index].name;
        acc[endpointName] = response?.data ?? [];
        return acc;
      },
      {}
    );
    return data;
  } catch (error) {
    console.error("Error getting banner:", error);
    throw error;
  }
};

export const getAllBatchesDetailsApi = async (paramsData: any) => {
  try {
    const uri =
      "/webContains/getAllBatchesDetails?categorySlug=[slug]&subCategorySlug=[subCategorySlug]&?limit=[limit]"; // replace with actual endpoint

    const endpoint = uri
      .replace("[slug]", paramsData?.catslug ?? "")
      .replace("[subCategorySlug]", paramsData?.subcatslug ?? "")
      .replace("[limit]", String(paramsData?.limit ?? 10));

    const response = await axiosInstance.get(endpoint);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching batches:", error);
    throw error;
  }
};

export const getBannerApi = async () => {
  try {
    const response = await axiosInstance.get("webContains/getBanner");
    return response.data;
  } catch (error) {
    console.error("Error getting banner:", error);
    throw error;
  }
};

export const getCatApi = async () => {
  try {
    const response = await axiosInstance.get("webContains/getAllCategory");
    return response.data;
  } catch (error) {
    console.error("Error getting banner:", error);
    throw error;
  }
};

export const getAllTeachersApi = async ({ limit }: { limit: number }) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getAllStaff?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting teachers:", error);
    throw error;
  }
};

export const getAllTestimonalApi = async () => {
  try {
    const response = await axiosInstance.get("webContains/getAllTestimonal");
    return response.data;
  } catch (error) {
    console.log("Error getting testimonal:", error);
    throw error;
  }
};

export const createBatchDoubtCommentApi = async (commentData: any) => {
  try {
    const response = await axiosInstance.post("user/createBatchDoubtComment", commentData);
    return response.data;
  } catch (error) {
    console.log("Error creating batch doubt comment:", error);
    throw error;
  }
};

export const signupApi = async (userDetails: any) => {
  try {
    const response = await axiosInstance.post(
      "webContains/signup",
      userDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error while signup:", error);
    throw error;
  }
};

export const verifyOtpApi = async (otp: any) => {
  try {
    const response = await axiosInstance.post("webContains/verifyOtp", otp);
    return response.data;
  } catch (error) {
    console.log("Error while login :", error);
    throw error;
  }
};

export const resendOtpApi = async (userDetails: any) => {
  try {
    const response = await axiosInstance.post(
      "webContains/resendOtp",
      userDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error while resend :", error);
    throw error;
  }
};

export const getAllBatchesApi = async (batchDetails: any) => {
  const { categorySlug, subCategorySlug, limit } = { ...batchDetails };
  try {
    const response = await axiosInstance.get(
      `webContains/getAllBatchesDetails?categorySlug=${categorySlug}&subCategorySlug=${subCategorySlug}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting batches :", error);
    throw error;
  }
};

export const getAllBatchesAfterLoginApi = async (batchDetails: any) => {
  const { categorySlug, subCategorySlug, limit } = { ...batchDetails };
  try {
    const response = await axiosInstance.get(
      `webContains/getAllBatchesDetails?categorySlug=${categorySlug}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting batches :", error);
    throw error;
  }
};

export const getFAQsApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getFAQs?type=${paramDetails?.type}&id=${paramDetails?.categoryId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting FAQs :", error);
    throw error;
  }
};

export const getBatchPlanApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `user/getBatchPlan?batchId=${paramDetails?.batchId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting batch plan");
    throw error;
  }
};

export const getDoubtApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `user/getDoubt?batchDoubtId=${paramDetails?.batchDoubtId}`
    );
    return response.data;
  } catch (error) {
    console.log("No comment yet :", error);
    throw error;
  }
};


export const getMyDoubtApi = async (formData: any) => {
  try {
    const response = await axiosInstance.get(
      `user/getMyBatchDoubts?batchId=${formData?.batchId}&page=${formData.page}&pageSize=${formData.pageSize}`
    );
    return response?.data?.data;
  } catch (error) {
    console.log("No comment yet :", error);
    throw error;
  }
};

export const createMyDoubtApi = async (formData: any) => {
  try {
    const response = await axiosInstance.post(`user/createDoubt`, formData);
    return response?.data;
  } catch (error) {
    console.log("No comment yet :", error);
    throw error;
  }
};

export const getSubjectDetailsOfBatchApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getSubjectDetailsOfBatch?batchSlug=${paramDetails?.batchSlug}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting subject details :", error);
    throw error;
  }
};

export const getAllNotificationsApi = async () => {
  try {
    const response = await axiosInstance.get(`Notification/getNotifications`);
    return response.data;
  } catch (error) {
    console.log("Error getting notification :", error);
    throw error;
  }
};

export const getBatchDetailsBySlugApi = async (batchSlug: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getBatchDetailsBySlug/${batchSlug}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting batch details by slug :", error);
    throw error;
  }
};

export const getLecturesByBatchSlugApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getLecturesByBatchSlug/${paramDetails?.batchSlug}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting lecture :", error);
    throw error;
  }
};

export const getRecommendedCoursesApi = async () => {
  try {
    const response = await axiosInstance.get(
      "webContains/getRecommendedCourses"
    );
    return response.data;
  } catch (error) {
    console.log("Error getting recommnded courses :", error);
    throw error;
  }
};

export const getMyCoursesApi = async () => {
  try {
    const response = await axiosInstance.get("webContains/getMyCourses");
    console.log("My courses response:", response);

    return response.data;
  } catch (error) {
    console.log("Error getting my courses : ", error);
    throw error;
  }
};

export const getShortVideosApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `learning/getShortVideos?page=${paramDetails?.page}&pageSize=${paramDetails?.pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting short videos :", error);
    throw error;
  }
};

export const getFreeCoursesApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/freeCourses?categorySlug=${paramDetails?.categorySlug}&subCategorySlug=${paramDetails?.subCategorySlug}&limit=${paramDetails?.limit}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting free courses :", error);
    throw error;
  }
};

export const verifyCouponApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.post(
      "user/verifyCoupon",
      paramDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error while verifying coupon :", error);
    throw error;
  }
};

export const initiateCoursePaymentApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.post(
      "purchase/initiateCoursePayment",
      paramDetails
    );
    console.log("Payment initiation response:", response);
    return response.data;
  } catch (error) {
    console.log("Error while initiating payment :", error);
    throw error;
  }
};

export const getMyProfileApi = async () => {
  try {
    const response = await axiosInstance.get("webContains/myProfile");
    return response.data;
  } catch (error) {
    console.log("Error getting my profile :", error);
    throw error;
  }
};

export const getLectureByIdApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getLecture?id=${paramDetails?.lectureId}&batchSlug=${paramDetails?.batchSlug}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting lecture by id :", error);
    throw error;
  }
};

export const getTodayClassesApi = async () => {
  try {
    const response = await axiosInstance.get("adminPanel/getTodayClasses");
    return response.data.data;
  } catch (error) {
    console.log("Error getting today classes :", error);
    throw error;
  }
};

export const getMyCoursesByBatchApi = async (paramDetails: any) => {
  try {
    console.log("==========", paramDetails);
    const response = await axiosInstance.get(
      `webContains/getMyCoursesByBatch/${paramDetails?.batchSlug}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting my courses by batch :", error);
    throw error;
  }
};

export const getSubjectOfBatchApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getSubjectOfBatch?batchSlug=${paramDetails?.batchSlug}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting subject of batch :", error);
    throw error;
  }
};

export const getBatchDoubtsApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `user/getBatchDoubts?batchId=${paramDetails?.batchId}&page=${paramDetails?.page}&pageSize=${paramDetails?.pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting batch Doubts :", error);
    throw error;
  }
};

export const getQuizzDetailsByBatchIdApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getQuizDetailsByBatchId/${paramDetails?.batchId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting quizzes :", error);
    throw error;
  }
};

export const getQuizzByIdApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getQuizById/${paramDetails?.quizzId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting quizz details :", error);
    throw error;
  }
};

export const getQuestionsByQuizzIdApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `adminPanel/getQuestionsByQuizId/${paramDetails?.quizzId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting questions by quizz id :", error);
    throw error;
  }
};

export const attemptQuizzApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.post(
      `webContains/attemptQuiz/${paramDetails?.quizzId}`,
      paramDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error while submitting quizz answer :", error);
    throw error;
  }
};

export const getQuizzResultApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getQuizResult?quizId=${paramDetails?.quizId}&attemptId=${paramDetails?.attemptId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting quizz result :", error);
    throw error;
  }
};

export const getLeaderBoardApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getleaderBoard/${paramDetails?.quizzId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting leader board :", error);
    throw error;
  }
};

export const getLecturesOfSubjectApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getLecturesOfSubject?subjectId=${paramDetails?.subjectId}&batchSlug=${paramDetails?.batchSlug}`
    );
    // console.log("Fetched lectures: kjdfbgkbdkgb", response.data);
    return response.data;
  } catch (error) {
    console.log("Error getting lecture of Subject :", error);
    throw error;
  }
};

export const getBatchCommunityApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `user/getBatchCommunities?batchId=${paramDetails?.batchId}&page=${paramDetails?.page}&pageSize=${paramDetails?.pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting batch community :", error);
    throw error;
  }
};
export const getBatchMycommunitiesApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `user/getBatchMyCommunities?batchId=${paramDetails?.batchId}&page=${paramDetails?.page}&pageSize=${paramDetails?.pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting my batch communities :", error);
    throw error;
  }
};

export const createCommunityApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.post(
      "user/createCommunity",
      paramDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error while creating cummunity :", error);
    throw error;
  }
};

export const getAnnouncementsByBatchApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `webContains/getAnnouncementsByBatch/${paramDetails?.batchSlug}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting announcements :", error);
    throw error;
  }
};

export const likeOrRemoveLikeOfShortApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.post(
      "learning/likeOrRemoveLikeOfShort",
      paramDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error while sending like :", error);
    throw error;
  }
};

export const viewedApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.post("learning/viewed", paramDetails);
    return response.data;
  } catch (error) {
    console.log("Error while sending viewed :", error);
    throw error;
  }
};

export const getReferralTransApi = async () => {
  try {
    const response = await axiosInstance.get("adminPanel/getRefaralTxn");
    return response.data;
  } catch (error) {
    console.log("Error getting referral trans :", error);
    throw error;
  }
};

export const getAllPostsApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `community/getAllPosts?page=${paramDetails?.page}&pageSize=${paramDetails?.pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting all posts :", error);
    throw error;
  }
};

export const likeOrRemoveLikeApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.post(
      `learning/likeOrRemoveLike?postId=${paramDetails?.postId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while sending like :", error);
    throw error;
  }
};

export const getPostByIdApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `community/getPostById/${paramDetails?.postId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting post :", error);
    throw error;
  }
};

export const getCommentsByPostIdApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      `community/getCommentsByPostId/${paramDetails?.postId}?page=${paramDetails?.page}&pageSize=${paramDetails?.pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting comments :", error);
    throw error;
  }
};

export const addCommentsToPostApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.get(
      "community/addCommentToPost",
      paramDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error while sending comment :", error);
    throw error;
  }
};

export const updateIsReadNotificationApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.put(
      `Notification/updateIsRead/${paramDetails?.notificationId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error while is read :", error);
    throw error;
  }
};

export const createCtaApi = async (paramDetails: any) => {
  try {
    const response = await axiosInstance.post(
      "webContains/createCTA",
      paramDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error while creating Cta :", error);
    throw error;
  }
};
