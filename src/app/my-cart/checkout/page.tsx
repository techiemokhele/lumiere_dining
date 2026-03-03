"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Lock, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  detectCardType,
  formatCardNumber,
  formatExpiry,
  luhnCheck,
  validateExpiry,
} from "@/lib/utils";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CartOrderSummaryComponent } from "@/components/cart/CartOrderSummaryComponent";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { LoaderComponent } from "@/components/LoaderComponent";
import { CardIconComponent } from "@/components/CardIconComponent";

export default function CheckoutPage() {
  const { items, subtotal, tax, serviceCharge, total, discount, kitchenNotes } =
    useCart();
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState<boolean>(false);

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

    const rawCard = cardNumber.replace(/\D/g, "");

    const validLengths: Record<string, number[]> = {
      visa: [13, 16, 19],
      mastercard: [16],
      amex: [15],
      discover: [16, 19],
    };

    if (cardType === "unknown") {
      newErrors.cardNumber = "Unsupported card type";
    } else if (!validLengths[cardType]?.includes(rawCard.length)) {
      newErrors.cardNumber = "Invalid card length";
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
                      <CardIconComponent type={cardType} />
                    </div>
                  )}
                </div>
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

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-white-60">Accepted:</span>
                <div className="flex items-center gap-2">
                  <CardIconComponent type="visa" />
                  <CardIconComponent type="mastercard" />
                  <CardIconComponent type="amex" />
                  <CardIconComponent type="discover" />
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
