import Image from "next/image";
import { getServerSession } from "next-auth";
import { LoginButton, LogoutButton } from "./auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-300 p-4">
      <div className="bg-green-300 rounded-lg shadow-xl p-8 text-center">
        <div className="flex justify-center space-x-4 mb-6">
          <Link href="/signin" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out">
            <LoginButton />
          </Link>
          <div className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out">
            <LogoutButton />
          </div>
          <Link href="/securePage">
            <button className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
              Secure Page
            </button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Itax Assignment by Ana Fariya
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          User Details
        </h2>
        <pre className="text-left bg-white text-gray-800 text-sm p-4 rounded shadow">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
