import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "@/generated/graphql";

interface TaskList {
  tasks: Array<Task>;
}

const TaskList = ({ tasks }: TaskList) => {
  if (!tasks.length) {
    return (
      <p className="text-gray-300 italic text-sm">
        There is no tasks, add some tasks :D{" "}
      </p>
    );
  }

  return (
    <>
      {tasks.map((task, index) => {
        return <TaskCard key={task?.uuid || index} task={task} />;
      })}
    </>
  );
};

export default TaskList;
