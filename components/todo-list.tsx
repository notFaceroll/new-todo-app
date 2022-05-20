import React, { Fragment, useContext } from "react";
import TodoContext from "../store/todo-context";

import { Trash, Circle, CheckCircle } from "phosphor-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CreateTodo } from "./create-task";

import { TodoProvider } from "../store/todo-provider";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const TodoList: React.FC = () => {
  const { addTodo, deleteTodo, toggleTodo, todosList } =
    useContext(TodoContext);
  const pendingTasks = todosList.filter((todo) => !todo.completed).length;
  const submitText = (text: string) => {
    addTodo(text);
  };

  const deleteTodoHandler = (id: string) => {
    deleteTodo(id);
  };

  const todoHandler = (id: string) => {
    toggleTodo(id);
  };

  return (
    <main className="relative flex flex-col w-4/5 h-5/6 max-w-xl p-4 overflow-auto border rounded-lg shadow-lg  bg-disc-dark-grey border-disc-not-so-blurple">
      <LayoutGroup>
        <ul className="h-full overflow-auto text-neutral-200">
          <AnimatePresence>
            {todosList.map((todo) => (
              <motion.li
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-between p-3 my-2 rounded-lg bg-disc-grey"
                key={todo.id}
                layout={"position"}
              >
                <button
                  className="flex items-center gap-1"
                  onClick={() => todoHandler(todo.id)}
                >
                  {todo.completed ? (
                    <CheckCircle size={24} className="text-disc-online-green" />
                  ) : (
                    <Circle size={24} />
                  )}
                  <span
                    className={`${todo.completed ? "line-through" : null} ml-1`}
                  >
                    {todo.task}
                  </span>
                </button>
                <button
                  className="p-1 rounded"
                  aria-label="Delete task"
                  onClick={() => {
                    deleteTodoHandler(todo.id);
                  }}
                >
                  <Trash size={20} className=" text-disc-dnd-red" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </LayoutGroup>
      <AnimatePresence>
        {todosList.length > 0 && (
          <motion.span
            className="text-neutral-200 text-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Total tasks - {todosList.length} | Tasks pending - {pendingTasks}
          </motion.span>
        )}
      </AnimatePresence>
      <CreateTodo submitText={submitText} />
    </main>
  );
};
