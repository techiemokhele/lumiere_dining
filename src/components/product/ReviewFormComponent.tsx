"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoaderCircle, Send, LogIn } from "lucide-react";
import z from "zod";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { InteractiveStarRating } from "./InteractiveStarRatingComponent";

const reviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating.")
    .max(5, "Rating cannot exceed 5."),
  title: z
    .string()
    .trim()
    .min(3, "Review title must be at least 3 characters.")
    .max(150, "Review title cannot exceed 150 characters."),
  review: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters.")
    .max(1000, "Review cannot exceed 1000 characters."),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

export function ReviewFormComponent({ itemName }: { itemName: string }) {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      title: "",
      review: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(reviewFormSchema),
  });

  const onSubmit = async (
    values: ReviewFormData,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName,
          rating: values.rating,
          title: values.title,
          review: values.review,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }

      toast({
        title: "Review Submitted!",
        description: `Thank you for reviewing ${itemName}. Your feedback helps other guests.`,
        variant: "default",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Separator />
      <div className="flex flex-col gap-2">
        <h2 className="font-extrabold text-2xl lg:text-3xl text-white">
          Leave a Review
        </h2>
        <p className="lg:text-sm text-xs text-white-60">
          Share your experience with {itemName} to help other guests
        </p>
      </div>

      {status !== "authenticated" ? (
        <div className="flex flex-col items-center gap-4 py-12 rounded-2xl bg-burgundy-800">
          <LogIn size={32} className="text-white-60" />
          <p className="text-sm text-white-60 text-center">
            You need to be signed in to leave a review.
          </p>
          <Button asChild className="bg-crimson-600 hover:bg-crimson-500 gap-2">
            <Link href="/auth/sign-in">
              <LogIn size={16} />
              <span>Sign In to Review</span>
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl bg-burgundy-800 p-6 lg:p-8">
          <div className="flex flex-row items-center gap-2 mb-5">
            <p className="text-xs text-white-60">
              Reviewing as{" "}
              <span className="text-white font-semibold">
                {session.user?.name}
              </span>
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                      Your Rating
                    </FormLabel>
                    <FormControl>
                      <InteractiveStarRating
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    {form.formState.errors.rating ? (
                      <p className="text-crimson-500 text-xxs font-normal mt-1">
                        {form.formState.errors.rating.message}
                      </p>
                    ) : (
                      <div className="h-2 py-1.5" />
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                      Review Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Summarise your experience"
                        className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
                      />
                    </FormControl>
                    {form.formState.errors.title ? (
                      <p className="text-crimson-500 text-xxs font-normal mt-1">
                        {form.formState.errors.title.message}
                      </p>
                    ) : (
                      <div className="h-2 py-1.5" />
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans font-normal text-xs text-white-60 uppercase">
                      Your Review
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Tell us about your experience with this dish..."
                        className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60 resize-none"
                      />
                    </FormControl>
                    {form.formState.errors.review ? (
                      <p className="text-crimson-500 text-xxs font-normal mt-1">
                        {form.formState.errors.review.message}
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
                disabled={isSubmitting}
                className="flex flex-row gap-2 items-center justify-center bg-crimson-600 hover:bg-crimson-500 disabled:opacity-50 self-end rounded-full"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Review</span>
                    <Send size={16} className="text-white" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
