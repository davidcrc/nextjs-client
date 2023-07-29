import React from "react";
import { Task } from "@/generated/graphql";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div>
      <h2>{task.title}</h2>
    </div>
  );
};

export default TaskCard;
