"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoaderCircle, Send, LogIn, Star } from "lucide-react";
import z from "zod";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { InteractiveStarRating } from "./InteractiveStarRatingComponent";

const reviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating.").max(5),
  title: z
    .string()
    .trim()
    .min(3, "Review title must be at least 3 characters.")
    .max(150),
  review: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters.")
    .max(1000),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

interface ReviewData {
  _id: string;
  userName: string;
  rating: number;
  title: string;
  review: string;
  createdAt: string;
}

export function ReviewFormComponent({
  itemName,
  onCountChange,
}: {
  itemName: string;
  onCountChange?: (count: number) => void;
}) {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews/${encodeURIComponent(itemName)}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      if (onCountChange) onCountChange(data.count ?? 0);
    } catch {
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemName]);

  const form = useForm<ReviewFormData>({
    defaultValues: { rating: 0, title: "", review: "" },
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
        body: JSON.stringify({ itemName, ...values }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to submit review.");

      toast({
        title: "Review Submitted!",
        description: `Thank you for reviewing ${itemName}.`,
      });
      form.reset();
      fetchReviews();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
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
          Share your experience with {itemName}
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
          <p className="text-xs text-white-60 mb-5">
            Reviewing as{" "}
            <span className="text-white font-semibold">
              {session.user?.name}
            </span>
          </p>
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
                    {form.formState.errors.rating && (
                      <p className="text-crimson-500 text-xxs mt-1">
                        {form.formState.errors.rating.message}
                      </p>
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
                        placeholder="Summarise your experience"
                        className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60"
                      />
                    </FormControl>
                    {form.formState.errors.title && (
                      <p className="text-crimson-500 text-xxs mt-1">
                        {form.formState.errors.title.message}
                      </p>
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
                        placeholder="Tell us about your experience..."
                        className="bg-burgundy-900 border-burgundy-700 text-white placeholder:text-white-60 resize-none"
                      />
                    </FormControl>
                    {form.formState.errors.review && (
                      <p className="text-crimson-500 text-xxs mt-1">
                        {form.formState.errors.review.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-crimson-600 hover:bg-crimson-500 self-end rounded-full gap-2"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Review</span>
                    <Send size={16} />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}

      {!reviewsLoading && reviews.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-white">Recent Reviews</h3>
          {reviews.map((r) => (
            <div
              key={r._id}
              className="flex flex-col gap-3 p-5 rounded-2xl bg-burgundy-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={cn(
                        star <= r.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-burgundy-700",
                      )}
                    />
                  ))}
                </div>
                <span className="text-xxs text-white-60">
                  {new Date(r.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="font-semibold text-sm text-white">{r.title}</p>
              <p className="text-xs text-white-60 leading-relaxed">
                {r.review}
              </p>
              <p className="text-xxs text-white-40">— {r.userName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
