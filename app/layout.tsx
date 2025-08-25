import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getCat } from "@/actions/home";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import { GoogleTagManager } from '@next/third-parties/google'
import Head from 'next/head';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Centralized meta configuration
const isProd = process.env.NODE_ENV === "production";
export const dynamic = "force-dynamic"; // Ensures the layout is always fresh
export const revalidate = 60; // Revalidate every 60 seconds
export const fetchCache = "force-no-store"; // Disable caching for this layout
export const runtime = "edge"; // Use Edge runtime for better performance
export const preferredRegion = "auto"; // Automatically select the best region
// export const fetchCategories = async () => {
//   try {
//     const categories = await getCat();
//     return categories;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }

export const metadata: Metadata = {
  title: 'SD Campus: India’s Most Affordable Ed-tech Platform for School and Government Entrance Examinations',
  description:
    'SD Campus is India’s premier online learning platform. Trusted by thousands of students...',
  keywords: ["sainik school preparation", "sainik school", "best sainik school preparation", 
    "sainik school entrance exam", "sainik school entrance exam preparation", "sainik school entrance exam coaching", 
    "sainik school entrance exam online coaching", "sainik school entrance exam online classes", 
    "sainik school entrance exam online course", "sainik school entrance exam online test series", 
    "sainik school entrance exam online mock test", "sainik school entrance exam online study material",
    "sainik school entrance exam online doubt clearing", "sainik school entrance exam online doubt clearing classes",
    "sainik school entrance exam online doubt clearing sessions", "sainik school entrance exam online doubt clearing classes",
    "jnvst preparation", "jnvst", "best jnvst preparation","jnvst entrance exam","jnvst entrance exam preparation",
    "jnvst entrance exam coaching", "jnvst entrance exam online coaching", "jnvst entrance exam online classes",
    "jnvst entrance exam online course", "jnvst entrance exam online test series","jnvst entrance exam online mock test",
    "jnvst entrance exam online study material", "jnvst entrance exam online doubt clearing", 
    "Online Tuition classes", "India best online plateform", "India's best online learning platform",
    "SD Campus", "Ed-tech", "Online Learning", "School Exams", "Government Exams", "Affordable Education",
    "SD Campus App", "SD Campus Download", "SD Campus Features", "SD Campus Courses", "SD Campus Teachers",
    "SD Campus Success Stories", "SD Campus Impact", "SD Campus YouTube", "SD Campus Resources",
    "SD Campus Study Resources", "SD Campus Educators", "SD Campus Student Success", "SD Campus Community",
    "SD Campus Learning", "SD Campus Online Courses", "SD Campus Online Learning", "SD Campus Online Education",
    "SD Campus Online Classes", "SD Campus Online Coaching", "SD Campus Online Test Series",
    "SD Campus Online Mock Test", "SD Campus Online Study Material", "SD Campus Online Doubt Clearing",
    "SD Campus Online Doubt Clearing Classes", "SD Campus Online Doubt Clearing Sessions",
    "SD Campus Online Doubt Clearing Classes", "SD Campus Online Learning Platform", "SD Campus Online Education Platform",
    "Online Classes", "SD Campus Online Learning App", "SD Campus Online Education App", "SD Campus Online Learning Platform",
    "SD Campus Online Education Platform", "SD Campus Online Learning App", "SD Campus Online Education App",
    "education", "online education", "online learning platform", "online learning app","online education app",
    "online courses", "online classes", "online coaching", "online test series", "online mock test",
    "online study material", "online doubt clearing", "online doubt clearing classes", "online doubt clearing sessions",
    "online doubt clearing classes", "online learning platform", "online education platform", "online learning app",
    "online education app", "SD Campus App Download", "SD Campus Features", "SD Campus Courses",
    "SD Campus Teachers", "SD Campus Success Stories", "SD Campus Impact", "SD Campus YouTube",
    "SD Campus Resources", "SD Campus Study Resources", "SD Campus Educators", "SD Campus Student Success",
    "SD Campus Community", "SD Campus Learning", "SD Campus Online Courses", "SD Campus Online Learning",
    "SD Campus Online Education", "SD Campus Online Classes", "SD Campus Online Coaching",
    "SD Campus Online Test Series", "SD Campus Online Mock Test", "SD Campus Online Study Material",
    "SD Campus Online Doubt Clearing", "SD Campus Online Doubt Clearing Classes", "SD Campus Online Doubt Clearing Sessions",
    "SD Campus Online Doubt Clearing Classes", "SD Campus Online Learning Platform", "SD Campus Online Education Platform",
    "SD Campus Online Learning App", "SD Campus Online Education App","SD Campus Online Learning Platform",
    "India's Most Affordable Ed-tech Platform", "SD Campus Online Learning Platform","SD Campus Online Education Platform",
    "SD Campus Online Learning App", "SD Campus Online Education App","Free Online Learning","Free Online Education",
    "Free Online Courses", "Free Online Classes", "Free Online Coaching", "Free Online Test Series",
    "Free Online Mock Test", "Free Online Study Material", "Free Online Doubt Clearing",
    "government exams preparation", "government exams", "best government exams preparation",
    "government exams entrance exam", "government exams entrance exam preparation", "government exams entrance exam coaching",
    "government exams entrance exam online coaching", "government exams entrance exam online classes",
    "government exams entrance exam online course", "government exams entrance exam online test series",
    "government exams entrance exam online mock test", "government exams entrance exam online study material",
    "government exams entrance exam online doubt clearing", "government exams entrance exam online doubt clearing classes",
    "government exams entrance exam online doubt clearing sessions", "government exams entrance exam online doubt clearing classes",
    "up police preparation", "up police", "best up police preparation","up police entrance exam", "up police entrance exam preparation",
    "up police entrance exam coaching", "up police entrance exam online coaching"," up police entrance exam online classes",
    "up police entrance exam online course", "up police entrance exam online test series","sd campus up police entrance exam online mock test",
    "up police entrance exam online study material", "up police entrance exam online doubt clearing",
    "up police entrance exam online doubt clearing classes", "up police entrance exam online doubt clearing sessions",
    "up police entrance exam online doubt clearing classes", "up police entrance exam online learning platform",
    "up police entrance exam online education platform", "up police entrance exam online learning app",
    "up police entrance exam online education app", "up police entrance exam online learning platform",
    "psychology course", "reasoning course", "english course", "maths course", "general knowledge course",
    "current affairs course", "general science course", "hindi course",
    "history course", "geography course", "political science course", "economics course",
    "environmental science course", "computer science course", "aptitude course", "logical reasoning course",
    "verbal reasoning course", "non-verbal reasoning course", "quantitative aptitude course",
    "verbal ability course", "numerical ability course", "data interpretation course",
    "general studies course", "general awareness course", "general knowledge and current affairs course",
    "competitive exams preparation", "competitive exams", "best competitive exams preparation",
    "competitive exams entrance exam", "competitive exams entrance exam preparation",
    "competitive exams entrance exam coaching", "competitive exams entrance exam online coaching",
    "competitive exams entrance exam online classes", "competitive exams entrance exam online course",
    "competitive exams entrance exam online test series", "competitive exams entrance exam online mock test",
    "competitive exams entrance exam online study material", "competitive exams entrance exam online doubt clearing",
    "competitive exams entrance exam online doubt clearing classes", "competitive exams entrance exam online doubt clearing sessions",
    "competitive exams entrance exam online doubt clearing classes", "competitive exams entrance exam online learning platform",
    "competitive exams entrance exam online education platform", "competitive exams entrance exam online learning app",
    "competitive exams entrance exam online education app", "competitive exams entrance exam online learning platform",
    "competitive exams entrance exam online education platform", "competitive exams entrance exam online learning app",
    "competitive exams entrance exam online education app", "SD Campus Online Learning Platform",
    "SD Campus Online Education Platform", "SD Campus Online Learning App", "SD Campus Online Education App",
    "SD Campus App Download", "SD Campus Features", "SD Campus Courses", "SD Campus Teachers",
    "spoken english course", "english speaking course", "english communication course",
    "english language course", "english grammar course", "english vocabulary course",
    "english writing course", "english reading course", "english listening course",
    "english pronunciation course", "english fluency course", "english conversation course",
    "english comprehension course", "english language skills course", "english language proficiency course",
    "english language development course", "english language learning course", "english language improvement course",
    "english language enhancement course", "english language training course", "english language coaching",
    "english language online coaching", "english language online classes", "english language online course",
    "english language online test series", "english language online mock test", "english language online study material",
    "english language online doubt clearing", "english language online doubt clearing classes",
    "english language online doubt clearing sessions", "english language online doubt clearing classes",
    "english language online learning platform", "english language online education platform",
    "english language online learning app", "english language online education app",
    "SD Campus Online Learning Platform", "SD Campus Online Education Platform", "SD Campus Online Learning App",
    "SD Campus Online Education App", "SD Campus App Download", "SD Campus Features", "SD Campus Courses",
    "SD Campus Teachers", "SD Campus Success Stories", "SD Campus Impact", "SD Campus YouTube",
    "SD Campus Resources", "SD Campus Study Resources", "SD Campus Educators", "SD Campus Student Success",
    "SD Campus Community", "SD Campus Learning", "SD Campus Online Courses", "SD Campus Online Learning",
    "SD Campus Online Education", "SD Campus Online Classes", "SD Campus Online Coaching",
    "SD Campus Online Test Series", "SD Campus Online Mock Test", "SD Campus Online Study Material",
    "SD Campus Online Doubt Clearing", "SD Campus Online Doubt Clearing Classes", "SD Campus Online Doubt Clearing Sessions",
    "pgt preparation", "pgt", "best pgt preparation", "pgt entrance exam",
    "pgt entrance exam preparation", "pgt entrance exam coaching", "pgt entrance exam online coaching",
    "delhi police preparation", "delhi police", "best delhi police preparation",
    "delhi police entrance exam", "delhi police entrance exam preparation", "delhi police entrance exam coaching",
    "delhi police entrance exam online coaching", "delhi police entrance exam online classes",
    "delhi police entrance exam online course", "delhi police entrance exam online test series",
    "delhi police entrance exam online mock test", "delhi police entrance exam online study material",
    "delhi police entrance exam online doubt clearing", "delhi police entrance exam online doubt clearing classes",
    "delhi police entrance exam online doubt clearing sessions", "delhi police entrance exam online doubt clearing classes",

  ],
  openGraph: {
    type: 'article',
    locale: 'en_US',
    title: 'SD Campus: India’s Most Affordable Ed-tech Platform...',
    description: 'SD Campus is India’s premier online learning platform...',
    url: 'https://store.sdcampus.com/',
    siteName: 'SD Campus',
    images: [
      {
        url: 'https://static.sdcampus.com/assets/app_download_1732957227.png',
        width: 1440,
        height: 754,
        alt: 'SD Campus App Download'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SD Campus: India’s Most Affordable Ed-tech Platform...',
    description: 'SD Campus is India’s premier online learning platform...',
    images: ['https://static.sdcampus.com/assets/app_download_1732957227.png'],
    site: '@SDCampus',
    creator: '@SDCampus',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  // themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SD Campus',
  },
  applicationName: 'SD Campus',
  formatDetection: {
    telephone: false,
  },
  // viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  // Additional meta tags for SEO and verification
  verification: {
    google: 'B2B59D78AE99C8D945049DDDBDBA76FF',
  },
  other: isProd
    ? {
        // Search Engine Verification
        "google-site-verification": "B2B59D78AE99C8D945049DDDBDBA76FF",
        "msvalidate.01": "B2B59D78AE99C8D945049DDDBDBA76FF",
        "p:domain_verify": "aa8d79331517ab80acdf98ec414b321c",
        "yandex-verification": "b2b59d78ae99c8d945049dddbdb76ff",
        "facebook-domain-verification": "FACEBOOK_VERIFICATION_CODE",
        "ahrefs-site-verification": "AHREFS_VERIFICATION_CODE",
        // Social Media
        "og:title": "SD Campus: India’s Most Affordable Ed-tech Platform for School and Government Entrance Examinations",
        "og:description": "SD Campus is India’s premier online learning platform. Trusted by thousands of students for its comprehensive courses and affordable pricing.",
        "og:image": "https://static.sdcampus.com/assets/app_download_1732957227.png",
        "og:url": "https://www.sdcampus.com/",
        "og:type": "website",
        "og:site_name": "SD Campus",
        "og:image:width": "1440",
        "og:image:height": "754",
        "twitter:card": "summary_large_image",
        "twitter:title": "SD Campus: India’s Most Affordable Ed-tech Platform...",
        "twitter:description": "SD Campus is India’s premier online learning platform. Trusted by thousands of students...",
        "twitter:image": "https://static.sdcampus.com/assets/app_download_1732957227.png",
        "twitter:site": "@SDCampus",
        "twitter:creator": "@SDCampus",
        "twitter:image:alt": "SD Campus App Download",
        "twitter:domain": "sdcampus.com",
        // Verification and Crawling
        "alexaVerifyID": "B2B59D78AE99C8D945049DDDBDBA76FF",
        // Security & Crawling
        "robots": "index, follow",
        "author": "Atul Yadav",
        "theme-color": "#ffffff",
        "application-name": "SD Campus",
        "mobile-web-app-capable": "yes",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "default",
        "apple-mobile-web-app-title": "SD Campus",
        "format-detection": "telephone=no",
        "msapplication-TileColor": "#ffffff",
        "msapplication-TileImage": "https://www.sdcampus.com/mstile-150x150.png",
        "msapplication-config": "https://www.sdcampus.com/browserconfig.xml",
        "viewport": "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      }
    : {},
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>SD Campus: India’s Most Affordable Ed-tech Platform for School and Government Entrance Examinations</title>
        <meta name="application-name" content="SD Campus" />
        <meta name="apple-mobile-web-app-title" content="SD Campus" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="p:domain_verify" content="aa8d79331517ab80acdf98ec414b321c"/>
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="https://www.sdcampus.com/mstile-150x150.png" />
        <meta name="msapplication-config" content="https://www.sdcampus.com/browserconfig.xml" />
        <meta name="google-site-verification" content="B2B59D78AE99C8D945049DDDBDBA76FF" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="msvalidate.01" content="B2B59D78AE99C8D945049DDDBDBA76FF" />
        <link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <link rel="apple-touch-icon" href="https://www.sdcampus.com/apple-touch-icon.png" />
        <link rel="manifest" href="https://www.sdcampus.com/manifest.json" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.sdcampus.com" />
        <link rel="preconnect" href="https://static.sdcampus.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://www.sdcampus.com/" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="SD Campus is India’s premier online learning platform. Trusted by thousands of students..." />
        <meta name="keywords" content="SD Campus, Ed-tech, Online Learning, School Exams, Government Exams, Affordable Education" />
        <meta name="author" content="SD Campus" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="B2B59D78AE99C8D945049DDDBDBA76FF" />
        <meta property="og:title" content="SD Campus: India’s Most Affordable Ed-tech Platform..." />
        <meta property="og:description" content="SD Campus is India’s premier online learning platform. Trusted by thousands of students..." />
        <meta property="og:image" content="https://static.sdcampus.com/assets/app_download_1732957227.png" />
        <meta property="og:url" content="https://www.sdcampus.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SD Campus" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="754" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SD Campus: India’s Most Affordable Ed-tech Platform..." />
        <meta name="twitter:description" content="SD Campus is India’s premier online learning platform. Trusted by thousands of students..." />
        <meta name="twitter:image" content="https://static.sdcampus.com/assets/app_download_1732957227.png" />
        <meta name="twitter:site" content="@SDCampus" />
        <meta name="twitter:creator" content="@SDCampus" />
        <meta name="twitter:image:alt" content="SD Campus App Download" />
        <meta name="twitter:domain" content="sdcampus.com" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="https://www.sdcampus.com/mstile-150x150.png" />
        <meta name="application-name" content="SD Campus" />
        <meta name="apple-mobile-web-app-title" content="SD Campus" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style " content="black-translucent" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="https://www.sdcampus.com/mstile-144x144.png" />
        <meta name="msapplication-config" content="https://www.sdcampus.com/browserconfig.xml" />
        <meta name="yandex-verification" content="b2b59d78ae99c8d945049dddbdb76ff" />
        <meta name="alexaVerifyID" content="B2B59D78AE99C8D945049DDDBDBA76FF" />
        <meta name="p:domain_verify" content="b2b59d78ae99c8d945049dddbdb76ff" />
        <meta name="msvalidate.01" content="B2B59D78AE99C8D945049DDDBDBA76FF" />
        <meta name="google-site-verification" content="B2B59D78AE99C8D945049DDDBDBA76FF" /> 
        JSON-LD Structured Data
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Organization",
              name: "SD Campus: India’s Most Affordable Ed-tech Platform...",
              url: "https://www.sdcampus.com/",
              logo: "https://www.sdcampus.com/logo.png",
              image: "https://static.sdcampus.com/assets/app_download_1732957227.png",
              email: "info@sdempire.co.in",
              description:
                "SD Campus is India’s premier online learning platform...",
              address: {
                "@type": "PostalAddress",
                postalCode: "201005",streetAddress: "Plot No-16, Block 7, Sector 5, Rajendra Nagar",
                addressCountry: "India",
                addressRegion: "Uttar Pradesh",
                addressLocality: "Ghaziabad"
              },
              telephone: "7428394519/7428394520",
              sameAs: [
                "https://www.facebook.com/sdcampus1",
                "https://www.instagram.com/sd_campus/",
                "https://www.youtube.com/@teachingexamssdcampus",
                "https://www.linkedin.com/company/sd-campus/",
                "https://twitter.com/SdCampus?t=954CVu6lwAprPboG5ca6dw&s=09"
              ]
            })
          }}
        />
        
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-712270860');
            `,
          }}
        /> */}
        {/* <!-- Google Tag Manager --> */}
        {/* <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TL7L7THB');</script> */}
        {/* <!-- End Google Tag Manager --> */}
        </Head>
        <GoogleTagManager gtmId="GTM-TL7L7THB" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* <!-- Google Tag Manager (noscript) --> */}
        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TL7L7THB"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}
        {/* <!-- End Google Tag Manager (noscript) --> */}

        <main className="flex-grow container mx-auto">
          
          {children}
          {/* <Footer /> */}
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
