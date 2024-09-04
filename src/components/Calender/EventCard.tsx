"use client";
import React from "react";
import { FaTrash } from "react-icons/fa"; // Import the trash icon from react-icons

const EventWithDelete = ({
  event,
  onDelete,
}: {
  event: { priority?: number; title?: string };
  onDelete: (event: { priority?: number; title?: string }) => void;
}) => {
  return (
    <div
      className={`relative  p-2 rounded-md
            ${
              event?.priority === 1
                ? "text-red-700"
                : event?.priority === 2
                ? "text-yellow-700"
                : event?.priority === 3
                ? "text-amber-700"
                : "text-white"
            } 
          font-bold
            
            `}
      style={{ cursor: "pointer" }}
    >
      {event?.title}
      <FaTrash
        onClick={() => onDelete(event)}
        style={{
          position: "absolute",
          right: "5px",
          top: "5px",
          cursor: "pointer",
          color: "white",
        }}
      />
    </div>
  );
};

export default EventWithDelete;
