"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/context/CartContext";
import { useMenu } from "@/lib/hooks/use-menu";
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

const kitchenNotesFormSchema = z.object({ notes: z.string().optional() });
type KitchenNotesFormValues = z.infer<typeof kitchenNotesFormSchema>;

export default function MyCartMainPage() {
  const { menuData } = useMenu();

  const {
    items,
    subtotal,
    tax,
    serviceCharge,
    total,
    kitchenNotes,
    setKitchenNotes,
  } = useCart();

  const form = useForm<KitchenNotesFormValues>({
    defaultValues: { notes: kitchenNotes || "" },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(kitchenNotesFormSchema),
  });

  const onSubmit = async (values: KitchenNotesFormValues) => {
    setKitchenNotes(values.notes || "");
  };

  const cartItemIds = useMemo(() => items.map((i) => i.id), [items]);

  const relatedItems = useMemo(() => {
    const idSet = new Set(cartItemIds);

    const cartCats = new Set<string>();
    for (const id of cartItemIds) {
      for (const section of menuData) {
        if (section.items.some((mi) => mi.name === id)) {
          cartCats.add(section.id);
        }
      }
    }

    const prioritized = menuData
      .filter((section) => !cartCats.has(section.id))
      .flatMap((section) => section.items)
      .filter((item) => !idSet.has(item.name));

    const fallback = menuData
      .filter((section) => cartCats.has(section.id))
      .flatMap((section) => section.items)
      .filter((item) => !idSet.has(item.name));

    const shuffle = <T,>(arr: T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    return [...shuffle(prioritized), ...shuffle(fallback)].slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemIds.join(",")]);

  if (items.length === 0) return <EmptyCartComponent />;

  return (
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
                Review your chosen dishes before proceeding to secure checkout.
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
          <div className="flex lg:flex-row flex-col w-full lg:gap-16 gap-8 lg:mb-0 mb-4">
            <div className="flex flex-col lg:w-2/3 w-full gap-10">
              {items.map((item) => (
                <CartItemCardComponent key={item.id} item={item} />
              ))}

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
                            rows={4}
                            placeholder="Any allergies or special requests?"
                            className="w-full rounded-3xl bg-burgundy-950 resize-none"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {form.formState.dirtyFields.notes && (
                    <div className="flex w-full justify-end items-end">
                      <Button type="submit" disabled={!form.formState.isValid}>
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
                  {relatedItems.map((item) => (
                    <CartRelatedItemComponent
                      key={item.name}
                      id={item.name}
                      name={item.name}
                      excerpt={item.excerpt}
                      price={item.price}
                      image={item.image}
                    />
                  ))}
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
  );
}
