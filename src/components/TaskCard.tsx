"use client";
// /components/TaskCard.tsx
import React from "react";
import router, { useRouter } from "next/router";
import { Task } from "@/store/store";
import { DeleteOutlined } from "@ant-design/icons";

interface TaskCardProps {
  task: Task;
  deleteTask?: (id: string) => void;
  // handlePageChange: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  deleteTask,
  // handlePageChange,
}) => {
  return (
    <div
      className="p-4 mb-2 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition duration-200 ease-in-out"
      onClick={(e) => {
        e.stopPropagation();
        console.log(`Navigating to /task/${task.id}`);
        router.push(`/task/${task.id}`);
      }}
    >
      <div>
        <h3 className="font-bold text-white mb-2">{task.title}</h3>
      </div>
      <div className="flex items-start justify-start">
        <p className="text-gray-400">Status: </p>
        <span className="capitalize text-gray-300 ml-1">
          {task.status.name.replace("-", " ")}
        </span>
      </div>
      {deleteTask && (
        // <button
        //   onClick={(e) => {
        //     e.stopPropagation();
        //     deleteTask(task.id);
        //   }}
        //   className="mt-2 text-sm text-red-500 hover:underline"
        // >
        //   Delete
        // </button>
        <DeleteOutlined
          className="text-red-500 hover:text-red-700 transition-colors duration-300 hover:scale-110 transform cursor-pointer mt-2 text-sm  hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
        />
      )}
    </div>
  );
};

export default TaskCard;
