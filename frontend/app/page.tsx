"use client";

import { useState } from "react";
import { FaHome, FaComments, FaBook, FaTrophy } from "react-icons/fa";
import MenuButton from "../components/menu/MenuButton"; // Updated import

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <main className="flex flex-col justify-between h-screen bg-white">
      {/* Main content area (currently blank) */}
      <div className="flex-grow"></div>

      {/* Bottom Navigation Menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 flex justify-around py-3">
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
