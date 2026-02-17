"use client";

import { useEffect, useRef, useState } from "react";

import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { MasonryGalleryComponent } from "@/components/MasonryGalleryComponent";
import { PageContainer } from "@/components/structure/PageContainer";
import { galleryData } from "@/data/galleryData";

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="flex flex-col"
    >
      <div className="lg:-mt-[52px] -mt-[48px] w-full">
        <HeaderComponent
          onClick={() =>
            galleryRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          image="./gallery-header.jpg"
          badgeText="Gallery of fame"
          addBadgeBorder={true}
          title="Explore Our Gallery of Delightful Moments"
          description="Step into the world of Lumière Dining through our curated collection of culinary artistry, elegant ambiance, and unforgettable dining experiences. Discover the passion and craftsmanship behind every dish we serve."
        />
      </div>

      <section
        ref={galleryRef}
        className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24"
      >
        <div className="flex flex-col w-full max-w-7xl mx-auto">
          {galleryData.map((section) => (
            <MasonryGalleryComponent
              key={section.id}
              title={section.title}
              description={section.description}
              items={section.items}
              isLoading={isLoading}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
