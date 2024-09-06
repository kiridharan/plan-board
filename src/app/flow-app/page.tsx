"use client";
// app/flow/page.tsx
import FlowPage from "@/components/Flow/FlowCanvas";
import Sidebar from "@/components/Flow/SideBar";
import React from "react";

const Flow = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <FlowPage />
      </div>
    </div>
  );
};

export default Flow;
