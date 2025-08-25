"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Book images
import Cbs9thClass from "@/assets/images/books/cbs_9th.jpg";
import Cbs9thClassFront from "@/assets/images/books/cbs_9th_front.jpg";
import Sainik9th from "@/assets/images/books/sainik_9th.jpg";
import Front9th from "@/assets/images/books/front_9th.jpg";
import StudyGuide from "@/assets/images/books/study_guide_9th.jpg";
import SainikHindi from "@/assets/images/books/sainik_hindi_9th.jpg";
import SGuide from "@/assets/images/books/s_guide_9th.jpg";
import Class6thSainik from "@/assets/images/books/class_6th_sainik.jpg";
import JnvCombo from "@/assets/images/books/jnvcombo.jpg";
import JnvFront from "@/assets/images/books/jnvfront.jpg";
import S6thEng from "@/assets/images/books/s_6th_eng.jpg";
import S6thEback from "@/assets/images/books/s_6th_eback.jpg";
import SEngSP from "@/assets/images/books/s_eng_sp.jpg";
import SEngSPBack from "@/assets/images/books/s_eng_spback.jpg";

const books = [
  {
    img: Cbs9thClass,
    imgFront: Cbs9thClassFront,
    title: "5 Book Combo for Class 9",
    link: "https://sdpublication.com/product/5-book-combo-for-aissee-sainik-school-2025-comprehensive-study-guides-with-5000-practice-questions-for-class-9-includes-general-science-social-science-intelligence-and-mathematics-ideal-for-jnv-rms-chs-rimc-exams",
  },
  {
    img: SainikHindi,
    imgFront: Class6thSainik,
    title: "Hindi Medium Combo Class 6",
    link: "https://sdpublication.com/product/aissee-all-india-sainik-school-entrance-exam-2025-class-6-2-book-combo-comprehensive-study-guides-with-solved-papers-and-practice-sets-hindi-sd-publications",
  },
  {
    img: Sainik9th,
    imgFront: Front9th,
    title: "Complete Study Guide Class 9",
    link: "https://sdpublication.com/product/comprehensive-study-guide-for-aissee-sainik-school-2026-social-science-english-class-9",
  },
  {
    img: StudyGuide,
    imgFront: SGuide,
    title: "Subject-wise Prep Guide",
    link: "https://sdpublication.com/product/sainik-school-2026-complete-chapter-wise-study-guide-intelligence-class-9-1100-practice-questions-with-explanations-language-english-publisher-sd-publication-paperback-sd-publication",
  },
  {
    img: SEngSP,
    imgFront: S6thEng,
    title: "English Medium Combo Class 6",
    link: "https://sdpublication.com/product/aissee-all-india-sainik-school-entrance-exam-2025-class-6-2-book-combo-comprehensive-study-guide-with-solved-papers-and-practice-sets-english-sd-publications",
  },
  {
    img: JnvCombo,
    imgFront: JnvFront,
    title: "JNV Entrance Exam Combo",
    link: "https://sdpublication.com/book5",
  },
  {
    img: S6thEng,
    imgFront: S6thEback,
    title: "Sainik School Guide Class 6",
    link: "https://sdpublication.com/product/sainik-school-class-6-guide-solved-paper-practice-sets-english-medium",
  },
  {
    img: SEngSP,
    imgFront: SEngSPBack,
    title: "Class 6 Solved Papers - English",
    link: "https://sdpublication.com/product/sainik-class-6-solved-paper-practice-sets-english-medium",
  },
];

export default function StudyResources() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-12">
      <div className="mb-6 text-left text-x md:text-2xl font-semibold sm:-ml-0 md:-ml-6 mt-0 md:mt-1" style={{fontFamily: 'inherit', fontWeight: 600}}>
        Study Resources for <span className="text-[#FF0000] font-semibold">School Entrance Exam Preparation</span>
      </div>
      
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20} 
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="pb-8"
      >
        {books.map((book, idx) => (
          <SwiperSlide key={idx}>
            <BookCard
              image={book.img}
              backImg={book.imgFront}
              title={book.title}
              link={book.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function BookCard({
  image,
  backImg,
  title,
  link,
}: {
  image: any;
  backImg: any;
  title: string;
  link: string;
}) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <Link href={link} target="_blank" className="block group h-full">
      <div
        className="relative w-full aspect-[3/3.7] overflow-hidden  shadow-md transform transition-transform duration-500 group-hover:scale-105 mt-6"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onTouchStart={() => setIsFlipped(true)}
        onTouchEnd={() => setIsFlipped(false)}
      >
        <Image
          src={image}
          alt={title}
          className={`object-contain absolute inset-0 w-full h-full transition-opacity duration-300 ${
            isFlipped ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
        <Image
          src={backImg}
          alt={`${title} Back`}
          className={`object-contain absolute inset-0 w-full h-full transition-opacity duration-300 ${
            isFlipped ? "opacity-100" : "opacity-0"
          }`}
          priority
        />
      </div>

      <div className="mt-4 space-y-2 text-center cursor-pointer">
        <p className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
          {title} 
        </p>
        <Button className="w-full bg-orange-600 text-white hover:bg-orange-700 text-xs sm:text-sm rounded cursor-pointer">
          Buy Now
        </Button>
      </div>
    </Link>
  );
}
