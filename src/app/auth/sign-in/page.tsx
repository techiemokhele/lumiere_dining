"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/lib/hooks/use-toast";
import {
  signInSchema,
  type SignInFormData,
} from "@/lib/validations/auth.schemas";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (
    values: SignInFormData,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Welcome Back!",
        description: "You have been signed in successfully.",
        variant: "default",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "Sign In Failed",
        description:
          error instanceof Error
            ? error.message
            : "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full lg:w-1/2 min-h-screen bg-burgundy-950">
        <div className="flex lg:hidden flex-row items-center justify-between p-6">
          <Link href="/" className="flex flex-col">
            <h2 className="font-extrabold text-2xl text-white">
              Lumière Dining
            </h2>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-8 lg:px-16">
          <div className="w-full max-w-md flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-extrabold text-2xl lg:text-3xl text-white">
                Welcome Back
              </h1>
              <p className="text-sm text-white-60">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-crimson-500 hover:text-crimson-600 font-semibold transition-colors"
                >
                  Create one
                </Link>
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                          placeholder="jane@example.com"
                          className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
                        />
                      </FormControl>
                      {form.formState.errors.email ? (
                        <p className="text-crimson-500 text-xxs font-normal mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      ) : (
                        <div className="h-2 py-1.5" />
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between">
                        <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                          Password
                        </FormLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="text-xxs text-crimson-500 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60 pr-10"
                          />
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white-60 hover:text-white transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      {form.formState.errors.password ? (
                        <p className="text-crimson-500 text-xxs font-normal mt-1">
                          {form.formState.errors.password.message}
                        </p>
                      ) : (
                        <div className="h-2 py-1.5" />
                      )}
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full flex flex-row gap-2 items-center justify-center rounded-full bg-crimson-600 hover:bg-crimson-500 disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin h-4 w-4" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={16} />
                      <span>Sign In</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="flex flex-row items-center gap-4">
              <div className="flex-1 h-px bg-burgundy-700" />
              <span className="text-xxs text-white-60 uppercase">
                Lumière Dining
              </span>
              <div className="flex-1 h-px bg-burgundy-700" />
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-xs text-white-60 hover:text-white transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/sign-in.jpg"
          alt="Lumière culinary experience"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-burgundy-950/80 via-burgundy-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-transparent to-burgundy-950/30" />

        <div className="absolute bottom-12 left-12 right-12 flex flex-col gap-4">
          <Link href="/" className="flex flex-col gap-1">
            <h2 className="font-extrabold text-4xl text-white">Lumière</h2>
            <p className="text-sm text-white-60">Fine Dining Experience</p>
          </Link>
          <p className="text-sm text-white-60 leading-relaxed max-w-md">
            Welcome back to your culinary sanctuary. Sign in to manage your
            reservations, explore seasonal menus, and access your personalised
            dining preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
