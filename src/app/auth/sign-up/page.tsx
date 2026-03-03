"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  UserPlus,
  Check,
  X as XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/lib/hooks/use-toast";
import {
  signUpSchema,
  type SignUpFormData,
} from "@/lib/validations/auth.schemas";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "Uppercase", met: /[A-Z]/.test(password) },
    { label: "Lowercase", met: /[a-z]/.test(password) },
    { label: "Number", met: /[0-9]/.test(password) },
    { label: "Special char", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = checks.filter((c) => c.met).length;

  return (
    <div className="flex flex-col gap-2 mt-1">
      <div className="flex flex-row gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i <= metCount
                ? metCount <= 2
                  ? "bg-red-500"
                  : metCount <= 3
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                : "bg-burgundy-700",
            )}
          />
        ))}
      </div>

      <div className="flex flex-row flex-wrap gap-x-3 gap-y-1">
        {checks.map((check) => (
          <div key={check.label} className="flex flex-row items-center gap-1">
            {check.met ? (
              <Check size={10} className="text-emerald-500" />
            ) : (
              <XIcon size={10} className="text-white-60" />
            )}
            <span
              className={cn(
                "text-[10px]",
                check.met ? "text-emerald-500" : "text-white-60",
              )}
            >
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const form = useForm<SignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false as unknown as true,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(signUpSchema),
  });

  const watchedPassword = form.watch("password");

  const onSubmit = async (
    values: SignUpFormData,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

      toast({
        title: "Account Created!",
        description: "Welcome to Lumière Dining. Redirecting to sign in...",
        variant: "default",
      });

      form.reset();

      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 1500);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/sign-up.jpg"
          alt="Fine dining ambiance"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-950/80 via-burgundy-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 via-transparent to-burgundy-950/30" />

        <div className="absolute bottom-12 left-12 right-12 flex flex-col gap-4">
          <Link href="/" className="flex flex-col gap-1">
            <h2 className="font-extrabold text-4xl text-white">
              Lumière Dining
            </h2>
            <p className="text-sm text-white-60">Fine Dining Experience</p>
          </Link>
          <p className="text-sm text-white-60 leading-relaxed max-w-md">
            Join our community and discover an extraordinary culinary journey.
            Reserve tables, explore our seasonal menus, and receive exclusive
            invitations to chef&apos;s table events.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/2 min-h-screen bg-burgundy-950">
        <div className="flex lg:hidden flex-row items-center justify-between p-6">
          <Link href="/" className="flex flex-col">
            <h2 className="font-extrabold text-2xl text-white">
              Lumière Dining
            </h2>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-8 lg:px-16">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="font-extrabold text-2xl lg:text-3xl text-white">
                Create Your Account
              </h1>
              <p className="text-sm text-white-60">
                Already have an account?{" "}
                <Link
                  href="/auth/sign-in"
                  className="text-crimson-500 hover:text-crimson-600 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-xs text-white-60 uppercase">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          autoComplete="name"
                          placeholder="e.g. Jane Doe"
                          className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
                        />
                      </FormControl>
                      {form.formState.errors.name ? (
                        <p className="text-crimson-500 text-xxs font-normal mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      ) : (
                        <div className="h-2 py-1.5" />
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-xs text-white-60 uppercase">
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-xs text-white-60 uppercase">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          autoComplete="tel"
                          placeholder="+27 64 847 3363"
                          className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
                        />
                      </FormControl>
                      {form.formState.errors.phone ? (
                        <p className="text-crimson-500 text-xxs font-normal mt-1">
                          {form.formState.errors.phone.message}
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
                      <FormLabel className="font-normal text-xs text-white-60 uppercase">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Create a strong password"
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
                      {watchedPassword && (
                        <PasswordStrength password={watchedPassword} />
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-xs text-white-60 uppercase">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Repeat your password"
                            className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60 pr-10"
                          />
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white-60 hover:text-white transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      {form.formState.errors.confirmPassword ? (
                        <p className="text-crimson-500 text-xxs font-normal mt-1">
                          {form.formState.errors.confirmPassword.message}
                        </p>
                      ) : (
                        <div className="h-2 py-1.5" />
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptedTerms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-burgundy-700 data-[state=checked]:bg-crimson-600 data-[state=checked]:border-crimson-600"
                          />
                        </FormControl>
                        <p className="text-xs text-white-60 leading-relaxed">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-crimson-500 hover:underline"
                          >
                            Terms &amp; Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-crimson-500 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </p>
                      </div>
                      {form.formState.errors.acceptedTerms ? (
                        <p className="text-crimson-500 text-xxs font-normal mt-1">
                          {form.formState.errors.acceptedTerms.message}
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
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      <span>Create Account</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
