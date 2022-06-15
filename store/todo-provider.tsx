import React, { useState } from "react";
import TodoContext, { Todo } from "./todo-context";

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todosList, setTodosList] = useState<Todo[]>([]);

  const editTodo = (id: string, text: string) => {
    const updatedList = todosList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: text };
      }
      return todo;
    });
    setTodosList(updatedList);
  };

  const addTodo = (text: string) => {
    setTodosList([
      ...todosList,
      {
        task: text,
        completed: false,
        id: Math.random().toString(36).substring(2, 11),
      },
    ]);
  };

  const deleteTodo = (id: string) => {
    const updatedList = todosList.filter((todo) => todo.id !== id);

    setTodosList(updatedList);
  };

  const toggleTodo = (id: string) => {
    const updatedList = todosList.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return todo;
      }
      return todo;
    });
    setTodosList(updatedList);
  };

  const clearCompleted = () => {
    const completedTasks = todosList.filter((todo) => todo.completed);
    if (completedTasks.length === 0) {
      return;
    }

    const updatedList = todosList.filter((todo) => !todo.completed);

    setTodosList(updatedList);
  };

  const todoContext = {
    todosList,
    addTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    editTodo,
  };
  return (
    <TodoContext.Provider value={todoContext}>{children}</TodoContext.Provider>
  );
};
