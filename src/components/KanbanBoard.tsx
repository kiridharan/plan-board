"use client";

import React from "react";
import { useTaskStore } from "@/store/store";
import SortableTaskCard from "./SortableTaskCard";
import { useRouter } from "next/navigation";
// import SortableTaskCard from "./SortableTaskCard";

const KanbanBoard: React.FC = () => {
  const { tasks, updateTaskStatus, deleteTask } = useTaskStore();

  const router = useRouter();

  return (
    <div className="flex justify-between space-x-4">
      {["todo", "in-progress", "done"].map((status) => (
        <div className="w-1/3 p-2 rounded" key={status}>
          <h2 className="text-lg font-bold mb-2">
            {status.replace("-", " ").toUpperCase()}
          </h2>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                handlePageChange={() => router.push(`/task/${task.id}`)}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
