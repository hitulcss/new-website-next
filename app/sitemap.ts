// app/sitemap.js
// import axiosInstance from "@/lib/axios";
import { getCat } from "@/actions/home";
const homepage = "https://www.sdcampus.com";
export default async function sitemap() {
  const categories = await getCat();
  // console.log(response,"/get category API");
  // let headerData = response.data.data;
  const services = categories.flatMap(
    (item: any) =>
      item?.subCategories?.map((sub: any) => ({
        url: `${homepage}/${item?.slug}/${sub?.slug}`,
        lastModified: new Date().toISOString(),
      })) || []
  );

  const routes = [
    "", // Home
    "about/",
    "contact-us/",
    "privacy-policy/",
    "return-and-refund-policy/",
    "terms-and-conditions/",
    "edu--details/",
  ].map((route) => ({
    url: `${homepage}/${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...services];
}
