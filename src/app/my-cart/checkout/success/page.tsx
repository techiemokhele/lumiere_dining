"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <PaddingContainer
        size="small"
        className="flex flex-col items-center justify-center w-full lg:my-20 my-8 gap-8 min-h-[50vh]"
      >
        <CheckCircle size={64} className="text-green-400" />
        <h1 className="!font-bold xl:text-4xl lg:text-2xl text-2xl text-white-100 text-center">
          Payment Successful!
        </h1>
        <p className="font-normal xl:text-sm lg:text-xs text-xs text-white-60 text-center max-w-md">
          Thank you for your order. Your kitchen notes have been sent to our
          chefs. We look forward to serving you.
        </p>
        <Button asChild variant="default" size="lg" className="rounded-full">
          <Link href="/menu">Continue Browsing</Link>
        </Button>
      </PaddingContainer>
    </PageContainer>
  );
}
