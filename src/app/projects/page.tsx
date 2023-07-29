import React from "react";
import { ProjectForm, ProjectListClient } from "@/components/index";

const Projects = async () => {
  return (
    <div>
      <ProjectForm />

      <ProjectListClient />
    </div>
  );
};

export default Projects;
