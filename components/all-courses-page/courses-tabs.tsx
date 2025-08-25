"use client";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const tabs = [
	{ id: "all", label: "ALL" },
	{ id: "batches", label: "Batches for School Entrance Exams" },
	{ id: "jnv", label: "JNV SCHOOL" },
	{ id: "combo", label: "COMBO BATCH (JNV | SAINIK)" },
];

const SchoolEntranceExams = ({
	categories,
	batchesData,
}: {
	categories: any;
	batchesData: any;
}) => {
	const params = useParams();

	const matchedCategory = categories.find(
		(category: any) => category.slug === params.catslug
	);

	// console.log(batchesData, "matched cated khdfjb");
	const [activeTab, setActiveTab] = useState("all");

	useEffect(() => {
		const subCat = params?.subcatslug;
		if (subCat) {
			// console.log(subCat, "Sub cat");
			setActiveTab(subCat.toString());
		}
	}, []);
	//   console.log(batchesData, "getbacthes");
	return (
		<section className="py-8 px-4 sm:px-10 bg-[#fffefb]">
			<p className="text-gray-500 mb-2">Home &gt;  {matchedCategory?.slug

				?.split('-')
				.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')}
			</p>
			<h1 className="font-bold mb-6 whitespace-nowrap overflow-hidden text-ellipsis w-full text-base sm:text-2xl">
				Batches for<span className="px-2 text-orange-500 whitespace-nowrap text-base sm:text-2xl">{
					matchedCategory?.slug
						?.split('-')
						.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')
				}</span>
			</h1>

			{/* Tabs */}
			<div className="flex flex-nowrap gap-2 sm:gap-4 border-b border-gray-200 mb-4 overflow-x-auto scrollbar-hide w-full">
				<Link href={`/${matchedCategory?.slug}`}>
					<Button
						className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm cursor-pointer ${activeTab === "all"
							? "border-b-2 border-orange-600 bg-orange-500 text-white"
							: "text-gray-600 bg-white hover:text-white"
							}`}
						onClick={() => setActiveTab("all")}
					>
						All
					</Button>
				</Link>
				{matchedCategory &&
					matchedCategory?.subCategories?.map((tab: any) => (
						<Link
							href={
								params?.subcatslug
									? `${tab?.slug}`
									: `${matchedCategory.slug}/${tab?.slug}`
							}
							key={tab.id}
						>
							<Button
								className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm cursor-pointer ${activeTab === tab.slug
									? "border-b-2 border-orange-600 bg-orange-500 text-white"
									: "text-gray-600 bg-white hover:text-white"
									}`}
								onClick={() => setActiveTab(tab.slug)}
							>
								{tab.title}
							</Button>
						</Link>
					))}
				<style>{`
		  .scrollbar-hide::-webkit-scrollbar { display: none; }
		  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
		`}</style>
			</div>
			{/* Tab Content */}
			<div className="mt-4 text-gray-700">
				{batchesData && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{batchesData?.batches.map((batch: any, index: number) => (
							<div
								key={index}
								className="w-full rounded-[12px] border border-gray-300 shadow-md p-2 bg-white"
							>
								{/* Top tags row */}
								<div className="flex justify-between items-center mb-2">
									<span className={
										batch?.language === "en"
											? "bg-gradient-to-r from-red-600 to-red-200 text-[10px] sm:text-xs font-bold px-2 py-1 rounded shadow-md uppercase tracking-wide"
											: "bg-gradient-to-r from-green-600 to-green-200 text-[10px] sm:text-xs font-bold px-2 py-1 rounded shadow-md uppercase tracking-wide"
									}>
										{batch?.language === "en" ? "English" : "Hinglish"}
									</span>
									<span className="bg-blue-900 text-white text-xs font-bold px-2 py-1 shadow-md uppercase tracking-wide">
										{batch?.batchId}
									</span>
								</div>
								<img
									src={batch?.banner ?? ""}
									alt="Batch"
									className="w-full rounded-t-[12px] -mt-0.5"
								/>
							<hr className="mb-3" />
							{/* Truncate batch name + batch id to 50 chars, show ... if longer, as in HomeClient.tsx */}
							<h4 className="text-gray-500 flex justify-center font-bold ">
								{(() => {
									const nameWithId = `${batch?.batchName}-${batch?.batchId}`;
									return nameWithId.length > 50 ? nameWithId.slice(0, 50) + '...' : nameWithId;
								})()}
							</h4>

								<div className="flex justify-between gap-2 mt-4">
									<Link
										className="w-full"
										href={
											params?.subcatslug
												? `${batch.batchSlug}`
												: `${matchedCategory.slug}/${batch.batchSlug}`
										}
									>
										<button className="w-full h-[46px] rounded-[6px] border border-[#FF3D00] bg-white text-[#FF3D00] font-medium cursor-pointer">
											Explore
										</button>
									</Link>
									<Link
										className="w-full"
										href={
											params?.subcatslug
												? `${batch.batchSlug}`
												: `${matchedCategory.slug}/${batch.batchSlug}`
										}
									>
										<button className="w-full h-[46px] cursor-pointer rounded-[6px] border border-[#FF3D00] bg-[#FF3D00] text-white font-medium">
											Buy Now
										</button>
									</Link>
								</div>
							</div>
						))}
					</div>
				)}

				{activeTab === "batches" && (
					<p>Here are the dedicated batches for school entrance exams.</p>
				)}
				{activeTab === "jnv" && (
					<p>Explore JNV school entrance batches here.</p>
				)}
				{activeTab === "combo" && (
					<p>Combined JNV & SAINIK batch information.</p>
				)}
			</div>
		</section>
	);
};

export default SchoolEntranceExams;
