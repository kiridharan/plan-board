// /components/TaskCard.tsx
import React from "react";
import { useRouter } from "next/router";
import { Task } from "@/store/store";

interface TaskCardProps {
  task: Task;
  deleteTask?: (id: string) => void;
  handlePageChange: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  deleteTask,
  handlePageChange,
}) => {
  return (
    <div
      onClick={handlePageChange}
      className="p-4 mb-2 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition duration-200 ease-in-out"
    >
      <h3 className="font-bold text-white mb-2">{task.title}</h3>
      <p className="text-gray-400">
        Status:{" "}
        <span className="capitalize text-gray-300">
          {task.status.replace("-", " ")}
        </span>
      </p>
      {deleteTask && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          className="mt-2 text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default TaskCard;
