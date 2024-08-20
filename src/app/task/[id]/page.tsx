"use client";
// /app/task/[id]/page.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Task, useTaskStore } from "@/store/store"; // Assuming the Task type is here

const TaskDetailsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const tasks = useTaskStore.getState().tasks; // Access your store's state
    const foundTask = tasks.find((t) => t.id === id);
    setTask(foundTask);
  }, [id]);

  if (!task) return <div>Task not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={task.title}
          // readOnly
          onChange={(e) => {
            setTitle(e.target.value);
            // useTaskStore.getState().updateTitle(task.id, e.target.value);
            // refresh the store task title
            setTask((prev) => {
              if (!prev) return prev;
              return { ...prev, title: e.target.value };
            });
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        {/* / drop down */}
        <select
          value={task.status}
          onChange={(e) => {
            const newStatus = e.target.value as "todo" | "in-progress" | "done";

            // useTaskStore.getState().updateTaskStatus(task.id, newStatus);
            // refresh the store task status
            setTask((prev) => {
              if (!prev) return prev;
              return { ...prev, status: newStatus };
            });
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        onClick={() => {
          useTaskStore.getState().deleteTask(task.id);
          // redirect to home page

          router.push("/");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Delete Task
      </button>
      <button
        onClick={() => {
          useTaskStore.getState().updateTitle(task.id, title);
          useTaskStore.getState().updateTaskStatus(task.id, task.status);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Task
      </button>

      {/* / if there is change in title */}
    </div>
  );
};

export default TaskDetailsPage;
