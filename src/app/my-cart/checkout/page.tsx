"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Lock, Loader2 } from "lucide-react";
import { CartOrderSummaryComponent } from "@/components/cart/CartOrderSummaryComponent";
import { useCart } from "@/context/CartContext";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { LoaderComponent } from "@/components/LoaderComponent";

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function CheckoutPage() {
  const { items, subtotal, tax, serviceCharge, total, discount, kitchenNotes } =
    useCart();
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/my-cart");
    }
  }, [hydrated, items.length, router]);

  if (!hydrated) {
    return (
      <PageContainer showNavigation={true} showFooter={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoaderComponent />
        </div>
      </PageContainer>
    );
  }

  if (items.length === 0) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (cardName.trim().length < 2)
      newErrors.cardName = "Enter cardholder name";
    if (cardNumber.replace(/\s/g, "").length !== 16)
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    if (expiry.length !== 5) newErrors.expiry = "Enter a valid expiry date";
    if (cvv.length < 3) newErrors.cvv = "Enter a valid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setProcessing(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
          kitchenNotes,
          discount,
          tax,
          serviceCharge,
          subtotal,
          total,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout failed");

      router.push("/my-cart/checkout/success");
    } catch (error) {
      console.error("Checkout error:", error);
      setProcessing(false);
    }
  };

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <PaddingContainer
        size="small"
        className="flex flex-col w-full lg:my-20 my-8 gap-10"
      >
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="lg"
          className="rounded-full w-fit p-0 -mb-6 hover:bg-transparent"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span>Go back</span>
        </Button>

        <div className="flex flex-col w-full gap-6">
          <div className="flex lg:flex-row flex-col-reverse lg:gap-0 gap-6 justify-between w-full">
            <div className="flex flex-col lg:w-1/2 w-full items-start">
              <h1 className="!font-bold xl:text-4xl lg:text-2xl text-2xl text-white-100">
                Complete Your Order
              </h1>
              <p className="font-normal xl:text-sm lg:text-xs text-xxs text-white-60">
                Enter your payment details to finalise your reservation.
              </p>
            </div>
            <div className="flex flex-col lg:w-1/2 w-full items-end justify-end">
              <Field className="w-full xl:max-w-sm lg:max-w-xs max-w-[150px]">
                <FieldLabel htmlFor="progress-upload">
                  <span className="lg:text-sm text-xs">Step 2 of 3</span>
                  <span className="ml-auto lg:text-sm text-xs">66%</span>
                </FieldLabel>
                <Progress value={66.6} id="progress-upload" />
              </Field>
            </div>
          </div>
          <Separator />
        </div>

        <div className="flex lg:flex-row flex-col w-full lg:gap-16 gap-8">
          <div className="flex flex-col lg:w-2/3 w-full gap-6">
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-burgundy-800 border border-burgundy-700">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard size={20} className="text-crimson-500" />
                <h2 className="font-bold text-lg text-white">Card Details</h2>
                <div className="ml-auto flex items-center gap-1 text-white-60 text-xs">
                  <Lock size={12} />
                  <span>Secured</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-white-60 uppercase font-semibold">
                  Cardholder Name
                </label>
                <Input
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="bg-burgundy-900 border-burgundy-700 text-white"
                />
                {errors.cardName && (
                  <p className="text-crimson-500 text-xs">{errors.cardName}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-white-60 uppercase font-semibold">
                  Card Number
                </label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  className="bg-burgundy-900 border-burgundy-700 text-white font-mono"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-crimson-500 text-xs">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs text-white-60 uppercase font-semibold">
                    Expiry Date
                  </label>
                  <Input
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="bg-burgundy-900 border-burgundy-700 text-white font-mono"
                    maxLength={5}
                  />
                  {errors.expiry && (
                    <p className="text-crimson-500 text-xs">{errors.expiry}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs text-white-60 uppercase font-semibold">
                    CVV
                  </label>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    className="bg-burgundy-900 border-burgundy-700 text-white font-mono"
                    maxLength={4}
                    type="password"
                  />
                  {errors.cvv && (
                    <p className="text-crimson-500 text-xs">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full bg-crimson-600 hover:bg-crimson-500 rounded-full py-6 mt-2"
              >
                {processing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <span>Pay R{total.toFixed(2)}</span>
                )}
              </Button>

              <p className="text-center text-xs text-white-60">
                This is a simulated payment for demonstration purposes.
              </p>
            </div>
          </div>

          <div className="flex lg:w-1/3 w-full">
            <CartOrderSummaryComponent
              subtotal={subtotal}
              tax={tax}
              serviceCharge={serviceCharge}
              total={total}
              hideCheckoutButton
            />
          </div>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
