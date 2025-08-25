"use client";
import React, { useEffect } from "react";
import Banner from "@/components/home/Banner";
import EducatorsSection from "./home/EducatorsSection";
import ExploreCourses from "./home/ExploreCourses";
import CourseFearure from "./home/CourseFearure";
import FormSection from "./home/FormSection";
import StudyResources from "./home/StudyResources";
import InspiredStudents from "./home/InspiredStudents";
import StudentSuccess from "./home/StudentSuccess";
import OurImpactSection from "./home/OurImpactSection";
import YouTubeSection from "./home/YouTubeSection";
import AOS from "aos";
// import useFetch from "@/hooks/use-fetch";
// import { getBanner } from "@/actions/home";
function Home({ bannerData, categoryData, teachersData, testimonalData }: { bannerData: any, categoryData: any, teachersData: any, testimonalData: any }) {


  // const { loading, error, fn: fnGetBanner } = useFetch(getBanner);

  // useEffect(() => {
  //   const fetchBanner = async () => {
  //     await fnGetBanner();
  //   };
  //   fetchBanner();
  // }, []);


  useEffect(() => {
    AOS.init({
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease',
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Banner bannerData={bannerData} />
      <ExploreCourses categoryData={categoryData} />
      <CourseFearure />
      <FormSection />
      <StudyResources />
      <InspiredStudents />
      <EducatorsSection teachersData={teachersData} />
      <StudentSuccess testimonalData={testimonalData} />
      <OurImpactSection />
      <YouTubeSection />
    </div>
  );
}

export default Home;
