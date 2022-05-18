import React, { useContext, useState } from 'react'
import TodoContext from '../store/todo-context';

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
    <form
      onSubmit={submitHandler}
      className="flex items-center gap-2 mb-4 relative"
    >
      <input
        className="flex-1 p-2 pl-10 my-2 rounded outline-cyan-600 bg-sky-100 placeholder:text-cyan-700"
        value={todoText}
        onChange={userInputHandler}
        placeholder="Add your new task here!"
        maxLength={32}
        required
      />
      <button
        disabled={todoCtx?.todosList && todoCtx?.todosList.length > 15}
        type="submit"
        className="absolute flex items-center justify-center left-2 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <PlusCircle size={24} className="text-cyan-600" />
      </button>
    </form>
  );
};
