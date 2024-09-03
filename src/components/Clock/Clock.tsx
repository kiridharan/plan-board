"use client";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { MdDelete, MdAdd } from "react-icons/md";
import { Button, message, Modal, Select } from "antd";
import { useClockStore } from "@/store/clockstore";

const { Option } = Select;

const WorldClock: React.FC = () => {
  const { timezones, selectedTimezones, addTimezone, removeTimezone } =
    useClockStore();

  const [currentTime, setCurrentTime] = useState<{
    [key: string]: { hours: number; minutes: number; seconds: number };
  }>({});

  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  useEffect(() => {
    const updateTime = () => {
      setLoading(true);
      const timeUpdates: {
        [key: string]: { hours: number; minutes: number; seconds: number };
      } = {};
      selectedTimezones.forEach((timezone: any) => {
        const now = moment().tz(timezone);
        timeUpdates[timezone] = {
          hours: now.hour(),
          minutes: now.minute(),
          seconds: now.second(),
        };
      });
      setCurrentTime(timeUpdates);
      setLoading(false);
    };

    updateTime(); // Initial update
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [selectedTimezones]);

  const handleAddTimezone = (timezone: string) => {
    // if timezone is not already added
    if (timezone && !selectedTimezones.includes(timezone)) {
      addTimezone(timezone);
      setIsModalVisible(false); // Hide modal after adding timezone
    }

    // if timezone is already added
    else {
      message.error("Timezone already added");
    }
  };

  const handleRemoveTimezone = (timezone: string) => {
    removeTimezone(timezone);
  };

  return (
    <div className="h-screen w-full bg-gray text-white flex flex-col items-center pt-10">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8">World Clock</h1>
          <div className="flex flex-wrap justify-center gap-8 mb-4">
            {selectedTimezones.map((timezone: any) => {
              const { hours, minutes, seconds } = currentTime[timezone] || {
                hours: 0,
                minutes: 0,
                seconds: 0,
              };

              return (
                <div
                  key={timezone}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center relative"
                >
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    {timezone.replace(/[^a-zA-Z]/g, " ")}
                    <MdDelete
                      className="ml-2 cursor-pointer text-red-500 hover:text-red-400"
                      onClick={() => handleRemoveTimezone(timezone)}
                    />
                  </h2>
                  <div className="text-4xl font-mono">
                    <div className="fade-text">
                      {hours > 12 ? hours - 12 : hours === 0 ? 12 : hours}:
                      {minutes.toString().padStart(2, "0")}:
                      {seconds.toString().padStart(2, "0")}
                      {hours >= 12 ? " PM" : " AM"}
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center relative cursor-pointer"
              onClick={() => setIsModalVisible(true)}
            >
              <MdAdd className="text-4xl text-white" />
              <p className="mt-2 text-white">Add Timezone</p>
            </div>
          </div>
          <Modal
            title="Select a Timezone to Add"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            className="w-96 bg-gray-800"
          >
            <div className="flex flex-col gap-2">
              {timezones.map((timezone: any) => (
                <Button
                  key={timezone}
                  onClick={() => handleAddTimezone(timezone)}
                  className="w-full text-left"
                >
                  {timezone}
                </Button>
              ))}
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default WorldClock;
