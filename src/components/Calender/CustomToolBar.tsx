"use client";
import React from "react";
import { Button } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import Big Calendar CSS
import moment from "moment";

const CustomToolbar = ({
  view,
  onViewChange,
  onNavigate,
  onToday,
}: {
  view: any;
  onViewChange: any;
  onNavigate: any;
  onToday: any;
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          icon={<LeftOutlined />}
          onClick={() => onNavigate("PREV")}
          className="text-gray-600"
        />
        <Button
          icon={<RightOutlined />}
          onClick={() => onNavigate("NEXT")}
          className="text-gray-600"
        />
      </div>

      {/* View Selector */}
      <div className="flex items-center space-x-2">
        <Button
          type={view === "month" ? "primary" : "default"}
          icon={<CalendarOutlined />}
          onClick={() => onViewChange("month")}
        >
          Month
        </Button>
        <Button
          type={view === "week" ? "primary" : "default"}
          icon={<UnorderedListOutlined />}
          onClick={() => onViewChange("week")}
        >
          Week
        </Button>
        <Button
          type={view === "day" ? "primary" : "default"}
          icon={<FileDoneOutlined />}
          onClick={() => onViewChange("day")}
        >
          Day
        </Button>
      </div>

      {/* Today Button */}
      <Button type="default" onClick={onToday} className="ml-4">
        Today
      </Button>
    </div>
  );
};

export default CustomToolbar;
