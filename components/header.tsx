import React, { useContext } from "react";
import TodoContext from "../store/todo-context";

export const Header = () => {
  const { todosList } = useContext(TodoContext);

  return (
    <header className="absolute top-0 flex items-center w-full h-14 bg-disc-not-quite-black">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <h1 className="p-1 font-bold border rounded text-neutral-200 bg-disc-not-so-blurple border-neutral-200">
          Taskord
        </h1>
        <ul className="flex gap-2 mx-4 text-neutral-200">
          <li>Github</li>
        </ul>
      </div>
    </header>
  );
};
