"use client";
// components/SubtitleNode.tsx
import React from "react";

const SubtitleNode = ({ data }: any) => {
  return (
    <div className="bg-yellow-500 text-black rounded shadow-lg p-4">
      <div className="text-center font-semibold">Subtitle Node</div>
      <p className="text-center">{data.subtitle || "This is a subtitle"}</p>
    </div>
  );
};

export default SubtitleNode;
