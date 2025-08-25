"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Ensure you have this utility or use classnames

export default function Banner({ bannerData }: { bannerData: any }) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Auto-slide every 5 seconds
  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  // Update current index and total count
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full">
      <section className="px-0 w-full max-w-none">
        <div className="relative w-full">
          <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {bannerData?.map((item: any, index: number) => (
                <CarouselItem key={index}>
                  <div className="relative h-[180px] xs:h-[220px] sm:h-[280px] md:h-[350px] lg:h-[414px] w-full group">
                    <Image
                      src={item?.url}
                      alt={`Banner ${index + 1}`}
                      fill
                      className="object-contain transition-transform duration-1000 ease-in-out group-hover:scale-105"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dot Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  current === i ? "bg-orange-500 w-4" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
