"use client";

import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";

import { FcTodoList } from "react-icons/fc";
import { FaClock } from "react-icons/fa";
export default function Home() {
  const router = useRouter();
  return (
    <div
      className="h-screen w-full bg-neutral-900 text-neutral-50
    flex flex-row pt-10 justify-start items-start pl-10
    gap-10
    overflow-y-auto
    
    "
    >
      {/* / create a card which routes to task-app */}
      <div
        className="h-56 w-56 shrink-0 place-content-center rounded border text-3xl border-neutral-500 bg-neutral-500/20 text-neutral-500
      hover:bg-neutral-500/30 hover:text-neutral-500/90
       flex-col
      justify-center items-center flex cursor-pointer"
        onClick={() => {
          // redirect to task-app
          router.push("/task-app");
        }}
      >
        <FcTodoList />
        <h2 className="text-center text-lg font-semibold">Todo</h2>
      </div>
      <div
        className="h-56 w-56 shrink-0 place-content-center rounded border text-3xl border-neutral-500 bg-neutral-500/20 text-neutral-500
      hover:bg-neutral-500/30 hover:text-neutral-500/90
       flex-col
      justify-center items-center flex cursor-pointer"
        onClick={() => {
          // redirect to task-app
          router.push("/clock-app");
        }}
      >
        <FaClock />
        <h2 className="text-center text-lg font-semibold">Clock</h2>
      </div>
    </div>
  );
}
