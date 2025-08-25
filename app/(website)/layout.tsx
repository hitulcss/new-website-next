"use client";
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/header";
// console.log("Render Website Layout");
function WebsiteLayout({
  children,
}:any) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default WebsiteLayout;
