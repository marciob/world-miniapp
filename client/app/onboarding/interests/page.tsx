// onboarding/interests/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Interest {
  id: string;
  name: string;
  icon: string;
}

const interests: Interest[] = [
  { id: "art", name: "Art & Design", icon: "🎨" },
  { id: "books", name: "Books", icon: "📚" },
  { id: "business", name: "Business", icon: "📊" },
  { id: "movies", name: "Movies", icon: "🍿" },
  { id: "food", name: "Food", icon: "🍱" },
  { id: "philosophy", name: "Philosophy", icon: "🤔" },
  { id: "science", name: "Science", icon: "⚛️" },
  { id: "spirituality", name: "Spirituality", icon: "🌌" },
  { id: "music", name: "Music", icon: "🎵" },
];

export default function InterestsSelection() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selectedInterests.length > 0) {
      localStorage.setItem(
        "selectedInterests",
        JSON.stringify(selectedInterests)
      );
      router.push("/onboarding/interests/sub-interests"); // Redirect to sub-interests page
    } else {
      alert("Please select at least one interest.");
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-4 flex flex-col items-center">
      {/* Back button */}
      <button
        className="self-start mb-2 text-gray-600 text-2xl"
        onClick={() => router.back()}
      >
        ←
      </button>

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-semibold leading-tight">
          Choose your interests
        </h1>
      </div>

      {/* Interests Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8 px-1">
        {interests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => toggleInterest(interest.id)}
            className={`
              w-full aspect-square rounded-full flex flex-col items-center justify-center
              transition-all duration-200 max-w-[180px] mx-auto
              ${
                selectedInterests.includes(interest.id)
                  ? "ring-4 ring-blue-500 bg-blue-50"
                  : "bg-gray-50 hover:bg-gray-100"
              }
            `}
          >
            <span className="text-4xl">{interest.icon}</span>
            <span className="text-[13px] leading-tight text-gray-600 text-center mt-1 px-1">
              {interest.name}
            </span>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="fixed bottom-6 left-0 right-0 px-4">
        <button
          onClick={handleNext}
          disabled={selectedInterests.length < 1}
          className={`
            w-full py-3 px-6 rounded-full text-white font-medium
            transition-all duration-200
            ${
              selectedInterests.length >= 1
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          Next
        </button>
      </div>
    </main>
  );
}
