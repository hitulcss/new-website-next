"use server";
import React from "react";
import Home from "@/components/Home";
import { getBanner, getCat, getAllTeachers, getAllTestimonal } from "@/actions/home";
import WebsiteLayout from "./(website)/layout";
const HomePage = async () => {
  const bannerData = await getBanner();
  const categoryData = await getCat();
  const teachersData = await getAllTeachers({limit:25});
  const testimonalData = await getAllTestimonal();
  return (
    <WebsiteLayout>
      <Home bannerData={bannerData} categoryData={categoryData} teachersData = {teachersData} testimonalData = {testimonalData} />
    </WebsiteLayout>
  );
};
export default HomePage;
