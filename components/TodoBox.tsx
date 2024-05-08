"use client";
import React, { useEffect, useState } from "react";
import {
  fetchTodos,
  completeTodos,
  deleteTodos,
  restoreTodos,
} from "@/app/todos/actions";
import { Tables } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/client";

export default function TodoBox() {
  const [todos, setTodos] = useState<Tables<"todos">[]>([]);
  const [updateTodos, setUpdateTodos] = useState<Tables<"todos">[]>([]);
  const supabase = createClient();

  const fetchRealtimeTodos = () => {
    try {
      supabase
        .channel("table_postgres_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "todos",
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const { id, title, content, complete } = payload.new;
              setTodos((todos) => [...todos, { id, title, content, complete }]);
            }

            if (payload.eventType === "DELETE") {
              setTodos((todos) =>
                todos.filter((todo) => todo.id !== payload.old.id)
              );
            }

            if (payload.eventType === "UPDATE") {
              const { id, title, content, complete } = payload.new;

              setTodos((todos) =>
                todos.map((todo) => {
                  if (todo.id === payload.old.id) {
                    return { ...todo, title, content, complete };
                  }
                  return todo;
                })
              );
            }
          }
        )
        .subscribe();

      return () => {
        supabase.channel("table_postgres_changes").unsubscribe();
      };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function loadTodos() {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos || []);
    }
    // loadTodos();
    fetchRealtimeTodos();
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
