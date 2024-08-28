"use client";
// /components/CreateTaskModal.tsx

import { Status, useStatusStore, useTaskStore } from "@/store/store";
import { Button, Input, message, Select } from "antd";
import React, { useState, useEffect } from "react";
import StatusModal from "./StatusModal";

const CreateTaskModal: React.FC = () => {
  const [title, setTitle] = useState("");
  const { statuses } = useStatusStore();
  const [status, setStatus] = useState<Status>({} as Status);
  const { addTask } = useTaskStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (statuses.length > 0) {
      setStatus(statuses[0]); // Set the default status to the first item in the statuses array
    }
  }, [statuses]);

  const handleSubmit = () => {
    if (!title || !status.id) return;
    addTask(title, status);
    setTitle("");
    setStatus(statuses[0]);
    message.success("Task created successfully");
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex items-center justify-between p-4 w-full">
      <div className="flex items-center justify-center w-3/4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border border-gray-300 p-2 m-2 cursor-pointer text-gray-600 w-200"
        />

        <Select
          value={status.id}
          onChange={(value) => {
            const selectedStatus = statuses.find(
              (status) => status.id === value
            );
            if (selectedStatus) {
              setStatus(selectedStatus); // Setting the entire status object
            }
          }}
          style={{ width: "100%" }}
        >
          {statuses.map((status) => (
            <Select.Option key={status.id} value={status.id}>
              {status.name.replace("-", " ").toUpperCase()}
            </Select.Option>
          ))}
        </Select>

        <Button
          style={{
            backgroundColor: "#f9fafb",
            color: "#000",
            borderColor: "#d9d9d9",
          }}
          onClick={handleSubmit}
          className="m-2"
        >
          Add Task
        </Button>
      </div>

      <Button
        style={{
          backgroundColor: "#f9fafb",
          color: "#000",
          borderColor: "#d9d9d9",
        }}
        onClick={handleOpenModal}
        className="m-2"
      >
        Add Status
      </Button>

      <StatusModal visible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default CreateTaskModal;
