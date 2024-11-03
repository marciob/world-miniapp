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
      {/* (The rest of the content) */}
    </main>
  );
}
