// components/ClientLayout.tsx
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import BottomNavigationMenu from "./Menu/BottomNavigationMenu";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  // Define paths where the bottom menu should be hidden
  const hideMenu = pathname.startsWith("/onboarding");

  return (
    <>
      {children}
      {!hideMenu && <BottomNavigationMenu />}
    </>
  );
}
