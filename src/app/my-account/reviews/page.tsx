"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const fetchReviews = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews/user?page=${page}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setReviews(data.reviews || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold text-2xl lg:text-3xl text-white">
          My Ratings & Reviews
        </h1>
        <p className="text-sm text-white-60">
          {loading
            ? "Loading your reviews..."
            : `${total} review${total !== 1 ? "s" : ""} submitted`}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-5 rounded-2xl bg-burgundy-800"
            >
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-40 bg-burgundy-700" />
                <Skeleton className="h-3 w-20 bg-burgundy-700" />
              </div>
              <Skeleton className="h-3 w-24 bg-burgundy-700" />
              <Skeleton className="h-4 w-56 bg-burgundy-700" />
              <Skeleton className="h-10 w-full bg-burgundy-700" />
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-burgundy-800"
              >
                <div className="flex flex-row items-center justify-between">
                  <p className="font-bold text-sm text-white">
                    {review.itemName}
                  </p>
                  <p className="text-xxs text-white-60">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
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
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="icon"
                className="border-burgundy-700 text-white-60 hover:text-white disabled:opacity-30"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft size={16} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-9 h-9 rounded-md font-serif text-sm transition-colors",
                      currentPage === page
                        ? "bg-primary text-white"
                        : "text-white-60 hover:text-white hover:bg-burgundy-700",
                    )}
                  >
                    {page}
                  </button>
                ),
              )}
              <Button
                variant="outline"
                size="icon"
                className="border-burgundy-700 text-white-60 hover:text-white disabled:opacity-30"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </>
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
