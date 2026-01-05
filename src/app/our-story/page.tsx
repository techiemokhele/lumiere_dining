import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

      <section className="flex flex-col w-full lg:p-12 py-12 px-8">
        <PaddingContainer size="large">
          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex flex-col gap-6 lg:w-2/3 w-full">
              <p className="flex items-center gap-4 font-normal text-xxs text-crimson-600 uppercase">
                <span className="w-16 border-t border-crimson-600"></span> the
                culinary experience
              </p>

              <div className="flex flex-col w-full">
                <h1 className="font-sans !font-extrabold lg:text-6xl text-4xl text-white">
                  Rooted in tradition,
                  <br />
                </h1>
                <h2 className="font-normal lg:text-6xl text-4xl text-white-60 italic lg:-mt-4 -mt-1">
                  Daring in Execution
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-normal text-sm text-white">
                  We believe in the purity of flaws. Our kitchen merges ancient
                  culinary techniques with modern flair to create a dining
                  experience that transcends the ordinary.
                </p>

                <p className="font-normal text-sm text-white">
                  Every plate is a canvas, and every ingredient is a color. We
                  strive not just to feed the belly, but to spark a memory, to
                  evolve in a world of culinary possibilities and artistry,
                  which is the essence of our culinary journey.
                </p>
              </div>

              <Button
                variant="link"
                className="self-start p-0 items-center flex flex-row gap-2 hover:no-underline"
              >
                <span className="text-left">Order Our Finest Dishes</span>
                <ArrowRight size={18} className="text-crimson-600" />
              </Button>
            </div>

            <div className="lg:w-1/2 w-full"></div>
          </div>
        </PaddingContainer>
      </section>
    </PageContainer>
  );
}
