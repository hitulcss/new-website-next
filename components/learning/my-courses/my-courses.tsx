"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import useFetch from '@/hooks/use-fetch';
import { getMyCourses } from '@/actions/home';

function MyCourses() {
  const { loading: loadingcourses, data: courses, fn: fnGetCourses } = useFetch(getMyCourses)
  const params = { subcatslug: null }; // Simulating useParams, replace with actual useParams if needed
  useEffect(() => {
    const getCourses = async () => {
      await fnGetCourses();
    }
    getCourses();

  }, [])

  //  console.log(courses,"courses list");
  const pageData = {};
  if (loadingcourses) {
    return "Loading..."
  }
  return (
    <section className="pl-6 pr-2 sm:px-6 py-6 max-w-6xl mx-auto">
      <p className="text-gray-500 mb-2">Home &gt; My Courses</p>
      <h1 className="text-2xl font-bold mb-6">
        My Courses
        <span className="px-2 text-2xl text-orange-500">
          {params?.subcatslug ? params.subcatslug : "All"}
        </span>
      </h1>
      <p className="text-gray-500 mb-4">
        Here you can find all the courses you have enrolled in. Click on the
        "Explore" button to view the course details or "Buy Now" to purchase
        the course if you haven't already.
      </p>
      <hr className="mb-6" />
      <h2 className="text-xl font-semibold mb-4">My Enrolled Courses</h2>
      {courses && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {courses.map((course: any, index: number) => (
            <div
              key={index}
              className="w-full rounded-[12px] border border-gray-300 shadow-md p-2"
            >
              <img
                src={course?.banner ?? null}
                alt="course"
                className="w-full rounded-t-[12px]"
              />
              <hr className="mb-3" />
              <h4 className="text-gray-500 flex justify-center font-bold ">
                {course?.batchName}
              </h4>

              <div className="flex justify-between gap-2">

                <Link
                  className="w-full"
                  href={
                    `my-courses/c/${course?.slug}`
                  }
                >
                  <button className="w-full h-[46px] cursor-pointer rounded-[6px] border border-[#FF3D00] bg-[#FF3D00] text-white font-medium">
                    Lets Study
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyCourses;
