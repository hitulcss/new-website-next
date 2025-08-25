import axiosInstance from "@/lib/axios";

export const subjectDetailsAPI = async (subjectId: string, batchSlug: string) => {
    try {
        const response = await axiosInstance.get(`webContains/getLecturesOfSubject?subjectId=${subjectId}&batchSlug=${batchSlug}`);
        const response2 = await axiosInstance.get(`webContains/getNotes?subjectId=${subjectId}&batchSlug=${batchSlug}`);
        
        return { lectures: response.data, notes: response2.data };
    } catch (error) {
        console.error("Error in getting subject details :", error);
        throw error;
    }
}

export const liveLectureAPI = async (lectureId: string, batchSlug: string) => {
    try {
        const response = await axiosInstance.get(`webContains/getLecture?id=${lectureId}&batchSlug=${batchSlug}`);
        
        return response.data;
    } catch (error) {
        console.error("Error in getting live lecture details :", error);
        throw error;
    }
}
