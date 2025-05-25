"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?next=${pathname}`);
    }
  }, [isLoading, isAuthenticated, router]);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!isAuthenticated) {
    // Nie pokazuje nic zanim nie zadziała router.replace('/login)
    return null;
  }

  return children;
}
