"use server";
import { createClient } from "@/utils/supabase/server";

export async function insertTodos (formData: FormData){
  const supabase = createClient();

  // Todoの入力値を取得する
  const todo = {
    todoTitle:  formData.get("inputTitle") as string | null,
    todoContent: formData.get("inputContent") as string | null,
  }

  const { data, error } = await supabase
  .from("todos")
  .insert([{ title: todo.todoTitle, content: todo.todoContent, complete: false}]);


};
