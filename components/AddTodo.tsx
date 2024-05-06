"use client";
import React, { useState } from "react";
import { insertTodos } from "@/app/todos/actions";

type TodoType = {
  id: string;
  title: string;
  content: string;
  complete: boolean;
};

export function AddTodo() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  const [todoItems, setTodoItems] = useState<TodoType[]>([]);

  return (
    <>
      <form action={insertTodos}>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="タイトル"
            className="p-2 border rounded"
            name="inputTitle"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="内容"
            className="p-2 border rounded"
            name="inputContent"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
          <button className="p-2 bg-blue-500 text-white rounded" type="submit">
            追加
          </button>
        </div>
      </form>
    </>
  );
}

export default AddTodo;
