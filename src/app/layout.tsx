import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "./ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "5-Letter Word | Cleanest Word Engine",
  description: "A fast, modern dictionary for word discovery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${mono.variable} font-sans`}>
        <ThemeProvider>
          {/* Subtle Background Elements */}
          <div className="blob w-[500px] h-[500px] bg-blue-500 top-[-100px] right-[-100px]" />
          <div className="blob w-[400px] h-[400px] bg-purple-500 bottom-[-100px] left-[-100px]" />

          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
