import React from "react";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <div>
        <button className="p-2 m-2 bg-gray-200 dark:bg-gray-600 rounded">
          ダークモード
        </button>
        <button className="p-2 m-2 bg-blue-500 text-white rounded">
          ログイン
        </button>
      </div>
    </header>
  );
};

export default Header;
