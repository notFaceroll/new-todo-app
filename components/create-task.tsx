import React, { useContext, useState } from "react";
import TodoContext from "../store/todo-context";

import { PlusCircle } from "phosphor-react";

interface CreateTodoProps {
  submitText: (text: string) => void;
}

export const CreateTodo = ({ submitText }: CreateTodoProps) => {
  const todoCtx = useContext(TodoContext);
  const [todoText, setTodoText] = useState("");

  const userInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    submitText(todoText);
    setTodoText("");
  };

  return (
    <form onSubmit={submitHandler} className="relative flex items-center gap-2">
      <input
        className="flex-1 p-3 my-2 rounded-lg pl-11 text-neutral-200 placeholder:text-opacity-50 focus:outline-disc-not-so-blurple bg-disc-grey placeholder:text-neutral-200"
        value={todoText}
        onChange={userInputHandler}
        placeholder="Add your new task here!"
        maxLength={32}
        required
      />
      <button
        disabled={todoCtx?.todosList && todoCtx?.todosList.length >= 10}
        type="submit"
        aria-label="Add new task"
        className="absolute flex items-center justify-center left-3 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <PlusCircle size={24} className="text-disc-online-green" />
      </button>
    </form>
  );
};
