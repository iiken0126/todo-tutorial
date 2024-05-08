"use server";
import { createClient } from "@/utils/supabase/server";

export async function fetchTodos() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("todos").select();
    return data;
  } catch (error) {
    console.error(error)
  }
}

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

export async function deleteTodos (id: number) {
  const supabase = createClient();
  const { error } = await supabase
  .from("todos")
  .delete()
  .eq('id', id);
}

export async function completeTodos (id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("todos").update({complete: true}).eq('id', id);
}

export async function restoreTodos (id: number ) {
  const supabase = createClient();
  
  const { error } = await supabase.from("todos").update({complete: false}).eq("id", id);
}

