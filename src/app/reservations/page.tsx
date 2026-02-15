"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, LoaderCircle, MapPin, Sofa } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/lib/hooks/use-toast";
import { PageContainer } from "@/components/structure/PageContainer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormLabelWithNumberComponent } from "@/components/FormLabelWithNumberComponent";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  partySize: z.string().min(1, "Party size must be at least 1 person."),
  reservationDate: z
    .object({
      from: z.date({ message: "Start date is required." }),
      to: z.date().optional(),
    })
    .refine((date) => {
      if (!date.from) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date.from >= today;
    }, "Reservation date must be today or in the future."),
  seatingArea: z.string().min(1, "Please select a seating area."),
  availableTime: z.string().min(1, "Please select an available time."),
  occasionType: z.string().min(1, "Please select an occasion type."),
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters.")
    .refine(
      (value) => /^[a-zA-Z\s'-]+$/.test(value),
      "First name can only contain letters, spaces, hyphens, and apostrophes.",
    ),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters.")
    .refine(
      (value) => /^[a-zA-Z\s'-]+$/.test(value),
      "Last name can only contain letters, spaces, hyphens, and apostrophes.",
    ),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits.")
    .refine(
      (value) => /^[0-9+\-\s()]*$/.test(value),
      "Phone number can only contain numbers and common phone symbols.",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .refine((value) => !/\s/.test(value), "Email cannot contain spaces."),
  specialRequests: z
    .string()
    .max(500, "Special requests cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),
  acceptTerms: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must agree to the Cancellation Policy and Terms of Service.",
    ),
});

type FormData = z.infer<typeof formSchema>;

type TimeSlot = {
  time: string;
  seatingType: string;
  available: boolean;
};

export default function ReservationPage() {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const partySizeData = ["1", "2", "3", "4", "5", "6", "7", "8+"];

  const timeSlots: Record<string, TimeSlot[]> = {
    dinner: [
      { time: "5:30 PM", seatingType: "Standard", available: true },
      { time: "6:00 PM", seatingType: "Standard", available: true },
      { time: "7:00 PM", seatingType: "Selected", available: true },
      { time: "7:30 PM", seatingType: "Standard", available: true },
      { time: "8:00 PM", seatingType: "Bar Only", available: true },
      { time: "8:30 PM", seatingType: "Standard", available: false },
    ],
    lunch: [
      { time: "11:30 AM", seatingType: "Standard", available: true },
      { time: "12:00 PM", seatingType: "Standard", available: true },
      { time: "12:30 PM", seatingType: "Standard", available: true },
      { time: "1:00 PM", seatingType: "Standard", available: true },
      { time: "1:30 PM", seatingType: "Bar Only", available: true },
      { time: "2:00 PM", seatingType: "Standard", available: false },
    ],
  };

  const form = useForm<FormData>({
    defaultValues: {
      partySize: "2",
      reservationDate: { from: undefined, to: undefined },
      seatingArea: "",
      availableTime: "",
      occasionType: "dinner",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      specialRequests: "",
      acceptTerms: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(formSchema),
  });

  const selectedPartySize = form.watch("partySize");
  const selectedOccasionType = form.watch("occasionType");
  const selectedTime = form.watch("availableTime");

  const getGuestLabel = (size: string) => {
    return size === "1" ? "guest" : "guests";
  };

  const onSubmit = async (values: FormData, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to make reservation");
      }

      toast({
        title: "Reservation Confirmed!",
        description:
          "Your table has been successfully reserved. Check your email for confirmation.",
        variant: "default",
      });

      form.reset({
        partySize: "2",
        reservationDate: { from: undefined, to: undefined },
        seatingArea: "",
        availableTime: "",
        occasionType: "dinner",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        specialRequests: "",
        acceptTerms: false,
      });
    } catch (error) {
      console.error("Error submitting reservation:", error);

      toast({
        title: "Reservation Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error processing your reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <div className="flex lg:flex-row flex-col w-full lg:-mt-[52px] -mt-12">
        <div
          className="relative flex flex-col lg:min-h-full min-h-[100vh] lg:w-1/2 w-full items-center justify-center bg-cover bg-center lg:px-0 px-16"
          style={{ backgroundImage: `url(/reservation.jpg)` }}
        >
          <div className="absolute inset-0 lg:bg-gradient-to-l bg-gradient-to-t from-burgundy-950 via-burgundy-900/60 to-transparent pointer-events-none" />

          <div className="absolute lg:bottom-10 bottom-4 bg-stone-700/40 border border-burgundy-700/30 backdrop-blur-md rounded-2xl w-full xl:max-w-xl lg:max-w-md max-w-[320px]">
            <div className="flex flex-col gap-6 lg:px-9 px-5 py-6 z-20 opacity-100">
              <div className="flex flex-col gap-3">
                <h3 className="!font-extrabold xl:text-3xl text-2xl text-white">
                  Taste the{" "}
                  <span className="text-crimson-600">Extraordinary</span>
                </h3>
                <p className="font-normal xl:text-sm text-xxs text-white xl:text-start lg:text-center text-start">
                  Immerse yourself in a culinary journey inspired by the
                  seasons.
                  <br className="hidden lg:block" /> Secure your tale for an
                  unforgettable moment.
                </p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <MapPin size={20} className="fill-crimson-600 stroke-white" />
                <p className="font-normal xl:text-sm text-xxs text-white">
                  19 Dock Road, Cape Town, 8001, South Africa
                </p>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div className="flex flex-col lg:gap-6 gap-8 w-full px-4 md:px-20 xl:px-0 py-10 lg:mt-24 mt-0">
            <div className="flex flex-col gap-2">
              <h2 className="!font-extrabold xl:text-4xl lg:text-3xl text-3xl text-white">
                Secure Your Table
              </h2>
              <p className="font-normal lg:text-sm text-xs text-white-60">
                Complete the form below to confirm your reservation.
              </p>
            </div>

            <div className="border-t border-burgundy-800" />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4"
              >
                <FormField
                  control={form.control}
                  name="partySize"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4">
                      <FormLabelWithNumberComponent
                        number={1}
                        label="Party Size"
                      />
                      <div className="flex flex-row lg:gap-2 gap-3 flex-wrap">
                        {partySizeData.map((partySize, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => field.onChange(partySize)}
                            className={cn(
                              "flex items-center justify-center lg:px-4 px-2 lg:py-2 py-1 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:border-crimson-500",
                              selectedPartySize === partySize
                                ? "border-crimson-500 bg-crimson-500/10"
                                : "border-burgundy-700 bg-burgundy-900/50",
                            )}
                          >
                            <span
                              className={cn(
                                "font-sans font-normal lg:text-sm !text-xs",
                                selectedPartySize === partySize
                                  ? "text-crimson-500"
                                  : "text-white",
                              )}
                            >
                              {partySize}{" "}
                              {selectedPartySize === partySize &&
                                getGuestLabel(partySize)}
                            </span>
                          </button>
                        ))}
                      </div>
                      {form.formState.errors.partySize ? (
                        <p className="hidden text-crimson-500 text-xs font-normal">
                          {form.formState.errors.partySize.message}
                        </p>
                      ) : (
                        <div className="h-1" />
                      )}
                    </FormItem>
                  )}
                />

                <div className="flex lg:flex-row flex-col xl:gap-10 lg:gap-6 gap-10 w-full">
                  <div className="lg:w-1/2 w-full">
                    <FormField
                      control={form.control}
                      name="reservationDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-4">
                          <FormLabelWithNumberComponent
                            number={2}
                            label="Select Date Range"
                          />
                          <Calendar
                            mode="range"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            className="w-full lg:w-auto rounded-lg border border-burgundy-700 bg-burgundy-900"
                            numberOfMonths={1}
                          />
                          {form.formState.errors.reservationDate ? (
                            <p className="text-crimson-500 text-xxs font-normal">
                              {form.formState.errors.reservationDate.message ||
                                form.formState.errors.reservationDate.from
                                  ?.message}
                            </p>
                          ) : (
                            <div className="h-2 py-1.5" />
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="lg:w-1/2 w-full">
                    <FormField
                      control={form.control}
                      name="seatingArea"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-4">
                          <FormLabelWithNumberComponent
                            number={3}
                            label="Seating Area"
                          />
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col w-full space-y-3"
                          >
                            <Item
                              variant="outline"
                              className={cn(
                                "bg-burgundy-900 border transition-all cursor-pointer",
                                field.value === "main-dining"
                                  ? "border-crimson-500 bg-crimson-500/10"
                                  : "border-burgundy-700 hover:border-crimson-500/50",
                              )}
                              onClick={() => field.onChange("main-dining")}
                            >
                              <ItemContent className="flex flex-row space-x-3">
                                <div className="flex self-center">
                                  <Sofa className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <ItemTitle className="font-bold xl:text-sm lg:text-xs text-sm text-white">
                                    Main Dining Room
                                  </ItemTitle>
                                  <ItemDescription className="font-normal text-xs text-white-60">
                                    Standard seating
                                  </ItemDescription>
                                </div>
                              </ItemContent>
                              <ItemActions>
                                <RadioGroupItem value="main-dining" />
                              </ItemActions>
                            </Item>

                            <Item
                              variant="outline"
                              className={cn(
                                "bg-burgundy-900 border transition-all cursor-pointer",
                                field.value === "patio"
                                  ? "border-crimson-500 bg-crimson-500/10"
                                  : "border-burgundy-700 hover:border-crimson-500/50",
                              )}
                              onClick={() => field.onChange("patio")}
                            >
                              <ItemContent className="flex flex-row space-x-3">
                                <div className="flex self-center">
                                  <MapPin className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <ItemTitle className="font-bold xl:text-sm lg:text-xs text-sm text-white">
                                    Patio
                                  </ItemTitle>
                                  <ItemDescription className="font-normal text-xs text-white-60">
                                    Outdoor seating (Weather permitting)
                                  </ItemDescription>
                                </div>
                              </ItemContent>
                              <ItemActions>
                                <RadioGroupItem value="patio" />
                              </ItemActions>
                            </Item>

                            <Item
                              variant="outline"
                              className={cn(
                                "bg-burgundy-900 border transition-all cursor-pointer",
                                field.value === "bar"
                                  ? "border-crimson-500 bg-crimson-500/10"
                                  : "border-burgundy-700 hover:border-crimson-500/50",
                              )}
                              onClick={() => field.onChange("bar")}
                            >
                              <ItemContent className="flex flex-row space-x-3">
                                <div className="flex self-center">
                                  <Sofa className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <ItemTitle className="font-bold xl:text-sm lg:text-xs text-sm text-white">
                                    Bar High-Top
                                  </ItemTitle>
                                  <ItemDescription className="font-normal text-xs text-white-60">
                                    High energy area
                                  </ItemDescription>
                                </div>
                              </ItemContent>
                              <ItemActions>
                                <RadioGroupItem value="bar" />
                              </ItemActions>
                            </Item>
                          </RadioGroup>
                          {form.formState.errors.seatingArea ? (
                            <p className="text-crimson-500 text-xxs font-normal">
                              {form.formState.errors.seatingArea.message}
                            </p>
                          ) : (
                            <div className="h-2 py-1.5" />
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="availableTime"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex lg:flex-row flex-row justify-between items-center w-full mb-4">
                        <FormLabelWithNumberComponent
                          number={4}
                          label="Available Times"
                        />

                        <FormField
                          control={form.control}
                          name="occasionType"
                          render={({ field: occasionField }) => (
                            <div className="flex flex-row gap-1 p-1 bg-burgundy-900 rounded-lg">
                              <ToggleGroup
                                type="single"
                                value={occasionField.value}
                                onValueChange={(value) => {
                                  if (value) occasionField.onChange(value);
                                }}
                              >
                                <ToggleGroupItem
                                  value="dinner"
                                  aria-label="Toggle dinner"
                                  className={cn(
                                    "px-4 py-2 lg:w-20 w-14 rounded-md transition-all duration-200 font-sans font-normal xl:text-sm text-xs",
                                    occasionField.value === "dinner"
                                      ? "!bg-crimson-600 text-white"
                                      : "bg-transparent text-white hover:bg-burgundy-800",
                                  )}
                                >
                                  <span>Dinner</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="lunch"
                                  aria-label="Toggle lunch"
                                  className={cn(
                                    "px-4 py-2 lg:w-20 w-14 rounded-md transition-all duration-200 font-sans font-normal xl:text-sm text-xs",
                                    occasionField.value === "lunch"
                                      ? "!bg-crimson-600 text-white"
                                      : "bg-transparent text-white hover:bg-burgundy-800",
                                  )}
                                >
                                  <span>Lunch</span>
                                </ToggleGroupItem>
                              </ToggleGroup>
                            </div>
                          )}
                        />
                      </div>

                      <div className="flex flex-row xl:gap-2 lg:gap-2 gap-[21px] flex-wrap">
                        {timeSlots[selectedOccasionType]?.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              if (slot.available) {
                                field.onChange(slot.time);
                              }
                            }}
                            disabled={!slot.available}
                            className={cn(
                              "flex flex-col items-center justify-center px-6 py-3 xl:w-28 lg:w-32 w-auto rounded-lg border-2 transition-all duration-200",
                              !slot.available
                                ? "border-burgundy-800 bg-burgundy-950/50 cursor-not-allowed opacity-50"
                                : selectedTime === slot.time
                                  ? "border-crimson-600 bg-crimson-500 cursor-pointer"
                                  : "border-burgundy-700 bg-burgundy-900/50 cursor-pointer hover:border-crimson-500",
                            )}
                          >
                            <span
                              className={cn(
                                "font-sans font-semibold text-xs",
                                !slot.available
                                  ? "text-white-60"
                                  : selectedTime === slot.time
                                    ? "text-white"
                                    : "text-white",
                              )}
                            >
                              {slot.time}
                            </span>
                            <span
                              className={cn(
                                "font-sans font-normal lg:text-xxs text-[10px] mt-1",
                                !slot.available
                                  ? "text-white-60"
                                  : selectedTime === slot.time
                                    ? "text-white/80"
                                    : "text-white-60",
                              )}
                            >
                              {slot.seatingType}
                            </span>
                          </button>
                        ))}
                      </div>
                      {form.formState.errors.availableTime ? (
                        <p className="text-crimson-500 text-xxs font-normal">
                          {form.formState.errors.availableTime.message}
                        </p>
                      ) : (
                        <div className="h-2 py-1.5" />
                      )}
                    </FormItem>
                  )}
                />

                <div className="border-t border-burgundy-800" />

                <div className="flex flex-col w-full gap-4">
                  <h2 className="font-sans !font-bold lg:text-xl text-lg text-white">
                    Contact Details
                  </h2>

                  <div className="flex lg:flex-row flex-col lg:gap-6 gap-4 w-full">
                    <div className="lg:w-1/2 w-full">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                              first name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                autoComplete="given-name"
                                placeholder="e.g. Jane"
                                className="bg-burgundy-900 border-burgundy-700 text-white"
                              />
                            </FormControl>
                            {form.formState.errors.firstName ? (
                              <p className="text-crimson-500 text-xxs font-normal">
                                {form.formState.errors.firstName.message}
                              </p>
                            ) : (
                              <div className="h-2 py-1.5" />
                            )}
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="lg:w-1/2 w-full">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                              last name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                autoComplete="family-name"
                                placeholder="e.g. Doe"
                                className="bg-burgundy-900 border-burgundy-700 text-white"
                              />
                            </FormControl>
                            {form.formState.errors.lastName ? (
                              <p className="text-crimson-500 text-xxs font-normal">
                                {form.formState.errors.lastName.message}
                              </p>
                            ) : (
                              <div className="h-2 py-1.5" />
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex lg:flex-row flex-col lg:gap-6 gap-4 w-full">
                    <div className="lg:w-1/2 w-full">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                              phone number
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                autoComplete="tel"
                                placeholder="+27(123)-456-7890"
                                className="bg-burgundy-900 border-burgundy-700 text-white"
                              />
                            </FormControl>
                            {form.formState.errors.phoneNumber ? (
                              <p className="text-crimson-500 text-xxs font-normal">
                                {form.formState.errors.phoneNumber.message}
                              </p>
                            ) : (
                              <div className="h-2 py-1.5" />
                            )}
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="lg:w-1/2 w-full">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                              email address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                autoComplete="email"
                                placeholder="jane@example.com"
                                className="bg-burgundy-900 border-burgundy-700 text-white"
                              />
                            </FormControl>
                            {form.formState.errors.email ? (
                              <p className="text-crimson-500 text-xxs font-normal">
                                {form.formState.errors.email.message}
                              </p>
                            ) : (
                              <div className="h-2 py-1.5" />
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                          special requests (optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Allergies, anniversaries, or special occasions..."
                            className="bg-burgundy-900 border-burgundy-700 text-white resize-none"
                          />
                        </FormControl>
                        {form.formState.errors.specialRequests ? (
                          <p className="text-crimson-500 text-xxs font-normal">
                            {form.formState.errors.specialRequests.message}
                          </p>
                        ) : (
                          <div className="h-2 py-1.5" />
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-t border-burgundy-800" />

                <div className="flex flex-col w-full gap-4">
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row w-full items-center justify-start gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <FormLabel className="font-normal lg:text-xs !text-xxs text-white cursor-pointer">
                            I agree with the{" "}
                            <Link
                              href="/legal/cancellation-policy"
                              className="underline underline-offset-2 hover:text-crimson-500"
                            >
                              Cancellation Policy
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="#"
                              className="underline underline-offset-2 hover:text-crimson-500"
                            >
                              Terms of Service
                            </Link>
                          </FormLabel>
                        </div>
                        {form.formState.errors.acceptTerms ? (
                          <p className="text-crimson-500 text-xxs font-normal">
                            {form.formState.errors.acceptTerms.message}
                          </p>
                        ) : (
                          <div className="h-2 py-1.5" />
                        )}
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="flex flex-row gap-2 items-center justify-center bg-crimson-600 hover:bg-crimson-500"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="animate-spin h-4 w-4" />
                        <span>Reserving...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Reservation</span>
                        <ArrowRight size={16} className="text-white" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center">
                    <p className="font-normal lg:text-xs text-xxs text-white-60">
                      Powered by Lumière Table Management
                    </p>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
