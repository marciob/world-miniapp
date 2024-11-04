// onboarding/interests/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InterestsSelection() {
  const router = useRouter();
  const [interests, setInterests] = useState<string[]>([]);
  const [purpose, setPurpose] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleFinish = () => {
    localStorage.setItem("interests", JSON.stringify(interests));
    localStorage.setItem("purpose", purpose || "");
    localStorage.setItem("onboardingComplete", "true");
    router.push("/"); // Redirect to the main page
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 p-6 overflow-hidden">
      {/* Title at the top */}
      <h1 className="text-3xl font-semibold mt-10 mb-10 text-center text-white">
        Select Your Interests
      </h1>

      {/* Interests selection area */}
      <div className="flex flex-col items-center w-full max-w-md bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg mb-10">
        <div className="grid grid-cols-2 gap-4 w-full">
          {[
            { name: "Science", image: "/interests/science.webp" },
            { name: "Technology", image: "/interests/tech.webp" },
            { name: "Philosophy", image: "/interests/philosophy.webp" },
            { name: "Art", image: "/interests/art.webp" },
          ].map((interest) => (
            <button
              key={interest.name}
              onClick={() => toggleInterest(interest.name)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-colors ${
                interests.includes(interest.name)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
              style={{ width: "100%", height: "100px" }}
            >
              <img
                src={interest.image}
                alt={interest.name}
                className="w-16 h-16 object-contain mb-1"
              />
              <span className="font-medium text-center">{interest.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Purpose of Learning title */}
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">
        Purpose of Learning
      </h2>

      {/* Purpose selection area */}
      <div className="flex flex-col items-center w-full max-w-md bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg mb-10">
        <div className="grid grid-cols-2 gap-4 w-full">
          {[
            { name: "Career", image: "/purpose/career.webp" },
            { name: "Travel", image: "/purpose/travel.webp" },
            { name: "Business", image: "/purpose/hands.webp" },
            { name: "Personal Growth", image: "/purpose/personal.webp" },
          ].map((p) => (
            <button
              key={p.name}
              onClick={() => setPurpose(p.name)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-colors ${
                purpose === p.name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
              style={{ width: "100%", height: "100px" }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 object-contain mb-1"
              />
              <span
                className={`font-medium text-center ${
                  p.name === "Personal Growth" ? "text-sm" : ""
                }`}
              >
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fixed "Finish" button at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900 to-transparent flex justify-center">
        <button
          onClick={handleFinish}
          className="w-full max-w-md bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
        >
          Finish
        </button>
      </div>
    </main>
  );
}
