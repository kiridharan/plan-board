"use client";
// import CreateTaskModal from "@/components/CreateTaskModal";
// // import KanbanBoard from "@/components/KanbanBoard";
// import dynamic from "next/dynamic";
// // import { NextSeo } from "next-seo";
// const KanbanBoard = dynamic(() => import("../components/KanbanBoard"), {
//   ssr: false,
// });

// export default function Home() {
//   return (
//     <div>
//       {/* <NextSeo
//         title="Simple Usage Example"
//         description="A short description goes here."
//         canonical="https://www.canonical.ie/"
//       /> */}
//       <div className="flex items-center justify-center p-10">
//         <h1 className="text-4xl font-bold text-center">Task Board</h1>
//         <CreateTaskModal />
//       </div>
//       <KanbanBoard />
//     </div>
//   );

// }

import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import KanbanBoard from "@/components/Task/KanbanBoard";

export default function Home() {
  return (
    <div
      className="h-screen w-full bg-neutral-900 text-neutral-50
    flex flex-col pt-10 justify-start items-center"
    >
      <KanbanBoard />
    </div>
  );
}
