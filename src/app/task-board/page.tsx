"use client";
import React from "react";
import { Button } from "antd";
import Quadrant from "@/components/PlanBoard/Quadrant";
import { useTaskStore } from "@/store/useTaskPriorityStore";
import { BurnBarrel } from "@/components/Task/BurnBarrel";

export default function Home() {
  const { addTask } = useTaskStore();

  const createTask = () => {
    const newTask = {
      id: Date.now(),
      title: "New Task",
      status: "todo" as const, // Default quadrant
    };
    addTask(newTask);
  };

  return (
    <div className="container mx-auto py-8 h-screen w-full">
      <h1 className="text-3xl font-bold text-center mb-8">
        Task Prioritization Matrix
      </h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Top left quadrant - Low Effort, Need to Have */}
        <Quadrant status="doNow" title="DO IT NOW" color="text-green-100" />

        {/* Top right quadrant - High Effort, Need to Have */}
        <Quadrant status="doNext" title="DO IT NEXT" color="text-yellow-100" />

        {/* Bottom left quadrant - Low Effort, Nice to Have */}
        <Quadrant
          status="doLater"
          title="DO IT IF/WHEN THERE'S TIME"
          color="text-blue-100"
        />

        {/* Bottom right quadrant - High Effort, Nice to Have */}
        <Quadrant status="dontDo" title="DON'T DO IT" color="text-red-100" />
      </div>

      <div
        className="
        pt-8
        
      "
      >
        <Quadrant status="todo" title="TODO" color="text-red-100" />
      </div>

      <div className="text-center mt-8">
        <Button type="primary" onClick={createTask}>
          Add Task
        </Button>
      </div>
    </div>
  );
}
