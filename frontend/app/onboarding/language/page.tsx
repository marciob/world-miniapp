"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { languages } from "../../mockdata/languages";
import { FaChevronDown } from "react-icons/fa";

function CustomDropdown({ label, options, selected, setSelected }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full mb-6">
      <span className="text-lg font-medium text-gray-800">{label}</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 w-full p-4 rounded-lg border border-gray-300 bg-white shadow-sm text-gray-800 flex items-center justify-between cursor-pointer focus:outline-none transition-all"
      >
        {selected || `Select ${label.toLowerCase()}`}
        <FaChevronDown
          className={`ml-2 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-1 max-h-60 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {options.map((option: string) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="p-3 hover:bg-blue-100 text-gray-800 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LanguageSelection() {
  const router = useRouter();
  const [nativeLanguage, setNativeLanguage] = useState("English"); // Set default to "English"
  const [targetLanguage, setTargetLanguage] = useState("Spanish"); // Set default to "Spanish"

  const handleNext = () => {
    if (nativeLanguage && targetLanguage) {
      localStorage.setItem("nativeLanguage", nativeLanguage);
      localStorage.setItem("targetLanguage", targetLanguage);
      router.push("/onboarding/interests");
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 p-6">
      {/* Title at the top */}
      <h1 className="text-3xl font-semibold mt-10 mb-10 text-center text-white">
        Choose Your Languages
      </h1>

      {/* Centered form container */}
      <div className="flex-grow flex items-center w-full max-w-md">
        <div className="w-full bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg">
          <CustomDropdown
            label="I speak"
            options={languages}
            selected={nativeLanguage}
            setSelected={setNativeLanguage}
          />

          <CustomDropdown
            label="I want to learn"
            options={languages}
            selected={targetLanguage}
            setSelected={setTargetLanguage}
          />
        </div>
      </div>

      {/* Fixed "Next" button at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900 to-transparent flex justify-center">
        <button
          onClick={handleNext}
          className="w-full max-w-md bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
        >
          Next
        </button>
      </div>
    </main>
  );
}
