import Banner from "@/components/home/Banner";

export default function SchoolEntrance() {
  const BannerData = [
    {
      title: "school",
      url: "https://static.sdcampus.com/Banner/school/web_1745926452.jpg",
      banner: "https://static.sdcampus.com/Banner/school/web_1745926452.jpg",
      linkWith: "66101985f892473994b3dab1",
      categoryDetails: {
        id: "66101985f892473994b3dab1",
        title: "School Entrance Exams",
        slug: "school-entrance-exams",
        tags: ["SAINIK", "JNV"],
      },
      batchDetails: {
        id: "NA",
        batchName: "NA",
        slug: "NA",
      },
      link: "category",
      language: "en",
    },
    {
      title: "School exams diwali banners",
      url: "https://static.sdcampus.com/Banner/School_exams_diwali_banners/web_1745926477.jpg",
      banner: "https://static.sdcampus.com/Banner/school/web_1745926452.jpg",
      linkWith: "66101985f892473994b3dab1",
      categoryDetails: {
        id: "66101985f892473994b3dab1",
        title: "School Entrance Exams",
        slug: "school-entrance-exams",
        tags: ["SAINIK", "JNV"],
      },
      batchDetails: {
        id: "NA",
        batchName: "NA",
        slug: "NA",
      },
      link: "category",
      language: "en",
    },
  ];
  return (
    <>
      <Banner bannerData={BannerData} />
      HII
      {/* Another Section */}
      <section className="w-full max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-3xl font-bold mb-4">About Our Platform</h2>
        <p className="text-gray-700 leading-relaxed">
          We are dedicated to providing high-quality education for every
          student. Our mission is to build a strong foundation with experienced
          educators, structured content, and smart learning tools.
        </p>
      </section>
    </>
  );
}
