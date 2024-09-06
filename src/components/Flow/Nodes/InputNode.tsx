"use client";
// components/InputNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";

const InputNode = ({ data }: any) => {
  return (
    <div className="bg-green-500 text-white rounded shadow-lg p-4">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border border-gray-300 rounded-full"
      />
      <div className="text-center font-bold">Input Node</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border border-gray-300 rounded-full"
      />
    </div>
  );
};

export default InputNode;
