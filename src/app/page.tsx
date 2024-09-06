"use client";

import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";

import {
  FcTodoList,
  FcDisplay,
  FcCalendar,
  FcPlanner,
  FcFlowChart,
} from "react-icons/fc";
import DateTimeCard from "@/components/Clock/DateTimeCard";
import { CardComponent } from "@/components/CardComponent";
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
      <DateTimeCard />

      <CardComponent
        icon={<FcTodoList size={50} />}
        title="Task App"
        onClick={() => router.push("/task-app")}
      />
      {/* / create a card which routes to clock-app */}
      <CardComponent
        icon={<FcDisplay size={50} />}
        title="Clock App"
        onClick={() => router.push("/clock-app")}
      />
      <CardComponent
        icon={<FcCalendar size={50} />}
        title="Calender App"
        onClick={() => router.push("/calender-app")}
      />

      <CardComponent
        icon={<FcPlanner size={50} />}
        title="Plan App"
        onClick={() => router.push("/task-board")}
      />

      <CardComponent
        icon={<FcFlowChart size={50} />}
        title="Flow App"
        onClick={() => router.push("/flow-app")}
      />
    </div>
  );
}
