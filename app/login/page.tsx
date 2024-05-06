import { login, signup } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="p-6 bg-white rounded-lg shadow-lg w-[300px]">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {searchParams.message && (
          <div className="text-sm font-medium text-red-500 mb-2">
            {searchParams.message}
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="submit"
            formAction={login}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Log in
          </button>
          <button
            type="submit"
            formAction={signup}
            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
