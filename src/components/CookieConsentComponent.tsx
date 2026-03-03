"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CookieConsentComponent() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem("lumiere-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lumiere-cookie-consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="bg-burgundy-900 border-t border-border backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5 flex flex-col items-start sm:items-center justify-between gap-4">
          <p className="font-normal text-xs text-white-60 leading-relaxed flex-1 pr-4">
            We use cookies and similar technologies to ensure our website runs
            smoothly and to enhance your experience. Some cookies are essential
            for core functionality, while others help us understand how you
            interact with our site. For full details, view our{" "}
            <Link
              href="/legal/cookie-policy"
              className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
            >
              Cookie Policy
            </Link>
            .
          </p>

          <div className="flex items-center justify-end w-full">
            <Button
              variant="default"
              size="sm"
              onClick={handleAccept}
              className="font-semibold text-xs rounded-full"
            >
              Accept Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
