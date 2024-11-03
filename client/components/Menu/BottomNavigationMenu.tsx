// components/Menu/BottomNavigationMenu.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaComments, FaBook, FaTrophy } from "react-icons/fa";
import MenuButton from "./MenuButton";

export default function BottomNavigationMenu() {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();

  const handleNavigation = (tab, path) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around py-3 shadow-lg">
      <MenuButton
        icon={<FaHome size={24} />}
        label="Home"
        isActive={activeTab === "home"}
        onClick={() => handleNavigation("home", "/")}
      />
      <MenuButton
        icon={<FaComments size={24} />}
        label="Chat"
        isActive={activeTab === "chat"}
        onClick={() => handleNavigation("chat", "/chat")}
      />
      <MenuButton
        icon={<FaBook size={24} />}
        label="Lessons"
        isActive={activeTab === "lessons"}
        onClick={() => handleNavigation("lessons", "/lessons")}
      />
      <MenuButton
        icon={<FaTrophy size={24} />}
        label="Ranking"
        isActive={activeTab === "ranking"}
        onClick={() => handleNavigation("ranking", "/ranking")}
      />
    </nav>
  );
}
