"use client";

import React from "react";
import {
  Task,
  useDeleteProjectMutation,
  useProjectQuery,
} from "@/generated/graphql";
import { TaskList, TaskForm } from "@/components/Tasks";
import { useParams, useRouter } from "next/navigation";

const ProjectDetails = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;

  const [deleteProjectMutation] = useDeleteProjectMutation();

  const { data, loading, error } = useProjectQuery({
    skip: !projectId,
    variables: {
      projectId,
    },
  });

  const handleDeleteProject = async () => {
    try {
      await deleteProjectMutation({
        variables: {
          projectId,
        },
      });

      // TODO: push notification successfully removed project
      router.back();
    } catch (error) {
      console.log("err", error);
    }
  };

  if (loading) {
    return <div>Loading details...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1>{data?.project?.name}</h1>
        <h1>{data?.project?.description}</h1>

        <button className="bg-red-600 px-4 py-2" onClick={handleDeleteProject}>
          Delete
        </button>
      </div>

      <TaskForm />

      <div>
        <h2> Tasks : </h2>

        <TaskList tasks={(data?.project?.tasks as Task[]) ?? []} />
      </div>
    </div>
  );
};

export default ProjectDetails;
