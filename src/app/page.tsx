"use client";

import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";

import { FcTodoList, FcDisplay } from "react-icons/fc";
import DateTimeCard from "@/components/Clock/DateTimeCard";
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
    </div>
  );
}

const CardComponent = ({
  icon,
  title,
  onClick,
}: {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="h-56 w-56 shrink-0 place-content-center rounded border text-3xl border-neutral-500 bg-neutral-500/20 text-neutral-500
    hover:bg-neutral-500/30 hover:text-neutral-500/90
     flex-col
    justify-center items-center flex cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <h2 className="text-center text-lg font-semibold">{title}</h2>
    </div>
  );
};
