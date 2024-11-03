"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const phases = [
  {
    title: "Basics",
    description: "Start with the fundamentals and build a strong foundation.",
    image: "/placeholder-basics.jpg", // Placeholder images for now
    progress: 40, // example progress in percentage
  },
  {
    title: "Intermediate",
    description: "Move on to more advanced topics and challenges.",
    image: "/placeholder-intermediate.jpg",
    progress: 0,
  },
  {
    title: "Advanced",
    description: "Deep dive into complex concepts and applications.",
    image: "/placeholder-advanced.jpg",
    progress: 0,
  },
  {
    title: "Mastery",
    description: "Achieve mastery with real-life applications and projects.",
    image: "/placeholder-mastery.jpg",
    progress: 0,
  },
];

export default function LearningPath() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 p-6">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Learning Path
      </h1>

      <div className="flex flex-col space-y-6 w-full max-w-md">
        {phases.map((phase, index) => (
          <button
            key={index}
            onClick={() => router.push(`/learningPath/phase${index + 1}`)}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <Image
              src={phase.image}
              alt={phase.title}
              width={500}
              height={250}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {phase.title}
              </h2>
              <p className="text-gray-600 mt-1">{phase.description}</p>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${phase.progress}%` }}
                ></div>
              </div>
            </div>
            {phase.progress > 0 && (
              <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {phase.progress}%
              </span>
            )}
          </button>
        ))}
      </div>
    </main>
  );
}
