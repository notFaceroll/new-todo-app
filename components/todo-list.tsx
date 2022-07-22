import React, { useContext } from "react";
import TodoContext from "../store/todo-context";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CreateTodo } from "./create-task";
import { TaskItem } from "./task-item";

const btnVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.8 },
  hover: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const TodoList = () => {
  const { addTodo, todosList, clearCompleted } = useContext(TodoContext);

  const completedTasks = todosList.filter((todo) => todo.completed);

  return (
    <main className="relative flex flex-col w-full h-full max-w-4xl p-4 overflow-auto bg-disc-dark-grey border-disc-not-so-blurple">
      <LayoutGroup>
        <ul className="h-full overflow-auto text-neutral-200">
          <AnimatePresence>
            {todosList.map((todo) => (
              <TaskItem todo={todo} key={todo.id} />
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
