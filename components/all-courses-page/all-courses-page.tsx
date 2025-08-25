"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/components/home/Banner";
import EducatorsSection from "../home/EducatorsSection";
import StudentSuccess from "../home/StudentSuccess";
import CourseTabs from "./courses-tabs";
const AllCoursesPage = ({ pageData }: { pageData: any }) => {
  const { bannerData, teachersData, testimonalData, batchesData } = pageData;
  const subcategory = pageData?.getAllCategory?.data ?? "";
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* <p>idsigbib{pageData && JSON.stringify(pageData)}</p> */}
      <Banner bannerData={pageData?.getBanner?.data} />
      <CourseTabs
        categories={subcategory}
        batchesData={pageData?.getAllBatchesDetails?.data}
      />
      <EducatorsSection teachersData={pageData?.getAllStaff?.data} />
      {/* <CheckoutModal /> */}
      <StudentSuccess testimonalData={pageData?.getAllTestimonal?.data} />
    </div>
  );
};

export default AllCoursesPage;
