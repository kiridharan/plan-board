"use client";
// /components/CreateTaskModal.tsx

import { useTaskStore } from "@/store/store";
import React, { useState } from "react";
const CreateTaskModal: React.FC = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");
  const { addTask } = useTaskStore();

  const handleSubmit = () => {
    if (!title) return;
    addTask(title, status);
    setTitle("");
    setStatus("todo");
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        // input color blacl
        className="border border-gray-300 p-2 m-2 cursor-pointer text-gray-600"
      />
      <select
        className="border border-gray-300 p-2 m-2 cursor-pointer text-gray-600"
        style={{ width: "50%" }}
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "todo" | "in-progress" | "done")
        }
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
      </select>
      <button onClick={handleSubmit}>Create Task</button>
    </div>
  );
};

export default CreateTaskModal;
