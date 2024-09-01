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

import { motion } from "framer-motion";

import { CardType } from "@/types/types";
import { AddCard } from "@/components/AddCard";
import { Board } from "@/components/KanbanBoard";

export default function Home() {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
}

export const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];
