import React from "react";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import ProtectedRoute from "@/components/ProtectedRoute";

function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      {children}

      {/* <Footer /> */}
    </ProtectedRoute>
  );
}

export default QuizLayout;
