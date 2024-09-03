import React from "react";

import { BurnBarrel } from "./BurnBarrel";
import { Column } from "./Columns";

const KanbanBoard = () => {
  return (
    <div className="flex space-x-4">
      <Column title="Backlog" column="backlog" headingColor="text-white-300" />
      <Column title="TODO" column="todo" headingColor="text-yellow-200" />
      <Column title="In progress" column="doing" headingColor="text-blue-200" />
      <Column title="Complete" column="done" headingColor="text-emerald-200" />
      <BurnBarrel />
    </div>
  );
};

export default KanbanBoard;
