"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { Button } from "@/components/ui/button";

export default function CheckoutFailurePage() {
  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <PaddingContainer
        size="small"
        className="flex flex-col items-center justify-center w-full lg:my-20 my-8 gap-8 min-h-[50vh]"
      >
        <XCircle size={64} className="text-crimson-500" />
        <h1 className="!font-bold xl:text-4xl lg:text-2xl text-2xl text-white-100 text-center">
          Payment Failed
        </h1>
        <p className="font-normal xl:text-sm lg:text-xs text-xs text-white-60 text-center max-w-md">
          Something went wrong with your payment. Your cart is still saved —
          please try again.
        </p>
        <Button asChild variant="default" size="lg" className="rounded-full">
          <Link href="/my-cart">Return to Cart</Link>
        </Button>
      </PaddingContainer>
    </PageContainer>
  );
}
