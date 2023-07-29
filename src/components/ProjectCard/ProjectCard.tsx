import React from "react";
import { Project } from "@/generated/graphql";
import Link from "next/link";

const ProjectCard = ({ project }: { project?: Project }) => {
  return (
    <Link href={`/projects/${project?.uuid}`}>
      <div className="bg-zinc-800 w-full rounded-lg shadow-lg shadow-black p-4 mb-2 hover:bg-zinc-700 hover:cursor-pointer">
        <h2>{project?.name}</h2>
        <p>{project?.description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
