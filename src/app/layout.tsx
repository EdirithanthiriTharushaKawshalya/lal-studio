"use client";

import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {!isAdminPage && <Navbar />}
        {children}
        <Footer />
      </body>
    </html>
  );
}