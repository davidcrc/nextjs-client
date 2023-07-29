"use client";

import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ProjectDocument, useCreateTaskMutation } from "@/generated/graphql";
import { useParams } from "next/navigation";

type Inputs = {
  title: string;
};

const TaskForm = () => {
  const params = useParams();

  const projectId = params.id;
  const [createTaskMutation, { loading }] = useCreateTaskMutation();

  const { control, reset, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!projectId) return;

    try {
      await createTaskMutation({
        variables: {
          projectId,
          title: data.title,
        },
        // TODO: to get current project again , maybe better is update cache
        refetchQueries: [
          {
            query: ProjectDocument,
            variables: {
              projectId,
            },
          },
          "GetProject",
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
      className="flex flex-col gap-4 max-w-md"
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            placeholder="write a name"
            type="text"
            className="text-black"
          />
        )}
      />

      <button
        type="submit"
        className="bg-green-600 text-gray-800 disabled:bg-slate-400 "
        disabled={loading}
      >
        {loading ? "adding task" : "Add task"}
      </button>
    </form>
  );
};

export default TaskForm;
