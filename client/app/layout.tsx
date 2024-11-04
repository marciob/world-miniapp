// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import ClientErudaProvider from "@/providers/ClientErudaProvider";
import NextAuthProvider from "@/components/next-auth-provider";
import ClientOnlyRedirect from "@/components/OnboardingRedirect/ClientOnlyRedirect";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import BottomNavigationMenu from "@/components/Menu/BottomNavigationMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("isLoggedIn") &&
      pathname !== "/login"
    ) {
      router.push("/login");
    }
  }, [pathname, router]);

  const hideMenu =
    pathname.startsWith("/login") || pathname.startsWith("/onboarding");

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <NextAuthProvider>
          <ClientOnlyRedirect>
            <ClientErudaProvider>
              <MiniKitProvider>
                {children}
                {!hideMenu && <BottomNavigationMenu />}
              </MiniKitProvider>
            </ClientErudaProvider>
          </ClientOnlyRedirect>
        </NextAuthProvider>
      </body>
    </html>
  );
}
