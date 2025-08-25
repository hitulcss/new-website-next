"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  CircleHelpIcon,
  CircleIcon,
  CircleCheckIcon,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import CartCheckout from "@/assets/images/home/cart.png";
import { ChevronRight } from "lucide-react";
import PlayStore from "@/assets/images/home/playstore.png";
import { FaGooglePay, FaPhone } from "react-icons/fa";
import { BsGooglePlay } from "react-icons/bs";
// import { BsPhone } from "react-icons/bs";
import { getCat } from "@/actions/home";
import useFetch from "@/hooks/use-fetch";
import logoImage from "@/public/logo.webp";
import GooglePlayIconImg from "@/public/gplay-arrow.svg";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getItem } from "@/lib/storage";

export default function Navbar() {
  const { loading, data: categoryData, fn: fnGetCat } = useFetch(getCat);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(0);
  useEffect(() => {
    const getProfile = getItem("userProfile") as any;
    if (getProfile) {
      setProfile(JSON.parse(getProfile));
    }

    const getToken = getItem("authToken") as string;
    if (!getToken) {
      setIsLoggedIn(false);
    }
    const fetchBanner = async () => {
      await fnGetCat();
    };
    fetchBanner();
  }, []);

  console.log(profile, "profile");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logoImage} alt="SD Campus Logo" width={50} height={50} />
        </Link>

        <div className="hidden md:flex flex-1 justify-center cursor-pointer">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer">
                  All Courses
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
                    {/* Left: Categories */}
                    <div className="w-full">
                      {categoryData &&
                        categoryData.map((category: any, index: number) => (
                          <div
                            key={index}
                            className="p-2 hover:p-2"
                            onMouseEnter={() => setHoveredCategory(index)}
                            // onMouseLeave={() => setHoveredCategory(null)}
                          >
                            <ListItem
                              href={category.slug}
                              title={category?.name ?? ""}
                              icon={true}
                              className={`cursor-pointer p-2 hover:p-2 hover:shadow ${
                                hoveredCategory === index ? "bg-muted" : ""
                              }`}
                            />
                          </div>
                        ))}
                    </div>
                    {/* Right: Subcategories */}
                    <div className="row-span-3 min-h-[200px]">
                      {hoveredCategory !== null &&
                      categoryData &&
                      categoryData[hoveredCategory]?.subCategories &&
                      categoryData[hoveredCategory].subCategories.length > 0 ? (
                        categoryData[hoveredCategory].subCategories.map(
                          (sub: any, subIdx: number) => (
                            <ListItem
                              key={subIdx}
                              className="shadow p-2 hover:p-2"
                              href={`${categoryData[hoveredCategory].slug}/${sub.slug}`}
                              title={sub?.title ?? ""}
                            />
                          )
                        )
                      ) : (
                        <div className="text-muted-foreground text-sm p-4">
                          Hover a category to see subcategories
                        </div>
                      )}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer">
                  Free Study Material
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[100px] gap-2 md:w-[200px] md:grid-cols-2 lg:w-[300px] p-0">
                    <div className="text-muted-foreground text-sm p-4 text-center">
                      Coming Soon
                    </div>
                    {/* {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))} */}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer">
                  Test Series
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[100px] gap-2 md:w-[200px] md:grid-cols-2 lg:w-[300px] p-0">
                    <div className="text-muted-foreground text-sm p-4 text-center">
                      Coming Soon
                    </div>
                    {/* {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))} */}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link target="_blank" href="https://blog.sdcampus.com/">
                    Blogs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link
                    target="_blank"
                    className="flex-row gap-2"
                    href="https://sdpublication.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                  >
                    <Image src={CartCheckout} alt="cart" />
                    Books
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link href="/about">About Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex text-center items-center gap-4">
          {/* Phone Info */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-md bg-muted hover:bg-muted/90 transition">
            <span className="text-orange-600 item-rounded-full animate-pulse border border-orange-600 rounded-full p-1">
              <Phone size={18} />
            </span>
            <span className="text-sm font-medium">7428394519</span>
          </div>

          {/* Play Store Button */}
          <Link
            href="https://play.google.com/store/apps/details?id=com.sdcampus.app&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-white hover:bg-white text-white rounded-2xl px-4 py-2 flex items-center gap-2 shadow-md cursor-pointer">
              <Image
                src={GooglePlayIconImg}
                alt="Google Play Icon"
                width={20}
                height={20}
              />
            </Button>
          </Link>

          {/* Sign In Button */}
          <div>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex flex-row-reverse items-center cursor-pointer">
                    
                    <Avatar>
                      <AvatarImage
                        src={profile?.profilePhoto ?? ""}
                        alt={profile?.name ?? ""}
                      />
                      <AvatarFallback>
                        {profile?.name?.charAt(0).toUpperCase() ?? "T"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-gray-800">
                      Hi, {profile?.name?.split(" ")[0] ?? "User"}
                    </span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/learning/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/learning/my-courses">My Courses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" passHref>
                <Button className="bg-orange-600 text-white hover:bg-orange-700 rounded-lg cursor-pointer">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-4 animate-slide-down">
          {/* Show profile info if logged in, else show Sign In button */}
          {isLoggedIn && profile ? (
            <div className="flex items-center gap-3 mb-2 p-2 bg-muted rounded-lg">
              <Avatar>
                <AvatarImage src={profile?.profilePhoto ?? ""} alt={profile?.name ?? ""} />
                <AvatarFallback>{profile?.name?.charAt(0).toUpperCase() ?? "T"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-sm text-gray-800">{profile?.name ?? "User"}</span>
                <span className="text-xs text-gray-500">{profile?.email ?? ""}</span>
                <Link href="/learning/profile" className="text-primary text-xs underline mt-1">My Profile</Link>
              </div>
            </div>
          ) : (
            <Link href="/login" passHref>
              <Button variant="default" className="w-full mt-2">
                Sign In
              </Button>
            </Link>
          )}
          {/* All Courses expandable as on browser */}
          <button
            className="block w-full px-3 py-2 rounded-md text-base font-semibold text-primary bg-muted mb-2 text-center focus:outline-none"
            style={{letterSpacing:'0.5px'}}
            onClick={() => setSubmenuOpen(submenuOpen === 'all-courses' ? null : 'all-courses')}
          >
            All Courses
            <ChevronRight className={`inline ml-2 w-4 h-4 transition-transform ${submenuOpen === 'all-courses' ? 'rotate-90' : ''}`} />
          </button> 
          {submenuOpen === 'all-courses' && (
            <div className="space-y-1">
              {categoryData &&
                categoryData.map((category: any, idx: number) => (
                  <div key={idx}>
                    <Link
                      href={`/${category.slug}`}
                      className="w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{category.name}</span>
                      <ChevronRight className="ml-2 w-4 h-4 transition-transform" />
                    </Link>
                    {category.subCategories && category.subCategories.length > 0 && (
                      <div className="ml-6 mt-1 space-y-1">
                        {category.subCategories.map((sub: any, subIdx: number) => (
                          <Link
                            key={subIdx}
                            href={`/${category.slug}/${sub.slug}`}
                            className="block px-3 py-2 rounded-md text-sm hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  href: string;
  title: string;
  icon?: boolean;
}) {
  return (
    <div {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={`/${href}`}
          className="block p-2 rounded-md hover:bg-muted transition"
        >
          <div className="text-sm font-medium leading-none">
            {" "}
            <span className="flex items-center justify-between w-full">
              <span>{title}</span>
              {icon && (
                <ChevronRight className="ml-2 w-4 h-4 text-muted-foreground" />
              )}
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </div>
  );
}
