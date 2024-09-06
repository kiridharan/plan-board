"use client";
import React from "react";
import { Handle, Position } from "reactflow";

const StartingNode = ({ data }: any) => {
  return (
    <div className="bg-blue-500 text-white rounded shadow-lg p-4">
      <div className="text-center font-bold">Starting Node</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border border-gray-300 rounded-full"
      />
    </div>
  );
};

export default StartingNode;
