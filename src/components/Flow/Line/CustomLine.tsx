import React from "react";
import { Position } from "reactflow"; // Assuming you might be using Position from React Flow

interface ConnectionLineProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  targetPosition: Position; // You can adjust this if you're using a custom type for positions
  connectionLineType?: string; // Adjust based on your usage, or use a specific enum
  connectionLineStyle?: React.CSSProperties; // Use CSSProperties for inline styles
}

const CustomConnectionLine: React.FC<ConnectionLineProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  targetPosition,
  connectionLineType,
  connectionLineStyle,
}) => {
  return (
    <g>
      {/* The connection path line */}
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className="animated"
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
        style={connectionLineStyle}
      />
      {/* Circle at the end of the connection */}
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke="#222"
        strokeWidth={1.5}
      />
    </g>
  );
};

export default CustomConnectionLine;
