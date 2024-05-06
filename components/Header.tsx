import React from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/login/actions";

export default async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <div className="flex items-center gap-2">
        <button className="p-2 m-2 bg-gray-200 dark:bg-gray-600 rounded">
          ダークモード
        </button>
        {user !== null ? (
          <form className="" action={signOut}>
            <p className="text-white">{user.email}</p>
            <button className="text-white">ログアウト</button>
          </form>
        ) : (
          <Link
            className="p-2 m-2 bg-blue-500 text-white rounded"
            href="/login"
          >
            ログイン
          </Link>
        )}
      </div>
    </header>
  );
}
