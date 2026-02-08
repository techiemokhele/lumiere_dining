import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";

export default function GalleryPage() {
  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <div className="lg:-mt-[53px] -mt-12 w-full">
        <HeaderComponent
          image="./gallery-header.jpg"
          badgeText="Gallery"
          addBadgeBorder={true}
          title="Explore Our Gallery of Delightful Moments"
          description="Step into the world of Lumière Dining through our curated collection of culinary artistry, elegant ambiance, and unforgettable dining experiences. Discover the passion and craftsmanship behind every dish we serve."
        />
      </div>
      <PaddingContainer size="large" className="flex flex-col gap-20">
        <div className="flex flex-col w-full"></div>
      </PaddingContainer>
    </PageContainer>
  );
}
