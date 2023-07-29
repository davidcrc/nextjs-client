"use client";

import React from "react";
import {
  Task,
  useDeleteProjectMutation,
  useProjectQuery,
} from "@/generated/graphql";
import { TaskList, TaskForm } from "@/components/Tasks";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

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
    <div className="flex flex-col gap-4 w-full max-w-2xl ">
      <Link href={"/projects"}>
        <BiArrowBack className="text-2xl" />
      </Link>
      <div className="bg-zinc-900 mb-2 p-10 flex justify-between ">
        <div>
          <h1 className="text-2xl">{data?.project?.name}</h1>
          <p>{data?.project?.description}</p>
        </div>
      </div>
      <button
        className="bg-red-500 px-3 py-2 w-fit"
        onClick={handleDeleteProject}
      >
        Delete
      </button>

      <TaskForm />

      <div>
        <h2> Tasks : </h2>

        <TaskList tasks={(data?.project?.tasks as Task[]) ?? []} />
      </div>
    </div>
  );
};

export default ProjectDetails;
