"use client";

import { useRouter } from "next/navigation";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { CartOrderSummaryComponent } from "@/components/cart/CartOrderSummaryComponent";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, tax, serviceCharge, total } = useCart();

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  if (items.length === 0) return router.back();

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <PaddingContainer
        size="small"
        className="flex flex-col w-full lg:my-20 my-8 gap-10"
      >
        <div className="flex flex-col w-full gap-6">
          <div>
            <Button
              onClick={handleGoBack}
              variant="default"
              size="lg"
              className="rounded-full"
            >
              <ArrowLeft size={16} className="mr-2" />
              <span>Go back</span>
            </Button>
          </div>

          <div className="flex lg:flex-row flex-col-reverse lg:gap-0 gap-6 justify-between w-full">
            <div className="flex flex-col lg:w-1/2 w-full items-start">
              <h1 className="!font-bold xl:text-4xl lg:text-2xl text-2xl text-white-100">
                Complete Your Order
              </h1>
              <p className="font-normal xl:text-sm lg:text-xs text-xxs text-white-60">
                Please enter your payment details to finalise your reservation.
              </p>
            </div>
            <div className="flex flex-col lg:w-1/2 w-full items-end justify-end">
              <Field className="w-full xl:max-w-sm lg:max-w-xs max-w-[150px]">
                <FieldLabel htmlFor="progress-upload">
                  <span className="lg:text-sm text-xs">Step 2 of 3</span>
                  <span className="ml-auto lg:text-sm text-xs">66%</span>
                </FieldLabel>
                <Progress value={66.3} id="progress-upload" />
              </Field>
            </div>
          </div>
          <Separator />
        </div>

        <div className="flex lg:flex-row flex-col w-full">
          <div className="flex lg:flex-row flex-col w-full lg:gap-16 gap-8 lg:mb-0 mb-4">
            <div className="flex flex-col lg:w-2/3 w-full gap-10"></div>

            <div className="flex lg:w-1/3 w-full">
              <CartOrderSummaryComponent
                subtotal={subtotal}
                tax={tax}
                serviceCharge={serviceCharge}
                total={total}
              />
            </div>
          </div>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
