"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/hooks/use-toast";
import { LogoComponent } from "@/components/LogoComponent";

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setIsSent(true);

      toast({
        title: "Check your email",
        description:
          "If an account exists, a password reset link has been sent.",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset link.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-burgundy-950 px-6">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/">
            <LogoComponent showText={true} />
          </Link>

          <h1 className="font-extrabold text-2xl text-white mt-4">
            Forgot Your Password?
          </h1>

          <p className="text-sm text-white-60">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
        </div>

        {isSent ? (
          <div className="flex flex-col gap-4">
            <div className="bg-burgundy-900 border border-burgundy-700 rounded-lg p-4 text-sm text-white-80">
              If an account exists with{" "}
              <span className="font-semibold">{email}</span>, a password reset
              link has been sent. Please check your inbox.
            </div>

            <Button asChild className="bg-crimson-600 hover:bg-crimson-500">
              <Link href="/auth/sign-in">Back to Sign In</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="font-normal text-xs text-white-60 uppercase">
                Email Address
              </label>

              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
              />
            </div>

            {error && <p className="text-crimson-500 text-xs">{error}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-crimson-600 hover:bg-crimson-500 gap-2"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin h-4 w-4" />
              ) : (
                <Mail size={16} />
              )}
              <span>Send Reset Link</span>
            </Button>

            <div className="text-center mt-2">
              <Link
                href="/auth/sign-in"
                className="text-xs text-white-60 hover:text-white transition-colors"
              >
                ← Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
