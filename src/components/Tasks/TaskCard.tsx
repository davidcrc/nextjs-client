import React from "react";
import {
  ProjectDocument,
  Task,
  useDeleteTaskMutation,
} from "@/generated/graphql";
import { AiOutlineDelete } from "react-icons/ai";

const TaskCard = ({ task }: { task: Task }) => {
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const handleDeleteTask = () => {
    //
    deleteTaskMutation({
      variables: {
        taskId: task.uuid,
      },
      refetchQueries: [
        {
          query: ProjectDocument,
          variables: {
            projectId: task.projectId,
          },
        },
        "GetProject",
      ],
    });
  };

  return (
    <div className="bg-zinc-900 px-5 py-3 flex gap-2 justify-between ">
      <h2 className="self-center">{task.title}</h2>
      <button className="bg-zinc-700 px-3 py-2" onClick={handleDeleteTask}>
        <AiOutlineDelete className="text-red-600" />
      </button>
    </div>
  );
};

export default TaskCard;
