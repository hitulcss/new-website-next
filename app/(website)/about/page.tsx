//Website Url: http://localhost:3000/about
import React from "react";
import About from "@/app/(website)/about/_component/About";
// export async function generateMetadata() {
//   return {
//     title: "About us",
//     description: "About Us",
//     alternates: {
//       canonical: "about/",
//     },
//   };
// }
function AboutPage() {
  return (
    <>
      <About />
    </>
  );
}

export default AboutPage;
