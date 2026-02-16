"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/hooks/use-toast";
import { LogoComponent } from "@/components/LogoComponent";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast({
        title: "Password Reset!",
        description:
          "Your password has been updated. Redirecting to sign in...",
      });

      setTimeout(() => router.push("/auth/sign-in"), 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to reset password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="text-lg text-white">Invalid Reset Link</p>
        <p className="text-sm text-white-60">
          This password reset link is invalid or has expired.
        </p>
        <Button asChild className="bg-crimson-600 hover:bg-crimson-500">
          <Link href="/auth/sign-in">Back to Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="font-sans font-normal text-xs text-white-60 uppercase">
          New Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white-60 hover:text-white"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-sans font-normal text-xs text-white-60 uppercase">
          Confirm New Password
        </label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
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
          <KeyRound size={16} />
        )}
        <span>Reset Password</span>
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-burgundy-950 px-6">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/">
            <LogoComponent showText={true} />
          </Link>
          <h1 className="font-extrabold text-2xl text-white mt-4">
            Reset Your Password
          </h1>
          <p className="text-sm text-white-60">
            Enter your new password below.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-10">
              <LoaderCircle className="animate-spin h-8 w-8 text-crimson-500" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
