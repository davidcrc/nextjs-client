import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/generated/graphql";

interface TaskList {
  tasks: Array<Task>;
}

const TaskList = ({ tasks }: TaskList) => {
  return (
    <div>
      {tasks.map((task, index) => {
        return <TaskCard key={task?.uuid || index} task={task} />;
      })}
    </div>
  );
};

export default TaskList;
