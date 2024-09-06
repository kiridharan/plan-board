// app/flow/Sidebar.tsx
import React from "react";

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-4 w-60 ">
      <h3 className="text-lg font-bold mb-4">Drag Components</h3>
      {/* Input Node */}
      <div
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
        className="mb-4 p-3 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 cursor-pointer"
      >
        Input Node
      </div>

      {/* Starting Node */}
      <div
        onDragStart={(event) => onDragStart(event, "starting")}
        draggable
        className="mb-4 p-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 cursor-pointer"
      >
        Starting Node
      </div>
      {/* Subtitle Node */}
      <div
        onDragStart={(event) => onDragStart(event, "subtitle")}
        draggable
        className="mb-4 p-3 bg-yellow-500 text-white font-semibold rounded shadow hover:bg-yellow-600 cursor-pointer"
      >
        Subtitle Node
      </div>
      {/* Condition Node */}
      <div
        onDragStart={(event) => onDragStart(event, "condition")}
        draggable
        className="mb-4 p-3 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600 cursor-pointer"
      >
        Condition Node
      </div>
    </aside>
  );
};

export default Sidebar;
