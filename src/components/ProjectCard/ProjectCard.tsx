import React from "react";
import { Project } from "@/generated/graphql";
import Link from "next/link";

const ProjectCard = ({ project }: { project?: any }) => {
  return (
    <Link href={`/projects/${project?.uuid}`}>
      <div className="hover:bg-slate-400">
        <h2>{project?.name}</h2>
        <p>{project?.description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
