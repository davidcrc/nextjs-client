"use client";

import React from "react";
import { Project, useProjectsQuery } from "@/generated/graphql";
import { ProjectCard } from "@/components/index";

const ProjectListClient = () => {
  const { data, loading } = useProjectsQuery();

  if (loading) {
    return <div> Loading...</div>;
  }

  if (!loading && !data?.projects?.length) {
    return (
      <p className="text-base italic">
        There is no projects yet, add some projects to start :D
      </p>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto  w-full px-5">
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
