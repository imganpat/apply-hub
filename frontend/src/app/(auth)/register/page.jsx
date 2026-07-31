"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, Mail, Lock, User } from "lucide-react";
import { registerUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
      });

      router.replace("/login");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-primary-foreground" />
          </div>

          <span className="text-2xl font-semibold">
            ApplyHub
          </span>
        </Link>

        {/* Card */}

        <div className="bg-card rounded-xl border shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              Create an account
            </h1>

            <p className="text-muted-foreground mt-2">
              Start tracking your job applications today
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}

            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="pl-10"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* <p className="mt-8 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our Terms of Service and
          Privacy Policy.
        </p> */}
      </div>
    </div>
  );
}
