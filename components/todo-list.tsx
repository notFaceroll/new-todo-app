import React, { useState } from "react";
import { TrashSimple, Square, CheckSquare } from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  task: string;
  completed: boolean;
  id: string;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todosList, setTodosList] = useState<Todo[]>([]);

  const userInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setTodosList([
      ...todosList,
      {
        task: newTodo,
        completed: false,
        id: Math.random().toString(36).substring(2, 11),
      },
    ]);

    setNewTodo("");
  };

  const deleteTodoHandler = (id: string) => {
    const updatedList = todosList.filter((todo) => todo.id !== id);

    setTodosList(updatedList);
  };

  const todoHandler = (id: string) => {
    const updatedList = todosList.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return todo;
      }
      return todo;
    });
    setTodosList(updatedList);
  };

  return (
    <main className="w-4/5 p-2 border rounded shadow-lg bg-sky-200 border-cyan-600">
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap items-center gap-2"
      >
        <input
          className="flex-1 p-2 my-2 rounded outline-cyan-600 bg-sky-100 placeholder:text-cyan-700"
          value={newTodo}
          onChange={userInputHandler}
          placeholder="Add your new task here!"
          maxLength={32}
        />
        <button
          type="submit"
          className="flex-initial w-32 p-2 text-white rounded bg-cyan-600"
        >
          Add Todo
        </button>
      </form>
      <ul>
        <AnimatePresence>
          {todosList.map((todo, index) => (
            <motion.li
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center justify-between p-2 my-2 rounded cursor-grab bg-gradient-to-r from-sky-400 to-cyan-300"
              key={todo.id}
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
    </main>
  );
};
