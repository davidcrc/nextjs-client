"use client";

import React from "react";
import { Project, useProjectsQuery } from "@/generated/graphql";
import ProjectCard from "../ProjectCard";

const ProjectListClient = () => {
  const { data, loading } = useProjectsQuery();

  if (loading) {
    return <div> Loading...</div>;
  }

  return (
    <div>
      {data?.projects?.map((project, index) => {
        return (
          <ProjectCard
            key={project?.uuid || index}
            project={project as Project}
          />
        );
      })}
    </div>
  );
};

export default ProjectListClient;
