import React from "react";
import { getClient } from "@/lib/client";
import { ProjectsDocument, ProjectsQuery } from "@/generated/graphql";
import ProjectCard from "../ProjectCard";

const ProjectListServer = async () => {
  const { data } = await getClient().query<ProjectsQuery>({
    query: ProjectsDocument,
  });

  return (
    <div>
      {data?.projects?.map((project, index) => {
        return <ProjectCard key={project?.uuid || index} project={project} />;
      })}
    </div>
  );
};

export default ProjectListServer;
