"use client";

import Link from "next/link";
import { CreditCard, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentMethodPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold text-2xl lg:text-3xl text-white">
          Payment Method
        </h1>
        <p className="text-sm text-white-60">
          Manage your payment preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 p-6 rounded-2xl bg-burgundy-800">
        <div className="flex flex-row items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-burgundy-700 flex items-center justify-center">
            <CreditCard size={28} className="text-crimson-500" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg text-white">Yoco Payments</p>
            <p className="text-xs text-white-60">
              Secure payment processing for South African businesses.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4 rounded-xl bg-burgundy-900/60 border border-burgundy-700">
          <p className="text-xs text-white-60 leading-relaxed">
            Lumière Dining uses Yoco for all card payments. Your payment details
            are handled securely by Yoco and are never stored on our servers.
            Cards are processed at checkout through Yoco&apos;s PCI-compliant
            payment gateway.
          </p>
          <p className="text-xs text-white-60 leading-relaxed">
            Accepted: Visa, Mastercard, American Express.
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          className="border-burgundy-700 text-white hover:bg-burgundy-700 self-start gap-2"
        >
          <Link href="https://www.yoco.com" target="_blank">
            <span>Learn More About Yoco</span>
            <ExternalLink size={14} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
