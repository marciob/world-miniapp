// components/OnboardingRedirect/ClientOnlyRedirect.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientOnlyRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Only redirect after the component has mounted on the client
    if (isMounted && !localStorage.getItem("onboardingComplete")) {
      router.push("/onboarding/language");
    }
  }, [router, isMounted]);

  // Avoid rendering children until component is mounted to prevent hydration mismatch
  if (!isMounted) return null;

  return <>{children}</>;
}
