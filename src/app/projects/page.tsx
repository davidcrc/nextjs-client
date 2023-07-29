import React from "react";
import { ProjectForm, ProjectListClient } from "@/components/index";

const Projects = async () => {
  return (
    <div className="flex flex-col bg-zinc-900 rounded-lg shadow-lg shadow-black p-8 h-4/5 max-w-screen-lg w-full ">
      <h1 className="text-2xl font-bold py-2 mb-4">Project Manager</h1>

      <div className="flex flex-col gap-4  md:flex-row justify-between gap-x-1 h-[90%] ">
        <ProjectForm />
        <ProjectListClient />
      </div>
    </div>
  );
};

export default Projects;
