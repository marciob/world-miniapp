"use client";

import { useState } from "react";
import { FaHome, FaComments, FaBook, FaTrophy, FaCoins } from "react-icons/fa";
import MenuButton from "../components/Menu/MenuButton";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  // Sample data for demo purposes
  const coinBalance = 150;
  const wordOfTheDay = "Perseverance";
  const wordMeaning =
    "Persistence in doing something despite difficulty or delay in achieving success.";

  return (
    <main className="flex flex-col justify-between h-screen bg-gray-100">
      {/* Header Section */}
      <header className="flex items-center justify-between bg-blue-500 text-white p-4">
        <div className="flex items-center space-x-2">
          <FaCoins size={20} />
          <span className="text-lg font-semibold">{coinBalance} Coins</span>
        </div>
        <h1 className="text-xl font-bold">Daily Learning</h1>
      </header>

      {/* Content Area */}
      <div className="flex-grow p-4 space-y-6">
        {/* Daily Rewards Section */}
        <section className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center space-y-2">
          <h2 className="text-lg font-bold text-blue-600">Daily Rewards</h2>
          <p className="text-gray-600">
            Earn coins by completing a minute of study each day!
          </p>
          <button className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded-full shadow-md transition transform hover:scale-105">
            Claim Reward
          </button>
        </section>

        {/* Word of the Day Section */}
        <section className="bg-blue-100 rounded-lg shadow p-4 text-center">
          <h2 className="text-lg font-bold text-blue-600">Word of the Day</h2>
          <p className="text-2xl font-semibold text-gray-800 mt-2">
            {wordOfTheDay}
          </p>
          <p className="text-gray-600 mt-1 italic">"{wordMeaning}"</p>
        </section>
      </div>


      {/* Bottom Navigation Menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around py-3 shadow-lg">
        <MenuButton
          icon={<FaHome size={24} />}
          label="Home"
          isActive={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />
        <MenuButton
          icon={<FaComments size={24} />}
          label="Chat"
          isActive={activeTab === "chat"}
          onClick={() => setActiveTab("chat")}
        />
        <MenuButton
          icon={<FaBook size={24} />}
          label="Lessons"
          isActive={activeTab === "lessons"}
          onClick={() => setActiveTab("lessons")}
        />
        <MenuButton
          icon={<FaTrophy size={24} />}
          label="Ranking"
          isActive={activeTab === "ranking"}
          onClick={() => setActiveTab("ranking")}
        />
      </nav>
    </main>
  );
}
