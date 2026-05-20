"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to ApplyHub
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Your all-in-one job application tracker
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            onClick={handleGetStarted}
            disabled={!mounted}
          >
            Get Started
          </Button>

          {!token && (
            <Button onClick={handleLogin}>
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}