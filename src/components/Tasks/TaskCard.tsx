import React from "react";
import { Task } from "@/generated/graphql";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <button className="bg-red-600 px-4 py-2">Delete</button>
    </div>
  );
};

export default TaskCard;
