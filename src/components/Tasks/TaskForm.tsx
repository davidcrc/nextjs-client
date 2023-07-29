import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
};

const TaskForm = () => {
  const { control, watch, reset, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
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

      <button className="bg-green-600 text-gray-800 disabled:bg-slate-400 ">
        Add task
      </button>
    </form>
  );
};

export default TaskForm;
