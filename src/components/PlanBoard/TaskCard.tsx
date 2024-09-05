"use client";
import { useTaskStore } from "@/store/useTaskPriorityStore";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { AiFillDelete } from "react-icons/ai";
// Adjust the path to your store

interface TaskProps {
  task: {
    id: number;
    title: string;
    status: string;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { updateTaskTitle, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleTitleEdit = () => {
    if (isEditing) {
      updateTaskTitle(task.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      ref={drag as any}
      className={`
        cursor-grab rounded border border-neutral-700 bg-neutral-800 active:cursor-grabbing
        flex justify-between items-center 
        p-4  shadow-lg ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleTitleEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTitleEdit();
          }}
          className="bg-neutral-700 text-white p-2 rounded-md"
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>{task.title}</div>
      )}
      <div className="text-center mt-8" onClick={() => deleteTask(task.id)}>
        <AiFillDelete color="red" />
      </div>
    </div>
  );
};

export default Task;
