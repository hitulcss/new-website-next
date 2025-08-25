// components/ui/youtube-embed.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface YouTubeEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  videoId: string;
  width?: string;
  height?: string;
  className?: string;
}

export function YouTubeEmbed({
  videoId,
  width = "100%",
  height = "400px",
  className,
  ...props
}: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Construct the embed URL with parameters to prevent redirects
  const getEmbedUrl = () => {
    const params = new URLSearchParams({
      autoplay: "0",
      playsinline: "1",
      rel: "0",
      enablejsapi: "1",
      modestbranding: "0",
      fs: "0", // optional: removes fullscreen button
      // showinfo: '0', // deprecated, but you can try adding it
      origin: typeof window !== "undefined" ? window.location.origin : "",
      widget_referrer:
        typeof window !== "undefined" ? window.location.href : "",
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  };

  // Prevent mobile redirects
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const preventRedirect = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    iframe.addEventListener("click", preventRedirect, true);
    iframe.addEventListener("touchstart", preventRedirect, { passive: false });
    iframe.addEventListener("touchend", preventRedirect, { passive: false });

    return () => {
      iframe.removeEventListener("click", preventRedirect);
      iframe.removeEventListener("touchstart", preventRedirect);
      iframe.removeEventListener("touchend", preventRedirect);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-black shadow-lg",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      <iframe
        ref={iframeRef}
        src={getEmbedUrl()}
        className="absolute left-0 top-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube video"
        loading="lazy"
      />
    </div>
  );
}
