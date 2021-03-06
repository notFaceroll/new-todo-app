import React from "react";

export interface Todo {
  task: string;
  completed: boolean;
  id: string;
}

export type TodoContextType = {
  todosList: Todo[];
  addTodo: (task: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
  editTodo: (text: string, id: string) => void;
};

const defaultTodo: TodoContextType = {
  todosList: [],
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  clearCompleted: () => {},
  editTodo:() => {},
};

const TodoContext = React.createContext<TodoContextType>(defaultTodo);

export default TodoContext;
