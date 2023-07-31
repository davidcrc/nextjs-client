"use client";

import React from "react";
import {
  ProjectsDocument,
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
        // TODO: to get projects again , maybe better is update cache
        refetchQueries: [
          {
            query: ProjectsDocument,
          },
          "GetProjects",
        ],
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
    <div className="flex flex-col gap-4 w-full max-w-2xl h-full pt-2 ">
      <div className="flex justify-between ">
        <Link href={"/projects"}>
          <BiArrowBack className="text-2xl" />
        </Link>
        <button
          className="hover:bg-red-600 bg-red-500 px-2 py-1 w-fit text-sm"
          onClick={handleDeleteProject}
        >
          Delete
        </button>
      </div>
      <div className="bg-zinc-900 mb-2 p-10 flex flex-col gap-4 justify-between ">
        <div>
          <h1 className="text-2xl">{data?.project?.name}</h1>
          <p className="italic">{data?.project?.description}</p>
        </div>
      </div>

      <TaskForm />

      <h2> Tasks : </h2>
      <div className="h-full overflow-y-auto pb-2">
        <TaskList tasks={(data?.project?.tasks as Task[]) ?? []} />
      </div>
    </div>
  );
};

export default ProjectDetails;
