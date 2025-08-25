import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
});

export default function YouTubeSection() {
  const channels = [
    {
      name: "SD CAMPUS : Sainik | JNV | RMS",
      link: "https://www.youtube.com/@SDCAMPUSSAINIKJNVRMS?sub_confirmation=1",
    },
    {
      name: "SD CAMPUS : My Tuition Class",
      link: "https://www.youtube.com/@sdcampusmytuitionclass?sub_confirmation=1",
    },
    {
      name: "SD Campus",
      link: "https://www.youtube.com/@sdcampusofficial?sub_confirmation=1",
    },
  ];

  return (
    <section className="py-14 px-6 md:px-10 bg-gradient-to-b from-white to-[#f3f4f6]">
      <div className="mb-6 text-left text-x md:text-2xl font-semibold -ml-2 md:-ml-0" style={{fontFamily: 'inherit', fontWeight: 600}}>
        Stay Tuned With <span className="text-[#FF0000] font-semibold">SD Campus YouTube</span> Channels
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {channels.map((channel) => (
          <Link
            key={channel.link}
            href={channel.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${channel.name} on YouTube`}
            title={`Visit ${channel.name} on YouTube`}
            className="group relative p-[2px] rounded-xl bg-gradient-to-br from-[#e4cfa3] to-[#f5e9c4] shadow-[inset_0_0_6px_rgba(255,255,255,0.3),0_12px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.15)] transition-all duration-300"
          >
            <div className="bg-white rounded-[12px] p-6 flex flex-col items-center h-full shadow-[inset_0_4px_6px_rgba(255,255,255,0.6)] group-hover:scale-[1.015] transition-transform duration-300">
              <div className="w-full flex justify-center mb-4">
                <div className="bg-[#FF0000] w-20 h-12 flex items-center justify-center text-white text-3xl font-bold rounded-md shadow-[0_6px_14px_rgba(0,0,0,0.25)] group-hover:translate-y-[-2px] transition-all">
                  <FaYoutube />
                </div>
              </div>

              <p className="text-center text-base font-medium text-gray-800 leading-snug">
                {channel.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
