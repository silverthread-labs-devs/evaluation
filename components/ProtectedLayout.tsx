"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = authClient.useSession();

  // Wait a short time for the client session to initialize to avoid
  // redirecting too eagerly right after sign-in. If the session becomes
  // available during the debounce we cancel the redirect and render the
  // protected content.
  useEffect(() => {
    let handle: ReturnType<typeof setTimeout> | null = null;

    if (session) {
      // Session exists -> stop loading and render children
      setIsLoading(false);
      return;
    }

    // No session yet: give the auth client a short window to populate it
    handle = setTimeout(() => {
      // If still no session after debounce, redirect to sign-in
      if (!session) router.push("/auth/sign-in");
    }, 800);

    return () => {
      if (handle) clearTimeout(handle);
    };
  }, [session, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas-base">
        <div className="text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-border border-t-primary-solid animate-spin"></div>
          <p className="text-sm text-canvas-text">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
