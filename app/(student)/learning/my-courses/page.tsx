import React from 'react';
import MyCourses from '@/components/learning/my-courses/my-courses';
import { Metadata } from 'next';
// import { getLecturesByBatchSlug, getMyCourses } from "@/actions/home";

export const metadata: Metadata = {
  title: 'My Courses',
  description: 'View and manage your enrolled courses',
  keywords: ['courses', 'learning', 'education', 'my courses'],
  openGraph: {
    title: 'My Courses',
    description: 'View and manage your enrolled courses',
    url: 'https://yourwebsite.com/my-courses',
    siteName: 'SD Campus',
    images: [
      {
        url: 'https://yourwebsite.com/images/my-courses.png',
        width: 1200,
        height: 630,
        alt: 'My Courses',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Courses',
    description: 'View and manage your enrolled courses',
    images: ['https://yourwebsite.com/images/my-courses.png'],
  },
};

// const myCourses = await getMyCourses();
// const pageData = { myCourses };

function page() {
  return (
    <MyCourses/>
  )
}

export default page
