import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "URI | BMS-Web",
  description: "Banking EPS System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="mytheme">
      <body
       className={inter.className}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
