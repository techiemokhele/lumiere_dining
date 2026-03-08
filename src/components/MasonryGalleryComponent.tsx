"use client";

import { useState } from "react";
import { GalleryItem } from "@/data/galleryData";
import { ImageViewerModalComponent } from "./ImageViewerModalComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MasonryGalleryComponentProps {
  title: string;
  description: string;
  items: GalleryItem[];
  isLoading?: boolean;
}

export function MasonryGalleryComponent({
  title,
  description,
  items,
  isLoading = false,
}: MasonryGalleryComponentProps) {
  const [viewerOpen, setViewerOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const handleImageLoad = (itemId: string) => {
    setLoadedImages((prev) => new Set(prev).add(itemId));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full gap-6 mb-16">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-64 bg-burgundy-800" />
          <Skeleton className="h-5 w-full max-w-3xl bg-burgundy-800" />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="break-inside-avoid mb-4">
              <Skeleton
                className={cn(
                  "w-full rounded-xl bg-burgundy-800",
                  index % 3 === 0 && "h-[400px]",
                  index % 3 === 1 && "h-[300px]",
                  index % 3 === 2 && "h-[250px]",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full gap-6 mb-16">
        <div className="flex flex-col gap-2">
          <h2 className="font-extrabold lg:text-3xl text-2xl text-crimson-600">
            {title}
          </h2>
          <p className="font-normal lg:text-base xl:text-sm text-xs text-white/80 max-w-3xl">
            {description}
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4 cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-burgundy-700 hover:border-crimson-500 transition-all duration-300 shadow-lg hover:shadow-2xl">
                {!loadedImages.has(item.id) && (
                  <Skeleton
                    className={cn(
                      "absolute inset-0 bg-burgundy-800",
                      item.aspectRatio === "portrait" && "h-[400px]",
                      item.aspectRatio === "square" && "h-[300px]",
                      item.aspectRatio === "landscape" && "h-[250px]",
                      !item.aspectRatio && "h-auto",
                    )}
                  />
                )}

                {item.type === "video" ? (
                  <video
                    src={item.thumbnail || item.src}
                    onLoadedData={() => handleImageLoad(item.id)}
                    className={cn(
                      "w-full object-cover group-hover:scale-105 transition-transform duration-300",
                      item.aspectRatio === "portrait" && "h-[400px]",
                      item.aspectRatio === "square" && "h-[300px]",
                      item.aspectRatio === "landscape" && "h-[250px]",
                      !item.aspectRatio && "h-auto",
                      !loadedImages.has(item.id) && "opacity-0",
                    )}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    onLoad={() => handleImageLoad(item.id)}
                    className={cn(
                      "w-full object-cover group-hover:scale-105 transition-transform duration-300",
                      item.aspectRatio === "portrait" && "h-[400px]",
                      item.aspectRatio === "square" && "h-[300px]",
                      item.aspectRatio === "landscape" && "h-[250px]",
                      !item.aspectRatio && "h-auto",
                      !loadedImages.has(item.id) && "opacity-0",
                    )}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="xl:text-sm text-xs text-white/90">
                      {item.description}
                    </p>
                  </div>
                </div>

                {item.type === "video" && (
                  <div className="absolute top-4 right-4 bg-crimson-600 rounded-full p-2">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageViewerModalComponent
        items={items}
        currentIndex={currentIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
}
