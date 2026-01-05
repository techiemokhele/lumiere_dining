import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { PageContainer } from "@/components/structure/PageContainer";
import React from "react";

export default function OurStoryPage() {
  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <div className="-mt-12 w-full">
        <HeaderComponent
          image="./story-header.jpg"
          badgeText="Since 2008"
          addBadgeBorder={false}
          title="A Symphony of Taste"
          description="Where culinary meets great innovation. Step into a world where every dish tells a story."
        />
      </div>
    </PageContainer>
  );
}
