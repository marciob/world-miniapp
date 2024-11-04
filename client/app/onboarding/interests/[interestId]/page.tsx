"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Interest {
  id: string;
  name: string;
  icon: string;
}

interface SubInterestSection {
  interestId: string;
  subInterests: string[];
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

export default function SubInterestsSelection() {
  const router = useRouter();
  const [sections, setSections] = useState<SubInterestSection[]>([]);
  const [currentInputs, setCurrentInputs] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const selectedInterests = JSON.parse(
      localStorage.getItem("selectedInterests") || "[]"
    );
    setSections(
      selectedInterests.map((id: string) => ({
        interestId: id,
        subInterests: [],
      }))
    );

    const inputs: { [key: string]: string } = {};
    selectedInterests.forEach((id: string) => {
      inputs[id] = "";
    });
    setCurrentInputs(inputs);
  }, []);

  const addSubInterest = (interestId: string) => {
    if (currentInputs[interestId]?.trim()) {
      setSections((prev) =>
        prev.map((section) => {
          if (section.interestId === interestId) {
            return {
              ...section,
              subInterests: [
                ...section.subInterests,
                currentInputs[interestId].trim(),
              ],
            };
          }
          return section;
        })
      );
      setCurrentInputs((prev) => ({
        ...prev,
        [interestId]: "",
      }));
    }
  };

  const removeSubInterest = (interestId: string, subInterest: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.interestId === interestId) {
          return {
            ...section,
            subInterests: section.subInterests.filter(
              (si) => si !== subInterest
            ),
          };
        }
        return section;
      })
    );
  };

  const handleFinish = () => {
    // Store all sub-interests in localStorage
    sections.forEach((section) => {
      localStorage.setItem(
        `subInterests_${section.interestId}`,
        JSON.stringify(section.subInterests)
      );
    });
    // Navigate to the main page after completion
    router.push("/"); // Redirect to the main home page
  };

  const getInterestName = (id: string) => {
    return interests.find((interest) => interest.id === id)?.name || id;
  };

  const getInterestIcon = (id: string) => {
    return interests.find((interest) => interest.id === id)?.icon || "📌";
  };

  return (
    <main className="min-h-screen bg-white px-4 py-4">
      <button
        className="mb-2 text-gray-600 text-2xl"
        onClick={() => router.back()}
      >
        ←
      </button>

      <div className="mb-6">
        <h1 className="text-4xl font-semibold leading-tight">
          Add topics to
          <br />
          <span className="font-bold">your interests</span>
          <br />
          <span className="text-base font-normal text-gray-500">
            (optional)
          </span>
        </h1>
      </div>

      <div className="space-y-8 mb-24">
        {sections.map((section) => (
          <div key={section.interestId} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                {getInterestIcon(section.interestId)}
              </span>
              <h2 className="text-xl font-semibold">
                {getInterestName(section.interestId)}
              </h2>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={currentInputs[section.interestId]}
                onChange={(e) =>
                  setCurrentInputs((prev) => ({
                    ...prev,
                    [section.interestId]: e.target.value,
                  }))
                }
                placeholder={`Add topics for ${getInterestName(
                  section.interestId
                )}...`}
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addSubInterest(section.interestId);
                  }
                }}
              />
              <button
                onClick={() => addSubInterest(section.interestId)}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {section.subInterests.map((subInterest) => (
                <span
                  key={subInterest}
                  onClick={() =>
                    removeSubInterest(section.interestId, subInterest)
                  }
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                >
                  #{subInterest}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 left-0 right-0 px-4">
        <button
          onClick={handleFinish}
          className="w-full py-3 px-6 rounded-full text-white font-medium bg-black hover:bg-gray-800 transition-all duration-200"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
