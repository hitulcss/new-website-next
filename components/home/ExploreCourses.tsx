"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import exploreNow from "@/assets/images/home/explore-now.png";
import Link from 'next/link';

function ExploreCourses({ categoryData }: { categoryData: any }) {
  console.log(categoryData);

  return (
    <section className="px-10">
      <div className="flex flex-row py-4 -ml-8">
        <span>
          <Image src={exploreNow} alt="" />
        </span>
        <span>
          <h2 className="text-2xl md:text-2xl py-2  -ml-2 md:-ml-3 font-semibold">
            Explore <span className="text-primary">courses</span>
          </h2>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Link href="/school-entrance-exams/sainik-school" passHref>
      
        <Card
          className="hover:shadow-xl bg-[url('../assets/images/home/sainikaipic.png')] bg-no-repeat bg-right h-[414px]"
        >
          <CardHeader>
            <CardTitle className="text-xl">
              Sainik Schools Entrance Exams(AISSEE)
            </CardTitle>
            <CardDescription>Class 6th & 9th</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="flex flex-col w-1/2 gap-2">
              <Button className="cursor-pointer">Class 6th </Button>
              <Button className="cursor-pointer" variant="secondary">
                Class 9th{" "}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-5">
            <Button className="w-full bg-button py-5 hover:shadow-xl shadow text-lg cursor-pointer">
              Explore Courses
            </Button>
          </CardFooter>
        </Card>
      </Link>
      <Link href="/school-entrance-exams/jnv-school" passHref>
        <Card
          className={`hover:shadow-xl bg-[url('../assets/images/home/jnvai.png')] bg-no-repeat bg-right h-[414px]`}
        >
          <CardHeader>
            <CardTitle className="text-xl">
              Jawahar Navodaya Vidyalaya Exams
            </CardTitle>
            <CardDescription>Class 6th & 9th</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="flex flex-col w-1/2 gap-2">
              <Button className="cursor-pointer">Class 6th </Button>
              <Button className="cursor-pointer" variant="secondary">
                Class 9th{" "}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-5">
            <Button className="w-full bg-button py-5 hover:shadow-xl shadow text-lg cursor-pointer">
              Explore Courses
            </Button>
          </CardFooter>
        </Card>
      </Link>
      <Link href="/competitive-exam" passHref>
        <Card
          className={`hover:shadow-xl bg-[url('../assets/images/home/comboai.png')] bg-no-repeat bg-right h-[414px]`}
        >
          <CardHeader>
            <CardTitle className="text-xl">
              Competitive Exams
            </CardTitle>
            <CardDescription>All Exams Courses</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="flex flex-col w-1/2 gap-2">
              <Button className="cursor-pointer">Delhi Police</Button>
              <Button className="cursor-pointer" variant="secondary">
                UP Police{" "}
              </Button>
              {/* <Button className="" variant="secondary">
                TUITIONS{" "}
              </Button> */}
            </div>

            {/* <div className="mt-25">
                <Button className="w-full bg-button py-5 hover:shadow-xl shadow text-lg">
                  Explore Courses
                </Button>
              </div> */}
          </CardContent>
          <CardFooter className="flex justify-between mt-5">
            <Button className="w-full bg-button py-5 hover:shadow-xl shadow text-lg cursor-pointer">
              Explore Courses
            </Button>
          </CardFooter>
        </Card>
        </Link>
        <Link href="/tuition-classes" passHref>
        <Card
          className={`hover:shadow-xl bg-[url('../assets/images/home/tuitionai.png')] bg-no-repeat bg-right h-[414px]`}
        >
          <CardHeader>
            <CardTitle className="text-xl">Tuition Classes</CardTitle>
            <CardDescription>Class 9th & 10th</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="flex flex-col w-1/2 gap-2">
              <Button className="cursor-pointer">CBSE Board</Button>
              <Button className="cursor-pointer" variant="secondary">
                State Board{" "}
              </Button>
            </div>
          </CardContent>
           <CardFooter className="flex justify-between mt-5">
            <Button className="w-full bg-button py-5 hover:shadow-xl shadow text-lg cursor-pointer">
              Explore Courses
            </Button>
          </CardFooter>
        </Card>
        </Link>
      </div>
    </section>
  );
}

export default ExploreCourses;
