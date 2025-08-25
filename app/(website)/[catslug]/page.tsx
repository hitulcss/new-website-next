import { getCategoriesPage } from "@/actions/home";
import React from "react";
import AllCoursesPage from "@/components/all-courses-page/all-courses-page";
export async function generateMetadata({ params }: { params: any }) {
  const getParams = await params;
  const data = await getCategoriesPage(getParams);
  const pageTitle = data?.metaTitle || "Courses";
  const pageDescription = data?.metaDesc || "Explore our courses";
  const pageSlug = data?.slug ?? "";

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${pageSlug}`,
    },
  };
}

async function CategoryPage({ params }: { params: any }) {
  const getParams = await params;
  const resposeData = await getCategoriesPage(getParams);
  // console.log(resposeData, "test api");
  return <AllCoursesPage pageData={resposeData} />;
}

export default CategoryPage;
