import React, { FC } from "react";
import { useDrop, DropTargetMonitor, XYCoord } from "react-dnd";

interface QuadrantProps {
  children: React.ReactNode;
}

interface DragItem {
  id: number;
  left: number;
  top: number;
  moveCard: (id: number, left: number, top: number) => void;
}

const Quadrant: FC<QuadrantProps> = ({ children }) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      item.moveCard(item.id, left, top);
    },
  });

  return (
    <div className="relative w-full h-full border border-gray-300">
      {children}
    </div>
  );
};

export default Quadrant;
