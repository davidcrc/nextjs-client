"use client";

import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ProjectsDocument,
  useCreateProjectMutation,
} from "@/generated/graphql";

type Inputs = {
  name: string;
  description: string;
};

const ProjectForm = () => {
  const [createProjectMutation, { loading, error }] =
    useCreateProjectMutation();

  const { control, watch, reset, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { name: nameWatch } = watch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await createProjectMutation({
        variables: {
          ...data,
        },
        // TODO: to get projects again , maybe better is update cache
        refetchQueries: [
          {
            query: ProjectsDocument,
          },
          "GetProjects",
        ],
      });

      reset({});
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-5 md:px-0 gap-4 w-2/5 max-w-md w-full"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            placeholder="write a name"
            type="text"
            className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full"
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            name="description"
            rows={3}
            placeholder="Write a description"
            className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full"
          ></textarea>
        )}
      />

      <button
        className="bg-green-600 text-gray-800 disabled:bg-slate-400 px-4 py-1 rounded-md "
        disabled={!nameWatch || loading}
      >
        Save
      </button>
      {error && <p>{error?.message}</p>}
    </form>
  );
};

export default ProjectForm;
