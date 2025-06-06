"use client";
import { Suspense } from "react";

import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Suspense fallback={<div>Ładowanie...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
