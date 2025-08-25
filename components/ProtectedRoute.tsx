// components/ProtectedRoute.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getItem } from "@/lib/storage";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getItem("authToken");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}