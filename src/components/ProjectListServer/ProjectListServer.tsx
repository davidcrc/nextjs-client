import React from "react";
import { getClient } from "@/lib/client";
import { Project, ProjectsDocument, ProjectsQuery } from "@/generated/graphql";
import { ProjectCard } from "@/components/index";

const ProjectListServer = async () => {
  const { data } = await getClient().query<ProjectsQuery>({
    query: ProjectsDocument,
  });

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

export default ProjectListServer;
