"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";

const promoCodeFormSchema = z.object({
  code: z.string(),
});

type PromoCodeFormValues = z.infer<typeof promoCodeFormSchema>;

export function CartOrderSummaryComponent() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<PromoCodeFormValues>({
    defaultValues: {
      code: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(promoCodeFormSchema),
  });

  const onSubmit = async (values: PromoCodeFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/promo-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to apply promo code");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full relative">
      <div className="flex flex-col p-6 w-full gap-6 rounded-3xl border border-burgundy-700 bg-burgundy-800">
        <h1 className="!font-bold text-3xl text-white-100">Order Summary</h1>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold lg:text-sm text-xs text-white-60">
              Subtotal
            </p>
            <p className="font-semibold lg:text-sm text-xs text-white-100">
              R568.00
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold lg:text-sm text-xs text-white-60">
              Taxes(8%)
            </p>
            <p className="font-semibold lg:text-sm text-xs text-white-100">
              R45.44
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold lg:text-sm text-xs text-white-60">
              Service Charge(15%)
            </p>
            <p className="font-semibold lg:text-sm text-xs text-white-100">
              R85.20
            </p>
          </div>
          <Separator />
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold lg:text-sm text-xs text-white-100">
              Total
            </p>
            <div className="flex flex-col gap-2">
              <p className="!font-extrabold text-2xl text-crimson-500">
                R698.64
              </p>
              <p className="font-semibold text-xxs text-white-60 flex self-end">
                including all fees
              </p>
            </div>
          </div>
        </div>

        <Button variant="default" size="lg" className="rounded-full">
          <span>Proceed to Checkout</span>
          <ArrowRight className="ml-2" />
        </Button>

        <p className="font-normal text-xxs text-white-60 flex flex-col self-center text-center w-56">
          Secure checkout provided by Yoco. Need help?
          <span className="underline underline-offset-2">
            Contact Yoco Support
          </span>
        </p>
      </div>

      <div className="flex flex-row p-6 w-full gap-6 rounded-3xl border border-burgundy-700 bg-burgundy-800">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row gap-4 w-full items-center"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Promo Code"
                  className="w-full bg-burgundy-950"
                />
              )}
            />
            {isSubmitting ? (
              <Button
                variant="default"
                size="sm"
                disabled
                className="rounded-full"
              >
                <span>Applying...</span>
              </Button>
            ) : (
              <Button variant="default" size="sm" className="rounded-full">
                <span>Apply</span>
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
