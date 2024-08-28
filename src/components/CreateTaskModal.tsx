"use client";
// /components/CreateTaskModal.tsx

import { Status, useStatusStore, useTaskStore } from "@/store/store";
import { Button, Input, message, Select } from "antd";
import React, { useState } from "react";
import StatusModal from "./StatusModal";
const CreateTaskModal: React.FC = () => {
  const [title, setTitle] = useState("");
  const { statuses } = useStatusStore();
  // const [status, setStatus] = useState<Status>("todo");
  const [status, setStatus] = useState<Status>({} as Status);
  const { addTask } = useTaskStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!title) return;
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

  // create modal for status master creation

  return (
    <div
      className="flex items-center justify-between p-4 w-full"
      // width="100%"
      // style={{ height: "100vh" }}
    >
      <div
        className="flex items-center justify-center w-3/4"
        // style={{ height: "100vh" }}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border border-gray-300 p-2 m-2 cursor-pointer text-gray-600 w-200"
        />

        <Select
          value={status.name}
          onChange={(value) => {
            const selectedStatus = statuses.find(
              (status) => status.id === value
            );
            if (selectedStatus) {
              setStatus(selectedStatus); // Setting the entire status object
            }
          }}
          style={{ width: "100%" }}
          // className="border border-gray-300 p-2 m-2 cursor-pointer text-gray-600"
        >
          {statuses.map((status) => (
            <Select.Option key={status.id} value={status.id}>
              {status.name.replace("-", " ").toUpperCase()}
            </Select.Option>
          ))}
          {/* <Select.Option value="done">Done</Select.Option> */}
        </Select>
        <Button
          style={{
            backgroundColor: "#f9fafb",
            color: "#000",
            borderColor: "#d9d9d9",
          }}
          onClick={handleSubmit}
          className="m-2"
          // disabled={!title}
        >
          Add Task
        </Button>
      </div>

      {/* /

        create statue button master creation
      */}
      <Button
        style={{
          backgroundColor: "#f9fafb",
          color: "#000",
          borderColor: "#d9d9d9",
        }}
        onClick={handleOpenModal}
        className="m-2"
        // disabled={!title}
      >
        Add Status
      </Button>

      <StatusModal visible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default CreateTaskModal;
