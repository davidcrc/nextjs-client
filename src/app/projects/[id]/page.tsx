"use client";

import React from "react";
import { Task, useProjectQuery } from "@/generated/graphql";
import { TaskList, TaskForm } from "@/components/Tasks";

interface ProjectDetailsProps {
  params: {
    id: string;
  };
}

const ProjectDetails = ({ params }: ProjectDetailsProps) => {
  const projectId = params.id;

  const { data, loading, error } = useProjectQuery({
    skip: !projectId,
    variables: {
      projectId,
    },
  });

  if (loading) {
    return <div>Loading details...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  console.log("details", data);

  return (
    <div>
      <h1>{data?.project?.name}</h1>
      <h1>{data?.project?.description}</h1>

      <button className="bg-red-600 px-4 py-2">Delete</button>

      <TaskForm />
      <TaskList tasks={(data?.project?.tasks as Task[]) ?? []} />
    </div>
  );
};

export default ProjectDetails;
