import React, { useContext } from "react";
import TodoContext from "../store/todo-context";

import { Trash, Circle, CheckCircle } from "phosphor-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CreateTodo } from "./create-task";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const btnVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.8 },
  hover: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const TodoList: React.FC = () => {
  const { addTodo, deleteTodo, toggleTodo, todosList, clearCompleted } =
    useContext(TodoContext);

  const completedTasks = todosList.filter((todo) => todo.completed);

  return (
    <main className="relative flex flex-col w-full h-full max-w-4xl p-4 overflow-auto bg-disc-dark-grey border-disc-not-so-blurple">
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
                  onClick={() => toggleTodo(todo.id)}
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
                  className="p-1 rounded transition-colors"
                  aria-label="Delete task"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  <Trash
                    size={20}
                    className="text-neutral-200 text-opacity-40 hover:text-disc-dnd-red"
                  />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </LayoutGroup>
      <AnimatePresence>
        {completedTasks.length > 0 && (
          <motion.button
            aria-label="Clear All Completed Tasks"
            variants={btnVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            exit="exit"
            className="p-1 rounded-lg text-neutral-200 bg-disc-not-so-blurple"
            onClick={clearCompleted}
          >
            Clear Completed Tasks
          </motion.button>
        )}
      </AnimatePresence>
      <CreateTodo submitText={addTodo} />
    </main>
  );
};
