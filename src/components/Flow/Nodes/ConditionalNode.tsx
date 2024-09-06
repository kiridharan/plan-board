// components/ConditionNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";

const ConditionNode = ({ data }: any) => {
  return (
    <div className="bg-red-500 text-white w-40 h-40 transform rotate-45 shadow-lg flex justify-center items-center relative">
      <div className="transform -rotate-45">
        <div className="font-bold">Condition Node</div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white border border-gray-300 rounded-full"
        style={{ top: "-10px", left: "50%", transform: "translateX(-50%)" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-white border border-gray-300 rounded-full"
        style={{ bottom: "-10px", left: "50%", transform: "translateX(-50%)" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-white border border-gray-300 rounded-full"
        style={{ right: "-10px", top: "50%", transform: "translateY(-50%)" }}
      />
    </div>
  );
};

export default ConditionNode;
