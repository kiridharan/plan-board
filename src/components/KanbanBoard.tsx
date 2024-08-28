"use client";

import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";
import { Status, useStatusStore, useTaskStore } from "@/store/store";
import { DeleteOutlined } from "@ant-design/icons";
import router from "next/router";

const KanbanBoard: React.FC = () => {
  const { tasks, updateTaskStatus, setTasks } = useTaskStore();
  const { statuses } = useStatusStore();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overContainerId = over.data.current?.sortable.containerId;

    if (
      activeTask &&
      overContainerId &&
      activeTask.status.id !== overContainerId
    ) {
      updateTaskStatus(activeTask.id, overContainerId);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex justify-between space-x-6 p-6 min-h-screen">
        {statuses.map((status: Status) => (
          <SortableContext
            key={status.id}
            items={tasks
              .filter((task) => task.status.name === status.name)
              .map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-0">
                  {status.name.replace("-", " ").toUpperCase()}
                </h2>
                <DeleteOutlined
                  className="text-red-500 hover:text-red-700 transition-colors duration-300 hover:scale-110 transform cursor-pointer"
                  onClick={() => {
                    useStatusStore.getState().deleteStatus(status.id);
                  }}
                />
              </div>

              <div className="space-y-4">
                {tasks
                  .filter((task) => task.status.name === status.name)
                  .map((task) => (
                    <SortableTaskCard
                      key={task.id}
                      task={task}
                      handlePageChange={() => router.push(`/task/${task.id}`)}
                    />
                  ))}
              </div>
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
