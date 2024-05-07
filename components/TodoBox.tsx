"use client";
import React, { useEffect, useState } from "react";
import {
  fetchTodos,
  completeTodos,
  deleteTodos,
  restoreTodos,
} from "@/app/todos/actions";
import { Database, Tables } from "@/lib/database.types";

export default function TodoBox() {
  const [todos, setTodos] = useState<Tables<"todos">[]>([]);
  // const [completeTodos, setCompleteTodos] = useState<Tables<"todos">[]>([]);

  useEffect(() => {
    async function loadTodos() {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos || []);
    }
    loadTodos();
  }, []);

  const handleDeleteTodo = (id: number) => {
    deleteTodos(id);
  };

  const handleCompleteTodo = (id: number) => {
    completeTodos(id);
  };

  const handleRestoreTodo = (id: number) => {
    restoreTodos(id);
  };
  return (
    <>
      <div className="bg-white rounded-lg p-4">
        <h2
          className="text-xl font-bold
          "
        >
          未完了のTodo
        </h2>
        <ul className="mt-4">
          {todos
            .filter((todo) => !todo.complete)
            .map((todo) => (
              <li
                className="p-2 border-b flex justify-between items-center"
                key={todo.id}
              >
                <span>
                  ID: {todo.id} / {todo.title}: {todo.content}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 active:scale-95 transition duration-300"
                    onClick={() => handleCompleteTodo(todo.id)}
                  >
                    完了
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:scale-95 transition duration-300"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="bg-white rounded-lg p-4 mt-4">
        <h2
          className="text-xl font-bold
          "
        >
          完了したTodo
        </h2>
        <ul className="mt-4">
          {todos
            .filter((todo) => todo.complete)
            .map((todo) => (
              <li
                className="p-2 border-b flex justify-between items-center"
                key={todo.id}
              >
                <span className="line-through">
                  ID: {todo.id} / {todo.title}: {todo.content}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:scale-95 transition duration-300"
                    onClick={() => handleRestoreTodo(todo.id)}
                  >
                    戻す
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:scale-95 transition duration-300"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
