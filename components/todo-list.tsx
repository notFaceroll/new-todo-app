import React, { useState, useContext } from "react";
import TodoContext, { useTodoCtx } from "../store/todo-context";

import { TrashSimple, Square, CheckSquare, PlusCircle } from "phosphor-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CreateTodo } from "./create-task";

interface Todo {
  task: string;
  completed: boolean;
  id: string;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const TodoList: React.FC = () => {
  const todoCtx = useContext(TodoContext);

  const [todoText, setTodoText] = useState("");
  // const [todosList, setTodosList] = useState<Todo[]>([]);

  const userInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    // setTodosList([
    //   ...todosList,
    //   {
    //     task: newTodo,
    //     completed: false,
    //     id: Math.random().toString(36).substring(2, 11),
    //   },
    // ]);
    event.preventDefault();
    todoCtx?.addTodo(todoText);
    setTodoText("");
  };

  const submitText = (text: string) => {
    todoCtx?.addTodo(text);
  };

  const deleteTodoHandler = (id: string) => {
    // const updatedList = todosList.filter((todo) => todo.id !== id);
    // setTodosList(updatedList);
    todoCtx?.deleteTodo(id);
  };

  const todoHandler = (id: string) => {
    // const updatedList = todosList.map((todo) => {
    //   if (todo.id === id) {
    //     todo.completed = !todo.completed;
    //     return todo;
    //   }
    //   return todo;
    // });
    // setTodosList(updatedList);
    todoCtx?.toggleTodo(id);
  };

  return (
    <main className="w-4/5 overflow-auto flex flex-col max-w-lg h-96 p-4 border rounded shadow-lg bg-sky-200 border-cyan-600  relative">
      {/* <form
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
      </form> */}
      <CreateTodo submitText={submitText} />
      <LayoutGroup>
        <ul className="overflow-auto h-full">
          <AnimatePresence>
            {todoCtx?.todosList.map((todo) => (
              <motion.li
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-between p-2 my-2 rounded bg-gradient-to-r from-sky-400 to-cyan-300"
                key={todo.id}
                layout={"position"}
              >
                <button
                  className="flex items-center gap-1"
                  onClick={() => todoHandler(todo.id)}
                >
                  {todo.completed ? (
                    <CheckSquare size={24} className="text-slate-800" />
                  ) : (
                    <Square size={24} className="text-slate-800" />
                  )}
                  <span
                    className={`${
                      todo.completed ? "line-through" : null
                    } className="text-slate-800"`}
                  >
                    {todo.task}
                  </span>
                </button>
                <button
                  className="p-1 mx-2 rounded bg-sky-100"
                  onClick={() => {
                    deleteTodoHandler(todo.id);
                  }}
                >
                  <TrashSimple className="text-cyan-600" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </LayoutGroup>
    </main>
  );
};
