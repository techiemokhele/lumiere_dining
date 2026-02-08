import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { MasonryGalleryComponent } from "@/components/MasonryGalleryComponent";
import { galleryData } from "@/data/galleryData";

export default function GalleryPage() {
  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="flex flex-col gap-20"
    >
      <div className="lg:-mt-[132px] -mt-32 w-full">
        <HeaderComponent
          image="./gallery-header.jpg"
          badgeText="Gallery of Fame"
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
            />
          ))}
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
