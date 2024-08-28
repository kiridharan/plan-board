// /components/StatusModal.tsx

import { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useStatusStore } from "@/store/store";

const StatusModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const [statusName, setStatusName] = useState("");
  const { addStatus } = useStatusStore();

  const handleAddStatus = () => {
    if (statusName.trim()) {
      addStatus(statusName.trim());
      setStatusName("");
      onClose();
    }
  };

  return (
    <Modal
      title="Create New Status"
      visible={visible}
      onOk={handleAddStatus}
      onCancel={onClose}
      okText="Add Status"
      cancelText="Cancel"
    >
      <Input
        value={statusName}
        onChange={(e) => setStatusName(e.target.value)}
        placeholder="Enter Status Name"
      />
    </Modal>
  );
};

export default StatusModal;
