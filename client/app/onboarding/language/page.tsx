"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Korean",
  "Chinese",
  "Arabic",
  "Hindi",
];

const languageEmojis: { [key: string]: string } = {
  English: "🇬🇧",
  Spanish: "🇪🇸",
  French: "🇫🇷",
  German: "🇩🇪",
  Italian: "🇮🇹",
  Portuguese: "🇵🇹",
  Russian: "🇷🇺",
  Japanese: "🇯🇵",
  Korean: "🇰🇷",
  Chinese: "🇨🇳",
  Arabic: "🇸🇦",
  Hindi: "🇮🇳",
};

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  label,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{label}</h2>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full p-4 rounded-xl border text-left flex items-center justify-between
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white cursor-pointer hover:bg-gray-50"
            }
            ${isOpen ? "ring-2 ring-black" : "border-gray-200"}
            transition-all duration-200
          `}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {value ? languageEmojis[value] : ""}
            </span>
            <span className="text-gray-800">{value || "Select language"}</span>
          </div>
          <span
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`
                  w-full p-4 text-left flex items-center gap-2 hover:bg-gray-50
                  ${value === option ? "bg-gray-50" : ""}
                `}
              >
                <span className="text-xl">{languageEmojis[option]}</span>
                <span className="text-gray-800">{option}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function LanguageSelection() {
  const router = useRouter();
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

  const handleNext = () => {
    if (nativeLanguage && targetLanguage) {
      localStorage.setItem("nativeLanguage", nativeLanguage);
      localStorage.setItem("targetLanguage", targetLanguage);
      router.push("/onboarding/interests");
    }
  };

  const filteredLanguages = languages.filter((lang) => lang !== nativeLanguage);

  return (
    <div className="min-h-screen bg-white px-4 py-4">
      {/* Back button */}
      <button
        className="mb-2 text-gray-600 text-2xl"
        onClick={() => router.back()}
      >
        ←
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold leading-tight">
          Choose your
          <br />
          <span className="font-bold">languages</span>
        </h1>
      </div>

      {/* Dropdowns Container */}
      <div className="mb-8">
        <Dropdown
          label="I speak"
          value={nativeLanguage}
          onChange={setNativeLanguage}
          options={languages}
        />

        <Dropdown
          label="I want to learn"
          value={targetLanguage}
          onChange={setTargetLanguage}
          options={filteredLanguages}
          disabled={!nativeLanguage}
        />
      </div>

      {/* Next Button */}
      <div className="fixed bottom-6 left-0 right-0 px-4">
        <button
          onClick={handleNext}
          disabled={!nativeLanguage || !targetLanguage}
          className={`
            w-full py-3 px-6 rounded-full text-white font-medium
            transition-all duration-200
            ${
              nativeLanguage && targetLanguage
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}
