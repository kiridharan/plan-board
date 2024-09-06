// components/CustomNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }: any) => {
  return (
    <div className="bg-blue-500 text-white rounded shadow-md p-4 text-center">
      <div className="text-xl font-bold mb-2">
        {data.label || "Custom Node"}
      </div>

      {/* Handles to connect to other nodes */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border border-gray-400 rounded-full"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border border-gray-400 rounded-full"
      />
    </div>
  );
};

export default CustomNode;
