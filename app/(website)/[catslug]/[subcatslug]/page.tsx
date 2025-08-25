import { getBatchDetailsBySlug, getCategoriesPage } from "@/actions/home";
import AllCoursesPage from "@/components/all-courses-page/all-courses-page";
import BatchDetails from "./__component/BatchDetails";

export default async function SubCatPage({ params }: { params: any }) {
  const { catslug, subcatslug } = await params;

  const responseData = await getCategoriesPage({ catslug, subcatslug });

  const isCoursePage = responseData?.getAllBatchesDetails?.status === true;

  if (!isCoursePage) {
    const batchInfo = await getBatchDetailsBySlug(subcatslug);
    responseData.batchDetails = batchInfo ?? [];
    return <BatchDetails pageData={responseData} />;
  }

  return <AllCoursesPage pageData={responseData} />;
}
