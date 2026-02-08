"use client";

import { useState } from "react";
import { GalleryItem } from "@/data/galleryData";
import { ImageViewerModalComponent } from "./ImageViewerModalComponent";
import { cn } from "@/lib/utils";

interface MasonryGalleryComponentProps {
  title: string;
  description: string;
  items: GalleryItem[];
}

export function MasonryGalleryComponent({
  title,
  description,
  items,
}: MasonryGalleryComponentProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-6 mb-16">
        <div className="flex flex-col gap-2">
          <h2 className="font-serif font-extrabold lg:text-3xl text-2xl text-crimson-600">
            {title}
          </h2>
          <p className="font-sans font-normal lg:text-base text-sm text-white/80 max-w-3xl">
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
                {item.type === "video" ? (
                  <video
                    src={item.thumbnail || item.src}
                    className={cn(
                      "w-full object-cover group-hover:scale-105 transition-transform duration-300",
                      item.aspectRatio === "portrait" && "h-[400px]",
                      item.aspectRatio === "square" && "h-[300px]",
                      item.aspectRatio === "landscape" && "h-[250px]",
                      !item.aspectRatio && "h-auto",
                    )}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className={cn(
                      "w-full object-cover group-hover:scale-105 transition-transform duration-300",
                      item.aspectRatio === "portrait" && "h-[400px]",
                      item.aspectRatio === "square" && "h-[300px]",
                      item.aspectRatio === "landscape" && "h-[250px]",
                      !item.aspectRatio && "h-auto",
                    )}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-serif font-bold text-lg text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-white/90">
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
