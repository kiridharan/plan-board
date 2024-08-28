"use client";

import React from "react";
import { Status, useStatusStore, useTaskStore } from "@/store/store";
import SortableTaskCard from "./SortableTaskCard";
import { useRouter } from "next/navigation";

const KanbanBoard: React.FC = () => {
  const { tasks, updateTaskStatus, deleteTask } = useTaskStore();
  const { statuses } = useStatusStore();
  const router = useRouter();

  return (
    <div className="flex justify-between space-x-6 p-6  min-h-screen">
      {statuses.map((status: Status) => (
        <div
          key={status.id}
          className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            {status.name.replace("-", " ").toUpperCase()}

            <button
              onClick={() => {
                useStatusStore.getState().deleteStatus(status.id);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Delete
            </button>
          </h2>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status.name === status.name)
              .map((task) => (
                <SortableTaskCard
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  handlePageChange={() => router.push(`/task/${task.id}`)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
