"use client";
import React, { useEffect, useState } from "react";
import SainikSchoolPage from "@/components/course-description/SainikSchoolPage";
import EducatorsSection from "@/components/home/EducatorsSection";
import StudentSuccess from "@/components/home/StudentSuccess";
import MobilePopup from '@/components/popups/MobilePopup';


function BatchDetails({ pageData }: { pageData: any }) {
  useEffect(() => {
    if (!pageData) {
      console.error("No page data available");
    }
  }, [pageData]);
  if (!pageData) {
    return <div>No data available</div>;
  }
  const [showModal, setShowModal] = useState(true);
  
  return (
    <div>
      <SainikSchoolPage batchDetails={pageData?.batchDetails?.data} />
      <EducatorsSection teachersData={pageData?.getAllStaff?.data} />
      <StudentSuccess testimonalData={pageData?.getAllTestimonal?.data} />
      <MobilePopup isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default BatchDetails;
