"use client";
// /components/SortableTaskCard.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { Task, useTaskStore } from "@/store/store";

interface TaskCardProps {
  task: Task;
  deleteTask?: (id: string) => void;
  // handlePageChange: () => void;
}

const SortableTaskCard: React.FC<TaskCardProps> = ({
  task,
  deleteTask,
  // handlePageChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        task={task}
        deleteTask={deleteTask}
        // handlePageChange={handlePageChange}
      />
      {/* / change status */}
    </div>
  );
};

export default SortableTaskCard;
