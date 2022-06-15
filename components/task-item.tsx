import { motion } from "framer-motion";
import { CheckCircle, Circle, PencilSimpleLine, Trash } from "phosphor-react";
import React, { useContext, useState } from "react";
import TodoContext, { Todo } from "../store/todo-context";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

interface TodoProps {
  todo: Todo;
}

export const TaskItem: React.FC<TodoProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.task);

  const editTaskInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const submitEditedTextHandler = (event: React.FormEvent) => {
    event.preventDefault();
    editTodo(todo.id, text);
    setText(text);
    setIsEditing(false);
  };

  const { deleteTodo, toggleTodo, editTodo } = useContext(TodoContext);

  return (
    <motion.li
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-between gap-3 p-3 my-2 rounded-lg bg-disc-grey"
      key={todo.id}
      layout={"position"}
    >
      <div className="flex gap-1 basis-6/12">
        <button
          className="flex items-center gap-1"
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.completed ? (
            <CheckCircle size={24} className="text-disc-online-green" />
          ) : (
            <Circle size={24} />
          )}
        </button>
        {!isEditing ? (
          <span className={`${todo.completed ? "line-through" : null} ml-1`}>
            {todo.task}
          </span>
        ) : (
          <form onSubmit={submitEditedTextHandler} className="flex-1">
            <input
              type="text"
              onChange={editTaskInputHandler}
              value={text}
              maxLength={32}
              className="w-full px-3 rounded-md bg-neutral-700 outline-disc-greyple outline outline-1"
            />
          </form>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button>
          <PencilSimpleLine
            size={20}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            className="text-neutral-200 text-opacity-40 hover:text-disc-idle-yellow"
          />
        </button>
        <button
          className="p-1 transition-colors rounded"
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
      </div>
    </motion.li>
  );
};
