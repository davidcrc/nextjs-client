import React from "react";
import {
  ProjectDocument,
  Task,
  useDeleteTaskMutation,
} from "@/generated/graphql";

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
    <div>
      <h2>{task.title}</h2>
      <button className="bg-red-600 px-4 py-2" onClick={handleDeleteTask}>
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
