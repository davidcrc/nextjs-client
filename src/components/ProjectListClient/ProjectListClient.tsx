"use client";

import React from "react";
import { ProjectsDocument, ProjectsQuery } from "@/generated/graphql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import ProjectCard from "../ProjectCard";

const ProjectListClient = () => {
  const { data } = useSuspenseQuery<ProjectsQuery>(ProjectsDocument);

  return (
    <div>
      {data?.projects?.map((project, index) => {
        return <ProjectCard key={project?.uuid || index} project={project} />;
      })}
    </div>
  );
};

export default ProjectListClient;
