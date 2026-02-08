"use client";

import { useEffect, useState } from "react";

import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { MasonryGalleryComponent } from "@/components/MasonryGalleryComponent";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { galleryData } from "@/data/galleryData";

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="flex flex-col gap-20"
    >
      <div className="lg:-mt-[132px] -mt-32 w-full">
        <HeaderComponent
          image="./gallery-header.jpg"
          badgeText="Gallery"
          addBadgeBorder={true}
          title="Explore Our Gallery of Delightful Moments"
          description="Step into the world of Lumière Dining through our curated collection of culinary artistry, elegant ambiance, and unforgettable dining experiences. Discover the passion and craftsmanship behind every dish we serve."
        />
      </div>
      <PaddingContainer size="large" className="flex flex-col gap-20">
        <div className="flex flex-col w-full">
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
      </PaddingContainer>
    </PageContainer>
  );
}
