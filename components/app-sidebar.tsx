"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconGift,
  IconCoins,
  IconSpeakerphone,
  IconMessage2,
  IconHelp,
  IconInfoCircle,
  IconListDetails,
  IconBook2,
  IconInnerShadowTop,
} from "@tabler/icons-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logoImage from "@/public/logo.webp";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getItem } from "@/lib/storage";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Home", url: "/learning/home", icon: IconDashboard },
    { title: "My Courses", url: "/learning/my-courses", icon: IconListDetails },
    { title: "Quick-Learning", url: "#", icon: IconChartBar },
    { title: "Test Series", url: "https://exams.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp", icon: IconFolder },
    { title: "Exams", url: "#", icon: IconBook2 },
    { title: "Publication", url: "https://sdpublication.com/", icon: IconSpeakerphone },
    { title: "Refer & Earn", url: "/learning/refer-earn", icon: IconGift },
    { title: "Wallet", url: "/learning/wallet", icon: IconCoins },
    { title: "Feeds", url: "/learning/feeds", icon: IconMessage2 },
    { title: "Contact Us", url: "/learning/contact-us", icon: IconHelp },
    { title: "About Us", url: "/about", icon: IconInfoCircle },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<any>("");
  const pathname = usePathname();
  useEffect(() => {
    const storedUser = JSON.parse(getItem("userProfile") as string);
    // console.log(storedUser, "stroed user ");
    if (storedUser) {

      // const initials = parsed.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "U";

      setUser(storedUser);
    }
  }, []);

  return (
    <Sidebar
      className="bg-white shadow-xl rounded-xl p-4 w-[280px] text-gray-800 flex flex-col"
      collapsible="offcanvas"
      {...props}
    >
      {/* Header */}
      <SidebarHeader className="mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2"
            >
              <a href="#" className="flex items-center gap-3">
                {/* <IconInnerShadowTop className="text-orange-500 size-6" /> */}
                <Image src={logoImage} width={50} height={80} alt="Sd campus Logo" />
                <span className="text-xl font-bold tracking-tight">
                  SD Campus
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Static (non-scrollable) Content */}
      <SidebarContent className="flex-grow space-y-6">
        <div>
          <h4 className="text-sm font-semibold uppercase text-gray-400 px-2 mb-2">
            Navigation
          </h4>
          <ul className="space-y-2">
            {data.navMain.map((item, i) => {
              const isActive = pathname === item.url;

              return (
                <li key={i}>
                  <a
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-base font-medium border ${isActive
                      ? "bg-orange-100 text-orange-700 border-orange-400"
                      : "hover:bg-orange-50 hover:text-orange-600 border-transparent"
                      }`}
                  >
                    <item.icon
                      className={`size-5 ${isActive ? "text-orange-600" : "text-gray-500"
                        }`}
                    />
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </SidebarContent>

      {/* Fixed Footer */}
      <SidebarFooter className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-center mb-3">
          <h2 className="text-orange-600 font-semibold text-lg leading-none">
            !! वंदे मातरम् !!
          </h2>
          <p className="text-[11px] text-gray-500">Made with ❤️ in India</p>
        </div>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
