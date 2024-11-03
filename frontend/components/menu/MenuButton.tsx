"use client";

import { ReactNode } from "react";

interface MenuButtonProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function MenuButton({
  icon,
  label,
  isActive,
  onClick,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center transform active:scale-95 transition-transform duration-100 ${
        isActive ? "text-blue-500" : "text-gray-500"
      }`}
    >
      <div className="transform hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
}
