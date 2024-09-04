"use client";
import React, { useState, FC } from "react";
import { Card } from "antd";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Quadrant from "./GraphComponent";

interface CardType {
  id: number;
  left: number;
  top: number;
  content: string;
}

interface QuadrantProps {
  children: React.ReactNode;
  label?: string;
}

interface DraggableCardProps {
  id: number;
  left: number;
  top: number;
  children: React.ReactNode;
  moveCard: (id: number, left: number, top: number) => void;
}

const DraggableCard: FC<DraggableCardProps> = ({
  id,
  left,
  top,
  children,
  moveCard,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id, left, top, moveCard },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
    //   ref={drag}
      style={{
        position: "absolute",
        left,
        top,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Card>{children}</Card>
    </div>
  );
};

const BrainstormingBoard: FC = () => {
  const [cards, setCards] = useState<CardType[]>([
    { id: 1, left: 20, top: 20, content: "Task 1" },
    { id: 2, left: 100, top: 50, content: "Task 2" },
  ]);

  const moveCard = (id: number, left: number, top: number) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, left, top } : card))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-2 grid-rows-2 h-screen gap-4 p-4">
        <Quadrant>
          {cards.map((card) => (
            <DraggableCard
              key={card.id}
              id={card.id}
              left={card.left}
              top={card.top}
              moveCard={moveCard}
            >
              {card.content}
            </DraggableCard>
          ))}
        </Quadrant>
        {/* <Quadrant label="High Effort, High Impact" />
        <Quadrant label="Low Effort, Low Impact" />
        <Quadrant label="Low Effort, High Impact" /> */}
      </div>
    </DndProvider>
  );
};

export default BrainstormingBoard;
