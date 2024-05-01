"use client";
import React, { useState } from "react";

type TodoType = {
  id: string;
  title: string;
  content: string;
  complete: boolean;
};

export default async function Home() {
  // これはデータベースを追加するまでの仮ID
  const newId = Date.now().toString();
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [todoItems, setTodoItems] = useState<TodoType[]>([
    { id: "non0", title: "title1", content: "content1", complete: false },
    { id: "none1", title: "title2", content: "content2", complete: false },
  ]);
  const [completeTodos, setCompleteTodos] = useState<TodoType[]>([
    {
      id: "complete0",
      title: "完了したtitle1",
      content: "完了したcontent1",
      complete: true,
    },
    {
      id: "complete1",
      title: "完了したtitle2",
      content: "完了したcontent2",
      complete: true,
    },
  ]);

  const handleAddTodo = () => {
    const newTodos = {
      id: newId,
      title: inputTitle,
      content: inputContent,
      complete: false,
    };
    setTodoItems([...todoItems, newTodos]);
  };

  const handleDeleteTodo = (id: string, complete: boolean) => {
    // 押したものが未完了Todoだった場合
    if (complete === false) {
      // 未完了Todoを更新(未完了Todoを一覧にして、押したID以外のTODOを残す。)
      setTodoItems(todoItems.filter((todo) => todo.id !== id));
    } else {
      // 完了Todoだった場合
      setCompleteTodos(completeTodos.filter((todo) => todo.id !== id));
    }
  };

  const handleCompleteTodo = (id: string) => {
    // クリックしたTodo
    const targetTodo = todoItems.find((todo) => todo.id === id);
    if (targetTodo) {
      // 未完了のTodoから対象を消す
      setTodoItems(todoItems.filter((todo) => todo.id !== id));
      // 完了のTodoに対象のTodoを追加する
      setCompleteTodos([...completeTodos, targetTodo]);
    }
  };

  const handleRestoreTodo = (id: string) => {
    const targetTodo = completeTodos.find((todo) => todo.id === id);

    if (targetTodo) {
      setCompleteTodos(completeTodos.filter((todo) => todo.id !== id));
      setTodoItems([...todoItems, targetTodo]);
    }
  };

  return (
    <>
      <div className="p-4 max-w-[800px] mx-auto">
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="タイトル"
            className="p-2 border rounded"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="内容"
            className="p-2 border rounded"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleAddTodo}
          >
            追加
          </button>
        </div>
        <div className="bg-white rounded-lg p-4">
          <h2
            className="text-xl font-bold
          "
          >
            未完了のTodo
          </h2>
          <ul className="mt-4">
            {todoItems.map((todo) => (
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
                    onClick={() => handleDeleteTodo(todo.id, false)}
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
            {completeTodos.map((todo) => (
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
                    onClick={() => handleDeleteTodo(todo.id, true)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
