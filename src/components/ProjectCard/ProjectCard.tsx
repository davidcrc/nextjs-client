import React from "react";
import { Project } from "@/generated/graphql";

const ProjectCard = ({ project }: { project?: any }) => {
  return (
    <div>
      <h2>{project?.name}</h2>
      <p>{project?.description}</p>
    </div>
  );
};

export default ProjectCard;
