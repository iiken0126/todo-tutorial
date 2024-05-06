import { createClient } from "@/utils/supabase/server";

export default async function TodoBox() {
  const supabase = createClient();

  const { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    return <div>Todoがまだ登録されていません</div>;
  }

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
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 active:scale-95 transition duration-300">
                    完了
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:scale-95 transition duration-300">
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
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:scale-95 transition duration-300">
                    戻す
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:scale-95 transition duration-300">
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
