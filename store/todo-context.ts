import React, { useContext } from "react";

export interface Todo {
  task: string;
  completed: boolean;
  id: string;
}

export interface ITodoContext {
  todosList: Todo[];
  addTodo: (task: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

// const defaultTodo:ITodoContext = {
//   task: '',
//   completed: false,
//   id: '',
// }

export type TodoContextType = {
  todosList: Todo[];
  addTodo: (task: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};

const TodoContext = React.createContext<TodoContextType | null>(null);

export function useTodoCtx() {
  return useContext(TodoContext);
}

export default TodoContext;
