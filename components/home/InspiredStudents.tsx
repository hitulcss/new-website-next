import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import secondBannerImg from "@/assets/images/home/secondBanner.png";
import Image from 'next/image';

function InspiredStudents() {
    const serverImage = "https://static.sdcampus.com/Banner/Result_Updated_Banner_1751635566.jpg";
    const sliderImages = [
    "https://static.sdcampus.com/Banner/Sainik_Result_Slide_1749297919.jpg",
    "https://static.sdcampus.com/Banner/school/web_1745926452.jpg",
    "https://static.sdcampus.com/Banner/school/web_1745926452.jpg",
    "https://static.sdcampus.com/Banner/school/web_1745926452.jpg",
    "https://static.sdcampus.com/Banner/SD_Publication/TEACHING_EXAMS_1745495327.jpg",
    "https://static.sdcampus.com/Banner/tuition_dvcsx/web_1745926401.jpg",
  ];
  return (
    <section className="px-10 py-1">
      <div className="mb-7  text-left text-x md:text-2xl font-semibold sm:-ml-5 md:-ml-1 sm:-mt-10 md:-mt-0 " style={{fontFamily: 'inherit', fontWeight: 600}}>
        Quality Education <span className="text-[#FF0000] font-semibold">Record Breaking Results</span>
      </div>
       <div className="text-gray-500 py-0">
         {/* <p>
           Giving wings to a millions dreams,a million more to go
         </p> */}
       </div>

       <Carousel className="rounded-lg shadow-lg ">
         <CarouselContent>
           {sliderImages.map((img, index) => (
             <CarouselItem key={index}>
               <Card className={`hover:shadow-xl p-0 gap-0`}>
                 <CardContent className="h-full p-0">
                   <Image src={serverImage} width={1200} height={0}    alt="Books" />
                 </CardContent>
               </Card>
             </CarouselItem>
           ))}
         </CarouselContent>
         <CarouselPrevious className="left-2" />
         <CarouselNext className="right-2" />
       </Carousel>
     </section>
 )
}

export default InspiredStudents