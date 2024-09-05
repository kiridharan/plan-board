"use client";
import { useState } from "react";
import { useDrop } from "react-dnd";

import { useTaskStore } from "@/store/useTaskPriorityStore";
import Task from "./TaskCard";

interface QuadrantProps {
  status: "doNow" | "doNext" | "doLater" | "dontDo" | "todo";
  title: string;
  color: string;
}

const Quadrant: React.FC<QuadrantProps> = ({ status, title, color }) => {
  const { tasks, moveTask } = useTaskStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const filteredTasks = tasks.filter((task) => task.status === status);

  // Only show 3 tasks by default, and hide the rest
  const visibleTasks = isExpanded ? filteredTasks : filteredTasks.slice(0, 3);
  const hiddenTasksCount = filteredTasks.length - 3;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      ref={drop as any}
      className={`p-4 border-2 border-gray-200 rounded-lg shadow-md min-h-[200px] ${
        isOver ? color : ""
      } ${isExpanded ? "min-h-[300px]" : ""}`}
    >
      <h2 className={`text-xl font-bold mb-4 ${color}`}>{title}</h2>
      <div className="space-y-4">
        {visibleTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}

        {/* Show "+1 more" if there are hidden tasks */}
        {hiddenTasksCount > 0 && !isExpanded && (
          <div className="text-blue-500 cursor-pointer" onClick={handleExpand}>
            +{hiddenTasksCount} more
          </div>
        )}

        {/* Show "Show Less" when expanded */}
        {isExpanded && (
          <div className="text-blue-500 cursor-pointer" onClick={handleExpand}>
            Show Less
          </div>
        )}
      </div>
    </div>
  );
};

export default Quadrant;
