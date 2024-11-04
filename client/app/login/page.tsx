"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/onboarding/language"); // Redirect to the next page
  };

  return (
    <main className="relative flex flex-col h-screen bg-gray-800 text-white">
      {/* Top Section */}
      <section className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Welcome to the App</h1>
      </section>

      {/* Bottom Section */}
      <section className="absolute bottom-0 w-full h-1/3 bg-white rounded-t-3xl p-6 flex flex-col items-center justify-center text-gray-900">
        <p className="text-center text-lg mb-4">Start your journey today!</p>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </section>
    </main>
  );
}
