"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, X, LogIn } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useCart } from "@/context/CartContext";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
  hideCheckoutButton?: boolean;
}

const promoCodeFormSchema = z.object({
  code: z.string().min(1, "Promo code is required."),
});

type PromoCodeFormValues = z.infer<typeof promoCodeFormSchema>;

export function CartOrderSummaryComponent({
  subtotal,
  tax,
  serviceCharge,
  total,
  hideCheckoutButton = false,
}: CartSummaryProps) {
  const { status } = useSession();
  const { promoApplied, applyPromo, removePromo, discount } = useCart();
  const [promoError, setPromoError] = useState<string | null>(null);

  const form = useForm<PromoCodeFormValues>({
    defaultValues: { code: "" },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(promoCodeFormSchema),
  });

  const onSubmit = async (values: PromoCodeFormValues) => {
    setPromoError(null);
    const success = applyPromo(values.code);
    if (!success) {
      setPromoError("Invalid promo code.");
    }
    form.reset();
  };

  const handleCheckout = () => {
    window.location.href = "/my-cart/checkout";
  };

  const isAuthenticated = status === "authenticated";

  return (
    <div className="flex lg:flex-col flex-col-reverse gap-6 w-full relative lg:sticky lg:top-32 lg:self-start">
      <div className="flex flex-col p-6 w-full gap-6 rounded-3xl border border-burgundy-700 bg-burgundy-800">
        <h1 className="!font-bold text-3xl text-white-100">Order Summary</h1>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold lg:text-sm text-xs text-white-60">
              Subtotal
            </p>
            <p className="font-semibold lg:text-sm text-xs text-white-100">
              R{subtotal.toFixed(2)}
            </p>
          </div>

          {promoApplied && (
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="font-semibold lg:text-sm text-xs text-green-400">
                  Promo Discount (25%)
                </p>
                <button
                  onClick={removePromo}
                  className="text-white-60 hover:text-crimson-500"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="font-semibold lg:text-sm text-xs text-green-400">
                -R{discount.toFixed(2)}
              </p>
            </div>
          )}

          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold lg:text-sm text-xs text-white-60">
              Taxes(8%)
            </p>
            <p className="font-semibold lg:text-sm text-xs text-white-100">
              R{tax.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold lg:text-sm text-xs text-white-60">
              Service Charge(15%)
            </p>
            <p className="font-semibold lg:text-sm text-xs text-white-100">
              R{serviceCharge.toFixed(2)}
            </p>
          </div>
          <Separator />
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold lg:text-sm text-xs text-white-100">
              Total
            </p>
            <div className="flex flex-col gap-2">
              <p className="!font-extrabold text-2xl text-crimson-500">
                R{total.toFixed(2)}
              </p>
              <p className="font-semibold text-xxs text-white-60 flex self-end">
                including all fees
              </p>
            </div>
          </div>
        </div>

        {!hideCheckoutButton &&
          (isAuthenticated ? (
            <Button
              variant="default"
              size="lg"
              className="rounded-full"
              onClick={handleCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button
              asChild
              variant="default"
              size="lg"
              className="rounded-full bg-crimson-600 hover:bg-crimson-500"
            >
              <Link href="/auth/sign-in" className="gap-2">
                <LogIn size={16} />
                <span>Sign In to Checkout</span>
              </Link>
            </Button>
          ))}

        <p className="font-normal text-xxs text-white-60 flex flex-col self-center text-center w-56">
          Secure checkout provided by us. Need help?
          <Link href="/contact-us">
            <span className="underline underline-offset-2">
              Contact Our Support
            </span>
          </Link>
        </p>
      </div>

      {!promoApplied && (
        <div className="flex flex-row p-6 w-full rounded-3xl border border-burgundy-700 bg-burgundy-800">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-row gap-4 w-full"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        name="code"
                        type="text"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        maxLength={6}
                        placeholder="Promo Code"
                        className="w-full bg-burgundy-950"
                      />
                    </FormControl>
                    {(form.formState.errors.code || promoError) && (
                      <p className="text-crimson-500 text-xxs font-normal mt-1">
                        {form.formState.errors.code?.message || promoError}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="rounded-full"
              >
                <span>Apply</span>
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
