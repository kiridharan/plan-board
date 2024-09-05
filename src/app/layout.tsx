"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "App",
//   description: "My project description",

//   // manifest
//   // alternates: [
//   //   { href: "/en", hrefLang: "en" },
//   //   { href: "/es", hrefLang: "es" },
//   // ],
// };

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
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </body>
    </html>
  );
}
