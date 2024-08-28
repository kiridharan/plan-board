"use client";

import { message } from "antd";
import { DraggableLocation } from "react-beautiful-dnd";
import { create } from "zustand";

export type Status = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  title: string;
  status: Status;
};

export type StatusState = {
  statuses: Status[];

  addStatus: (name: string) => void;
  updateStatus: (id: string, name: string) => void;
  deleteStatus: (id: string) => void;
  reorderStatuses: (startIndex: number, endIndex: number) => void;
};

export type TaskState = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (title: string, status: Status) => void;
  updateTaskStatus: (id: string, status: Status) => void;
  deleteTask: (id: string) => void;
  updateTitle: (id: string, title: string) => void;
  reorderTasks: (
    sourceTasks: Task[],
    destinationTasks: Task[],
    source: DraggableLocation,
    destination: DraggableLocation
  ) => void;
};

// Read function to retrieve tasks from local storage
const readTasksFromLocalStorage = (): Task[] => {
  if (typeof window !== "undefined") {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  }
  return [];
};

// Write function to store tasks in local storage
const writeTasksToLocalStorage = (tasks: Task[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

// Read function to retrieve statuses from local storage
const readStatusesFromLocalStorage = (): Status[] => {
  if (typeof window !== "undefined") {
    const statuses = localStorage.getItem("statuses");
    if (statuses?.length ?? 0 > 0) {
      return JSON.parse(statuses as string);
    } else {
      // Default statuses if undefined
      const defaultStatuses: Status[] = [
        { id: "1", name: "todo" },
        { id: "2", name: "in-progress" },
        { id: "3", name: "done" },
      ];
      writeStatusesToLocalStorage(defaultStatuses);
      return defaultStatuses;
    }
  }
  return [];
};

// Write function to store statuses in local storage
const writeStatusesToLocalStorage = (statuses: Status[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("statuses", JSON.stringify(statuses));
  }
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: readTasksFromLocalStorage(),
  setTasks: (tasks) => set({ tasks }),
  addTask: (title, status) => {
    set((state) => {
      const newTask: Task = { id: Date.now().toString(), title, status };
      const updatedTasks = [...state.tasks, newTask];
      writeTasksToLocalStorage(updatedTasks);
      return { tasks: updatedTasks };
    });
  },
  updateTaskStatus: (id, newStatusId) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, status: { ...task.status, id: newStatusId } }
          : task
      ) as Task[]; // Ensure this is explicitly cast to Task[]

      writeTasksToLocalStorage(updatedTasks);

      // Ensure we are returning a valid TaskState object
      return { tasks: updatedTasks };
    });
  },

  // updateTaskStatus: (id, status) => {
  //   set((state) => {
  //     const updatedTasks = state.tasks.map((task) =>
  //       task.id === id ? { ...task, status } : task
  //     );
  //     writeTasksToLocalStorage(updatedTasks);
  //     return { tasks: updatedTasks };
  //   });
  // },
  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      writeTasksToLocalStorage(updatedTasks);
      message.info("Task deleted successfully");
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
  reorderTasks: (sourceTasks, destinationTasks, source, destination) =>
    set((state) => {
      const newTasks = Array.from(state.tasks);
      const sourceStatus =
        useStatusStore.getState().statuses[parseInt(source.droppableId)];
      const destStatus =
        useStatusStore.getState().statuses[parseInt(destination.droppableId)];

      const [reorderedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, {
        ...reorderedTask,
        status: destStatus,
      });

      const updatedTasks = newTasks
        .filter(
          (task) =>
            task.status.name !== sourceStatus.name &&
            task.status.name !== destStatus.name
        )
        .concat(sourceTasks, destinationTasks);

      return { tasks: updatedTasks };
    }),
}));

export const useStatusStore = create<StatusState>((set) => ({
  statuses: readStatusesFromLocalStorage(),

  addStatus: (name) => {
    set((state) => {
      const newStatus: Status = { id: Date.now().toString(), name };
      const updatedStatuses = [...state.statuses, newStatus];
      writeStatusesToLocalStorage(updatedStatuses);
      return { statuses: updatedStatuses };
    });
  },

  updateStatus: (id, name) => {
    set((state) => {
      const updatedStatuses = state.statuses.map((status) =>
        status.id === id ? { ...status, name } : status
      );
      writeStatusesToLocalStorage(updatedStatuses);
      return { statuses: updatedStatuses };
    });
  },

  deleteStatus: (id) => {
    set((state) => {
      const updatedStatuses = state.statuses.filter(
        (status) => status.id !== id
      );
      writeStatusesToLocalStorage(updatedStatuses);
      return { statuses: updatedStatuses };
    });
  },
  reorderStatuses: (startIndex, endIndex) =>
    set((state) => {
      const newStatuses = Array.from(state.statuses);
      const [reorderedStatus] = newStatuses.splice(startIndex, 1);
      newStatuses.splice(endIndex, 0, reorderedStatus);
      return { statuses: newStatuses };
    }),
}));
