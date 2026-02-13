"use client";

import { useState } from "react";
import { EmptyCartComponent } from "@/components/EmptyCartComponent";
import { PageContainer } from "@/components/structure/PageContainer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PaddingContainer } from "@/components/structure/PaddingContainer";

export default function MyCartMainPage() {
  const [isCartEmpty] = useState<boolean>(false);

  return (
    <>
      {isCartEmpty ? (
        <EmptyCartComponent />
      ) : (
        <PageContainer showNavigation={true} showFooter={true}>
          <PaddingContainer className="flex flex-col w-full lg:my-20 my-8">
            <div className="flex flex-col w-full gap-6 lg:px-8 px-2">
              <div className="flex lg:flex-row flex-col-reverse lg:gap-0 gap-6 justify-between w-full">
                <div className="flex flex-col lg:w-1/2 w-full items-start">
                  <h1 className="!font-bold xl:text-4xl lg:text-2xl text-2xl text-white-100">
                    Your Cart Selection
                  </h1>
                  <p className="font-normal xl:text-sm lg:text-xs text-xxs text-white-60">
                    Review your chosen dishes before proceeding to secure
                    checkout.
                  </p>
                </div>

                <div className="flex flex-col lg:w-1/2 w-full items-end justify-end">
                  <Field className="w-full xl:max-w-sm lg:max-w-xs max-w-[150px]">
                    <FieldLabel htmlFor="progress-upload">
                      <span className="lg:text-sm text-xs">Step 1 of 3</span>
                      <span className="ml-auto lg:text-sm text-xs">33%</span>
                    </FieldLabel>
                    <Progress value={33.3} id="progress-upload" />
                  </Field>
                </div>
              </div>

              <Separator />
            </div>
          </PaddingContainer>
        </PageContainer>
      )}
    </>
  );
}
