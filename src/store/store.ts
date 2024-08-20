"use client";

import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
};

export type TaskState = {
  tasks: Task[];
  addTask: (title: string, status: "todo" | "in-progress" | "done") => void;
  updateTaskStatus: (
    id: string,
    status: "todo" | "in-progress" | "done"
  ) => void;
  deleteTask: (id: string) => void;
  updateTitle: (id: string, title: string) => void;
};

// Define a type that includes the Persist middleware

// Read function to retrieve tasks from local storage
export const readTasksFromLocalStorage = (): Task[] => {
  if (typeof window !== "undefined") {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  }
  return [];
};

// Write function to store tasks in local storage
export const writeTasksToLocalStorage = (tasks: Task[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: readTasksFromLocalStorage(),
  addTask: (title, status) => {
    set((state) => {
      const newTask: Task = { id: Date.now().toString(), title, status };
      const updatedTasks = [...state.tasks, newTask];
      writeTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },
  updateTaskStatus: (id, status) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      writeTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },
  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      writeTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },
  updateTitle: (id, title) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      );
      writeTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },
}));
