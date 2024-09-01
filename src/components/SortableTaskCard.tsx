import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/store/store";
import { DeleteOutlined } from "@ant-design/icons";
import router from "next/router";

const SortableTaskCard: React.FC<{
  task: Task;
  deleteTask: (id: string) => void;
  handlePageChange: () => void;
}> = ({ task, deleteTask, handlePageChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const [isDragging, setIsDragging] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const handleClick = () => {
    if (!isDragging) {
      handlePageChange();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={() => setIsDragging(false)}
      onMouseUp={() => {
        if (!isDragging) handleClick();
      }}
      onClick={(e) => e.stopPropagation()}
      onTouchStart={() => setIsDragging(false)}
      onTouchMove={() => setIsDragging(true)}
      onTouchEnd={() => {
        if (!isDragging) handleClick();
      }}
      className="p-4 bg-gray-100 rounded shadow cursor-pointer"
    >
      {/* <h3 className="text-lg font-medium">{task.title}</h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
      >
        Delete
      </button> */}
      <div className="p-4 mb-2 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition duration-200 ease-in-out">
        <div>
          <h3
            className="font-bold text-white mb-2"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Navigating to /task/${task.id}`);
              router.push(`/task/${task.id}`);
            }}
          >
            {task.title}
          </h3>
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
    </div>
  );
};

export default SortableTaskCard;
