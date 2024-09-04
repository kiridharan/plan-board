// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App",
  description: "My project description",
  

  // manifest
  // alternates: [
  //   { href: "/en", hrefLang: "en" },
  //   { href: "/es", hrefLang: "es" },
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* // add back button */}

      <body
        className={
          inter.className +
          " bg-gray-900 text-white font-inter text-base antialiased"
        }
      >
        {children}
      </body>
    </html>
  );
}
