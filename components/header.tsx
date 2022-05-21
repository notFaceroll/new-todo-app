import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import TodoContext from "../store/todo-context";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const Header = () => {
  const { todosList, clearCompleted } = useContext(TodoContext);
  const pendingTasks = todosList.filter((todo) => !todo.completed);

  return (
    <header className="flex items-center w-full h-14 bg-disc-not-quite-black">
      <div className="flex items-center justify-between w-full max-w-4xl px-4 mx-auto">
        <h1 className="p-1 font-bold border rounded text-neutral-200 bg-disc-not-so-blurple border-neutral-200">
          Taskord
        </h1>
        <AnimatePresence>
          {todosList.length > 0 && (
            <div className="flex items-center justify-between gap-2">
              <motion.span
                className="text-center text-neutral-200"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                Total - {todosList.length} | Pending - {pendingTasks.length}
              </motion.span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
