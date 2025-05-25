"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { logoutOnServer } from "@/lib/auth/logoutOnServer";
import { useRouter } from "next/navigation";
import { ThemeToggleButton } from "../ThemeToggleButton";
import { Loader2 } from "lucide-react";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Waitlist",
    href: "/waitlist",
  },
];

export function AppNavbar() {
  const { isAuthenticated, logout, isLoading } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logoutOnServer();
    if (response) {
      logout();
      router.replace("/login");
    }
  };

  return (
    <header className="flex ml-auto justify-end py-4 px-12 border-b bg-background gap-2">
      <nav className="flex gap-4">
        {navLinks.map((link, index) => (
          <Link href={link.href} key={index}>
            <Button variant="ghost">{link.label}</Button>
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : isAuthenticated ? (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="default">Signup</Button>
            </Link>
          </>
        )}
      </div>

      <div>
        <ThemeToggleButton />
      </div>
    </header>
  );
}
