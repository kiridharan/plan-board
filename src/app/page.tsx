import CreateTaskModal from "@/components/CreateTaskModal";
import KanbanBoard from "@/components/KanbanBoard";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center p-10">
        <h1 className="text-4xl font-bold text-center">Plan Board</h1>
        <CreateTaskModal />
      </div>
      <KanbanBoard />
    </>
  );
}
