"use client";

import React, { useEffect, useState } from "react";
import { useTaskStore } from "@/store/store";
import SortableTaskCard from "./SortableTaskCard";
import { useRouter } from "next/navigation";
// import SortableTaskCard from "./SortableTaskCard";

const KanbanBoard: React.FC = () => {
  const { tasks, updateTaskStatus, deleteTask } = useTaskStore();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensures that the component is running on the client side
  }, []);

  return (
    <div className="flex justify-between space-x-4">
      {["todo", "in-progress", "done"].map((status) => (
        <div className="w-1/3 p-2 rounded">
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
