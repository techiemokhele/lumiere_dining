"use client";

import { useState, useEffect } from "react";
import { LoaderCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewData {
  _id: string;
  itemName: string;
  rating: number;
  title: string;
  review: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/user/reviews");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderCircle className="animate-spin h-8 w-8 text-crimson-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold text-2xl lg:text-3xl text-white">
          My Ratings & Reviews
        </h1>
        <p className="text-sm text-white-60">
          All the reviews you&apos;ve left for dishes.
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => {
            const date = new Date(review.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            );
            return (
              <div
                key={review._id}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-burgundy-800"
              >
                <div className="flex flex-row items-center justify-between">
                  <p className="font-bold text-sm text-white">
                    {review.itemName}
                  </p>
                  <p className="text-xxs text-white-60">{date}</p>
                </div>
                <div className="flex flex-row gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={cn(
                        star <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-burgundy-700",
                      )}
                    />
                  ))}
                </div>
                <p className="font-semibold text-sm text-white">
                  {review.title}
                </p>
                <p className="text-xs text-white-60 leading-relaxed">
                  {review.review}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3 rounded-2xl bg-burgundy-800">
          <Star size={40} className="text-white-60" />
          <p className="text-lg text-white-60">No reviews yet</p>
          <p className="text-xs text-white-60">
            Your reviews will appear here after you rate a dish.
          </p>
        </div>
      )}
    </div>
  );
}
