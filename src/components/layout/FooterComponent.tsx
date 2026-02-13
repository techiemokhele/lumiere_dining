"use client";

import { useState } from "react";
import {
  Facebook,
  Instagram,
  TwitterIcon,
  Youtube,
  LoaderCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { LogoComponent } from "../LogoComponent";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DirectionsModal } from "../DirectionsModal";
import Link from "next/link";

export function FooterComponent() {
  const { toast } = useToast();

  const [isDirectionsOpen, setIsDirectionsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const showCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      toast({
        title: "Subscribed Successfully!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });

      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      toast({
        title: "Subscription Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer className="flex flex-col gap-4 py-10 xl:px-8 lg:px-8 px-4 bg-secondary">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-16 lg:gap-y-8 gap-y-4">
          <div className="flex flex-col gap-4">
            <LogoComponent showText={true} isFooter={true} />
            <p className="font-serif font-normal xl:text-sm text-xs text-white">
              A culinary where flower meets art. Experience the finest dining in
              the heart of the city.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-1">
            <p className="font-serif font-bold xl:text-xl text-lg text-white">
              Visit Us
            </p>
            <p className="font-serif font-normal xl:text-sm text-xs text-white">
              19 Dock Road, <br />
              Cape Town, 8001, South Africa
            </p>
            <Button
              variant="link"
              className="flex items-start justify-start p-0"
              onClick={() => setIsDirectionsOpen(true)}
            >
              <span className="font-serif font-normal xl:text-sm text-xs text-burgundy">
                Get Directions
              </span>
            </Button>
          </div>

          <div className="flex flex-col gap-4 pt-1">
            <p className="font-serif font-bold xl:text-xl text-lg text-white">
              Opening Hours
            </p>
            <div className="flex flex-row justify-between items-center">
              <p className="font-serif font-normal xl:text-sm text-xs text-white">
                Mon - Thu:
              </p>
              <p className="font-serif font-normal xl:text-sm text-xs text-white">
                7am - 10pm
              </p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="font-serif font-normal xl:text-sm text-xs text-white">
                Fri - Sat:
              </p>
              <p className="font-serif font-normal xl:text-sm text-xs text-white">
                7am - 12am
              </p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="font-serif font-normal xl:text-sm text-xs text-white">
                Sunday:
              </p>
              <p className="font-serif font-normal xl:text-sm text-xs text-white">
                8am - 10pm
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-1">
            <p className="font-serif font-bold xl:text-xl text-lg text-white">
              Newsletter
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col lg:gap-4 gap-2 w-full"
            >
              <div className="flex flex-col gap-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className={`bg-burgundy-950 ${emailError ? "border-crimson-500" : ""}`}
                  disabled={isSubmitting}
                />
                {emailError ? (
                  <p className="text-crimson-500 text-xxs font-normal">
                    {emailError}
                  </p>
                ) : (
                  <div className="py-1.5 h-1" />
                )}
              </div>
              <Button
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
                className="bg-burgundy-700 hover:bg-burgundy-700/80 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div></div>

        <Separator orientation="horizontal" className="my-4" />

        <div className="flex flex-row justify-between items-center">
          <p className="font-serif font-normal text-xxs text-white-60">
            &copy; {showCurrentYear()} Lumière Dining. All rights reserved.
          </p>

          <div className="hidden md:flex flex-row items-center gap-4">
            {[
              { label: "Cancellation", href: "/legal/cancellation-policy" },
              { label: "Cookies", href: "/legal/cookie-policy" },
              { label: "Privacy", href: "/legal/privacy-policy" },
              { label: "Terms", href: "/legal/terms-of-service" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="font-serif font-normal text-xs text-white-60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-row gap-4">
            <TwitterIcon className="hover:text-primary lg:size-6 size-4 cursor-pointer" />
            <Instagram className="hover:text-primary lg:size-6 size-4 cursor-pointer" />
            <Facebook className="hover:text-primary lg:size-6 size-4 cursor-pointer" />
            <Youtube className="hover:text-primary lg:size-6 size-4 cursor-pointer" />
          </div>
        </div>
      </footer>

      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
      />
    </>
  );
}
