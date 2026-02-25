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

type CardType = "visa" | "mastercard" | "amex" | "discover" | "unknown";

function detectCardType(number: string): CardType {
  const raw = number.replace(/\s/g, "");
  if (/^4/.test(raw)) return "visa";
  if (/^5[1-5]/.test(raw) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/.test(raw))
    return "mastercard";
  if (/^3[47]/.test(raw)) return "amex";
  if (/^6(?:011|5\d{2})/.test(raw)) return "discover";
  return "unknown";
}

function luhnCheck(value: string): boolean {
  const digits = value.replace(/\s/g, "");
  if (!/^\d+$/.test(digits)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i]);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function validateExpiry(value: string): boolean {
  if (value.length !== 5) return false;
  const [mm, yy] = value.split("/");
  const month = parseInt(mm);
  const year = parseInt("20" + yy);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expDate = new Date(year, month - 1, 1);
  const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return expDate >= firstOfThisMonth;
}

function CardIcon({ type }: { type: CardType }) {
  if (type === "visa") {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-6 w-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <text
          x="6"
          y="22"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="14"
          fill="#FFFFFF"
          letterSpacing="1"
        >
          VISA
        </text>
      </svg>
    );
  }
  if (type === "mastercard") {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-6 w-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="32" rx="4" fill="#252525" />
        <circle cx="19" cy="16" r="9" fill="#EB001B" />
        <circle cx="29" cy="16" r="9" fill="#F79E1B" />
        <path
          d="M24 9.13a9 9 0 0 1 0 13.74A9 9 0 0 1 24 9.13z"
          fill="#FF5F00"
        />
      </svg>
    );
  }
  if (type === "amex") {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-6 w-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="32" rx="4" fill="#2E77BC" />
        <text
          x="5"
          y="22"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="9"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          AMERICAN
        </text>
        <text
          x="5"
          y="29"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="9"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          EXPRESS
        </text>
      </svg>
    );
  }
  if (type === "discover") {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-6 w-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="32" rx="4" fill="#F76F20" />
        <text
          x="5"
          y="22"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="9"
          fill="#FFFFFF"
        >
          DISCOVER
        </text>
        <circle cx="36" cy="16" r="8" fill="#FFCC00" opacity="0.9" />
      </svg>
    );
  }
  return null;
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

  const cardType = detectCardType(cardNumber);
  const cvvMaxLength = cardType === "amex" ? 4 : 3;

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

    const rawCard = cardNumber.replace(/\s/g, "");
    if (
      rawCard.length !== 16 &&
      !(cardType === "amex" && rawCard.length === 15)
    ) {
      newErrors.cardNumber = "Enter a valid card number";
    } else if (!luhnCheck(rawCard)) {
      newErrors.cardNumber = "Card number is invalid";
    }

    if (!validateExpiry(expiry))
      newErrors.expiry = "Enter a valid, non-expired expiry date";

    if (cvv.length < cvvMaxLength)
      newErrors.cvv = `CVV must be ${cvvMaxLength} digits`;

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
        <div className="flex flex-col w-full gap-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="lg"
            className="flex flex-row items-center gap-2 p-0 -mb-6 text-white-60 hover:text-white hover:bg-transparent transition-colors w-fit"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Go back</span>
          </Button>

          <div className="flex lg:flex-row flex-col-reverse lg:gap-0 gap-6 justify-between w-full">
            <div className="flex flex-col gap-2 lg:w-1/2 w-full items-start">
              <h1 className="font-extrabold text-3xl xl:text-5xl lg:text-4xl text-crimson-600">
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

              {/* Cardholder Name */}
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

              {/* Card Number with type icon */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white-60 uppercase font-semibold">
                  Card Number
                </label>
                <div className="relative">
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    className="bg-burgundy-900 border-burgundy-700 text-white font-mono pr-14"
                    maxLength={19}
                  />
                  {cardType !== "unknown" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CardIcon type={cardType} />
                    </div>
                  )}
                </div>
                {errors.cardNumber && (
                  <p className="text-crimson-500 text-xs">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry + CVV */}
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
                    CVV{" "}
                    {cardType === "amex" && (
                      <span className="text-white-40 normal-case">
                        (4 digits)
                      </span>
                    )}
                  </label>
                  <Input
                    placeholder={cardType === "amex" ? "1234" : "123"}
                    value={cvv}
                    onChange={(e) =>
                      setCvv(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, cvvMaxLength),
                      )
                    }
                    className="bg-burgundy-900 border-burgundy-700 text-white font-mono"
                    maxLength={cvvMaxLength}
                    type="password"
                  />
                  {errors.cvv && (
                    <p className="text-crimson-500 text-xs">{errors.cvv}</p>
                  )}
                </div>
              </div>

              {/* Accepted cards display */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-white-60">Accepted:</span>
                <div className="flex items-center gap-2">
                  <CardIcon type="visa" />
                  <CardIcon type="mastercard" />
                  <CardIcon type="amex" />
                  <CardIcon type="discover" />
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
