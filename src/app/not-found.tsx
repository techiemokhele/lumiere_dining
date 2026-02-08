"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <PageContainer showNavigation={false} showFooter={false} className="!p-0">
      <div className="flex flex-col w-full min-h-screen bg-white=100 items-center justify-center p-8">
        <div className="flex flex-col items-center text-center gap-8 relative">
          <h1 className="font-extrabold lg:!text-6xl text-4xl text-white-100">
            OOPS !
          </h1>

          <div className="relative flex items-center justify-center lg:gap-8 gap-4 my-8">
            <div className="absolute -top-16 -left-16 opacity-50 animate-pulse">
              <div className="w-20 h-20 bg-crimson-500/20 rounded-full" />
            </div>
            <div className="absolute top-0 -right-20 opacity-50 animate-pulse delay-100">
              <div className="w-16 h-16 bg-crimson-500/20 rounded-full" />
            </div>
            <div className="absolute -bottom-12 left-8 opacity-50 animate-pulse delay-200">
              <div className="w-24 h-24 bg-crimson-500/20 rounded-full" />
            </div>
            <div className="absolute bottom-4 -right-12 opacity-50 animate-pulse delay-300">
              <div className="w-20 h-20 bg-crimson-500/20 rounded-full" />
            </div>

            <span className="lg:!text-6xl text-[100px] text-white-100 leading-none">
              4
            </span>
            <div className="relative">
              <span className="lg:!text-6xl text-[100px] text-white-100 leading-none">
                0
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="lg:w-32 w-16 lg:h-32 h-16 bg-gradient-to-br from-crimson-600 to-crimson-700 rounded-full flex items-center justify-center shadow-xl transform rotate-12">
                  <span className="text-white font-bold lg:text-4xl text-2xl">
                    L
                  </span>
                </div>
              </div>
            </div>
            <span className="lg:!text-6xl text-[100px] text-white-100 leading-none">
              4
            </span>
          </div>

          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="font-bold lg:text-3xl text-2xl text-white-100">
              Page Not Found
            </h2>
            <p className="font-sans text-burgundy-700 lg:text-base text-sm">
              The page you looking for is already taken down or doesn&apos;t
              exist. Have a meal with us while we take you to the home page.
            </p>
          </div>

          <Button
            asChild
            variant="default"
            size="lg"
            className="mt-4 bg-crimson-600 hover:bg-crimson-500"
          >
            <Link href="/" className="flex flex-row gap-2 items-center">
              <span>Return to Homepage</span>
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
