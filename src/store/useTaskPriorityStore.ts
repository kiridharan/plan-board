import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  id: number;
  title: string;
  status: "doNow" | "doNext" | "doLater" | "dontDo" | "todo";
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (id: number, newStatus: Task["status"]) => void;
  getTaskById: (id: number) => Task | undefined;
  updateTaskTitle: (id: number, newTitle: string) => void;
  deleteTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      // Add a task
      addTask: (task: Task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),

      // Move task to a new status
      moveTask: (id: number, newStatus: Task["status"]) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          ),
        })),

      // Get a task by its ID
      getTaskById: (id: number) => {
        return get().tasks.find((task) => task.id === id);
      },

      // Update a task's title
      updateTaskTitle: (id: number, newTitle: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title: newTitle } : task
          ),
        })),
      deleteTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    { name: "task-storage" } // Persist state in local storage
  )
);
