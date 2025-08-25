"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import headingUnderline from "@/assets/images/home/heading-underline.png";
import card from "@/assets/images/course-card/card.png";
import card1 from "@/assets/images/course-card/card1.png";
import ptm from "@/assets/images/course-card/ptm.png";
import dailypp from "@/assets/images/course-card/dailypp.png";
import card5 from "@/assets/images/course-card/card5.png";
import card6 from "@/assets/images/course-card/card6.png";
import MobileWithMsg from "@/assets/images/course-card/coursefeatures.png";

const cardData = [
	{
		title: "Live & Recorded Classes",
		image: card,
		bg: "bg-[#F2ECFF]",
	},
	{
		title: "Mock Tests & Quizzes",
		image: card1,
		bg: "bg-[#FFE7DF]",
	},
	{
		title: "Parent-Teacher Meetings",
		image: ptm,
		bg: "bg-[#FFE7DF]",
	},
	{
		title: "Daily Practice Paper",
		image: dailypp,
		bg: "bg-[#F2ECFF]",
	},
	{
		title: "Doubt Solving Sessions",
		image: card5,
		bg: "bg-[#F2ECFF]",
	},
	{
		title: "Mentorship",
		image: card6,
		bg: "bg-[#FFE7DF]",
	},
];

function CourseFeature() {
	return (
		<section className="px-4 md:px-10">
			<div className="flex flex-row gap-2 text-2xl font-semibold py-5">
				Course
				<span className="flex flex-col">
					<span>Features</span>
					<span>
						<Image
							src={headingUnderline}
							width={100}
							height={100}
							alt="Course"
						/>
					</span>
				</span>
			</div>

			<div className="flex flex-col lg:flex-row w-full gap-6">
				{/* Cards */}
				<div className="w-full py-5 flex flex-col justify-center h-full">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
						{cardData.map((card, index) => (
							<Card
								key={index}
								className={`rounded-xl border-none ${card.bg} shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full h-auto min-h-[180px] md:min-h-[220px] flex`}
							>
								<CardContent className="flex flex-col items-center justify-center text-center h-full p-5">
									<Image
										src={card.image}
										width={140}
										height={90}
										alt={card.title}
										className="mx-auto mb-2 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] h-auto"
									/>
									<p className="text-[16px] font-semibold text-orange-700 mt-2">
										{card.title}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Mobile Image */}
				<div className="w-full lg:w-1/2 flex justify-center items-center py-6">
					<div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] aspect-[9/16]">
						<Image
							src={MobileWithMsg}
							alt="Mobile Features"
							fill
							className="object-contain"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CourseFeature;
