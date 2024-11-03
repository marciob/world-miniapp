"use client";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("onboardingComplete")) {
      router.push("/onboarding/language");
    }
  }, [router]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
