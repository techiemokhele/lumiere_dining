"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmptyCartComponent } from "@/components/EmptyCartComponent";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CartItemCardComponent } from "@/components/cart/CartItemCardComponent";
import { CartOrderSummaryComponent } from "@/components/cart/CartOrderSummaryComponent";
import { CartRelatedItemComponent } from "@/components/cart/CartRelatedItemComponent";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const kitchenNotesFormSchema = z.object({
  notes: z.string().optional(),
});

type KitchenNotesFormValues = z.infer<typeof kitchenNotesFormSchema>;

export default function MyCartMainPage() {
  const [isCartEmpty] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const form = useForm<KitchenNotesFormValues>({
    defaultValues: {
      notes: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(kitchenNotesFormSchema),
  });

  const price = 28;

  const subtotal = useMemo(() => {
    return quantity * price;
  }, [quantity]);

  const tax = subtotal * 0.08;
  const serviceCharge = subtotal * 0.15;
  const total = subtotal + tax + serviceCharge;

  const onSubmit = async (values: KitchenNotesFormValues) => {
    console.log(
      "This values will be sent through once the user clicks on checkout button fro the CartOrderSummaryComponent",
      values,
    );
  };

  return (
    <>
      {isCartEmpty ? (
        <EmptyCartComponent />
      ) : (
        <PageContainer showNavigation={true} showFooter={true}>
          <PaddingContainer
            size="small"
            className="flex flex-col w-full lg:my-20 my-8 gap-10"
          >
            <div className="flex flex-col w-full gap-6">
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

            <div className="flex lg:flex-row flex-col w-full">
              <div className="flex lg:flex-row flex-col w-full gap-16">
                <div className="flex flex-col lg:w-2/3 w-full gap-10">
                  <CartItemCardComponent
                    quantity={quantity}
                    setQuantity={setQuantity}
                    price={price}
                  />

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col gap-2 w-full"
                    >
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>
                              <span className="text-sm font-normal text-white-100">
                                Kitchen Notes
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                name="code"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                rows={4}
                                placeholder="Any allergies or special requests? (e.g. No onions, no garlic, sauce on the side, etc.)"
                                className="w-full rounded-3xl bg-burgundy-950 resize-none"
                              />
                            </FormControl>
                            {form.formState.errors.notes ? (
                              <p className="text-crimson-500 text-xxs font-normal mt-1">
                                {form.formState.errors.notes.message}
                              </p>
                            ) : (
                              <div className="h-2 py-1.5" />
                            )}
                          </FormItem>
                        )}
                      />

                      {form.formState.dirtyFields.notes && (
                        <div className="flex w-full justify-end items-end">
                          <Button
                            type="submit"
                            className=""
                            disabled={!form.formState.isValid}
                          >
                            <span>Attach notes</span>
                          </Button>
                        </div>
                      )}
                    </form>
                  </Form>

                  <Separator />

                  <div className="flex flex-col w-full gap-8">
                    <h2 className="!font-bold lg:text-2xl text-xl text-white">
                      Perfect Pairings
                    </h2>

                    <div className="grid grid-cols-2 gap-6 w-full">
                      <CartRelatedItemComponent />
                      <CartRelatedItemComponent />
                      <CartRelatedItemComponent />
                      <CartRelatedItemComponent />
                    </div>
                  </div>
                </div>

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
      )}
    </>
  );
}
