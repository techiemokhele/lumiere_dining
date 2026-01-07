"use client";

import Image from "next/image";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";
import { foodSupplyData } from "@/data/foodSupplyData";

export default function OurStoryPage() {
  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="overflow-x-clip flex flex-col gap-10"
    >
      <div className="lg:-mt-[52px] -mt-[88px] w-full">
        <HeaderComponent
          image="./story-header.jpg"
          badgeText="Since 2008"
          addBadgeBorder={false}
          title="A Symphony of Taste"
          description="Where culinary meets great innovation. Step into a world where every dish tells a story."
        />
      </div>

      <PaddingContainer size="large" className="bg-burgundy-950">
        <section className="flex flex-col w-full lg:px-12 py-20 px-4">
          <div className="flex lg:flex-row flex-col gap-12 items-center">
            <div className="flex flex-col gap-6 lg:w-2/3 w-full">
              <p className="flex items-center gap-4 font-normal text-xxs text-crimson-600 uppercase">
                <span className="w-16 border-t border-crimson-600"></span> the
                culinary experience
              </p>

              <div className="flex flex-col w-full">
                <h1 className="font-sans !font-extrabold md:text-6xl text-3xl text-white">
                  Rooted in tradition,
                  <br />
                </h1>
                <h2 className="font-normal md:text-6xl text-3xl text-white-60 italic lg:-mt-4 -mt-1">
                  Daring in Execution
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-normal md:text-sm text-xs text-white">
                  We believe in the purity of flaws. Our kitchen merges ancient
                  culinary techniques with modern flair to create a dining
                  experience that transcends the ordinary.
                </p>

                <p className="font-normal md:text-sm text-xs text-white">
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

            <div className="lg:w-1/2 w-full flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-[4/5] rounded-2xl bg-burgundy-900 p-3 rotate-2 flex items-center justify-center">
                <Image
                  src="/tradition-story.jpg"
                  alt="chef-antonie"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 500px"
                  className="object-cover rounded-2xl -rotate-6"
                />
              </div>
            </div>
          </div>
        </section>
      </PaddingContainer>

      <PaddingContainer size="large">
        <section className="flex flex-col w-full py-12 px-10 rounded-2xl bg-burgundy-900">
          <div className="flex md:flex-row flex-col gap-12 items-center justify-center">
            <div className="relative w-full md:w-1/2 max-w-sm sm:max-w-sm lg:max-w-md aspect-[3/4]">
              <Image
                src="/chef-antonie.jpg"
                alt="chef-antonie"
                fill
                priority
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover rounded-2xl"
              />

              <div className="absolute -bottom-4 -right-4 z-10 flex items-center justify-center rounded-full bg-crimson-600 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-burgundy-900">
                <UtensilsCrossed className="text-white" size={28} />
              </div>
            </div>

            <div className="flex flex-col gap-6 md:w-2/3 w-full">
              <div className="flex flex-col gap-1">
                <p className="font-normal text-xxs text-crimson-600 uppercase">
                  executive chef
                </p>

                <h3 className="!font-extrabold md:text-4xl text-2xl text-white">
                  Meet Chef Antonie
                </h3>
              </div>

              <div className="flex flex-row gap-4">
                <div className="border-[4px] border-crimson-600" />

                <p className="font-sans lg:text-lg text-md text-white-60 italic">
                  &rdquo;Food is memory. I cook to create moments that linger
                  forever in the heart and palate.&ldquo;
                </p>
              </div>

              <p className="font-normal lg:text-sm text-xs text-white">
                Cooking, to me, is memory made tangible. Every dish I create
                begins with respect for tradition—the hands that taught me, the
                fire that shaped me, the imperfections that give food its soul.
                In my kitchen, ancient techniques meet fearless experimentation,
                where restraint is as powerful as excess. I cook not to impress,
                but to connect: to stir emotion, awaken nostalgia, and invite
                curiosity. Each plate is a quiet conversation between past and
                present, between discipline and instinct.
              </p>

              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2">
                  <p className="!font-extrabold text-2xl text-white">23</p>
                  <p className="!font-normal lg:text-md text-xxs text-white-60 uppercase">
                    Years of Experience
                  </p>
                </div>
                <div className="border-2 border-l border-white-60" />
                <div className="flex flex-col gap-2">
                  <p className="!font-extrabold text-2xl text-white">20+</p>
                  <p className="!font-normal lg:text-md text-xxs text-white-60 uppercase">
                    Team Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PaddingContainer>

      <PaddingContainer size="large" className="bg-burgundy-950">
        <section className="flex flex-col w-full py-12 lg:px-10 px-0 gap-12 items-center justify-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h3 className="!font-bold md:text-4xl text-3xl text-white text-center">
              Uncompromising Quality
            </h3>
            <p className="font-normal md:text-sm text-xs text-white-60 text-center lg:w-2/3 w-full">
              We source directly from our farmers to ensure the freshest
              ingredients for our customers who share our passion for culinary
              excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 w-full max-w-6xl md:hidden">
            {foodSupplyData.map((item, index) => (
              <div
                key={index}
                className="group relative h-[220px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-4">
                  <p className="text-white font-semibold text-sm tracking-wide drop-shadow-md">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="hidden md:grid w-full max-w-6xl gap-6"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "260px 260px",
              gridTemplateAreas: `
                "local local seafood"
                "cuts cellar cellar"
              `,
            }}
          >
            {foodSupplyData.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden"
                style={{ gridArea: item.gridArea }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-4">
                  <p className="text-white font-semibold text-sm tracking-wide drop-shadow-md">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PaddingContainer>

      <PaddingContainer size="large">
        <section className="flex flex-col w-full py-12 lg:px-10 px-3 gap-12 rounded-2xl bg-burgundy-900">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="border-t border-crimson-600 w-10" />
              <p className="font-normal text-sm text-crimson-600 uppercase">
                our history
              </p>
              <div className="border-t border-crimson-600 w-10" />
            </div>

            <h3 className="!font-bold md:text-4xl text-2xl text-white text-center">
              A Legacy of Excellence
            </h3>
          </div>

          <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col w-full gap-12">
              <div className="flex lg:flex-row flex-col lg:gap-0 gap-6 bg-burgundy-700 rounded-2xl">
                <div className="flex flex-col gap-6 lg:w-1/2 w-full lg:py-6 py-6 lg:px-12 px-6">
                  <div className="flex flex-col">
                    <h4 className="!font-extrabold text-3xl text-crimson-600/20">
                      1984
                    </h4>
                    <h4 className="!font-extrabold md:text-3xl text-2xl text-white -mt-2">
                      The Beginning
                    </h4>
                  </div>
                  <p className="font-normal lg:text-sm text-xs text-white">
                    What began in 1984 as a modest passion project quickly
                    evolved into a lifelong calling. In a small, bustling
                    kitchen driven by curiosity rather than convention, our
                    founders explored the power of honest ingredients and
                    time-honored techniques. Every dish was an experiment, every
                    mistake a lesson. These early years shaped our philosophy:
                    respect the ingredient, trust the process, and allow
                    imperfection to guide creativity.
                  </p>
                </div>

                <div className="lg:w-1/2 w-full">
                  <div className="relative w-full lg:h-full h-[200px] lg:aspect-auto">
                    <Image
                      src="/old-shop.jpg"
                      alt="old-shop"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover rounded-2xl lg:rounded-tl-none lg:rounded-bl-none rounded-tr-none rounded-tl-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-row-reverse flex-col lg:gap-0 gap-6 bg-burgundy-700 rounded-2xl">
                <div className="flex flex-col gap-6 lg:w-1/2 w-full py-6 lg:px-12 px-6">
                  <div className="flex flex-col">
                    <h4 className="!font-extrabold text-3xl text-crimson-600/20">
                      2023
                    </h4>
                    <h4 className="!font-extrabold md:text-3xl text-2xl text-white -mt-2">
                      Reinvention
                    </h4>
                  </div>
                  <p className="font-normal lg:text-sm text-xs text-white">
                    In 2023, we entered a new chapter—one of renewal rather than
                    reinvention. The reinvention honored our roots while
                    embracing modern refinement, reshaping the space to reflect
                    how far we had come. Thoughtful design, improved flow, and
                    elevated techniques allowed our kitchen to evolve without
                    losing its soul. This transformation wasn&apos;t about
                    change for its own sake, but about creating a space where
                    tradition and innovation coexist effortlessly. Today, the
                    same spirit that ignited our journey continues to guide us
                    forward, stronger and more intentional than ever.
                  </p>
                </div>

                <div className="lg:w-1/2 w-full">
                  <div className="relative w-full lg:h-full h-[200px] lg:aspect-auto">
                    <Image
                      src="/new-shop.jpg"
                      alt="new-shop"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover rounded-2xl lg:rounded-tl-none lg:rounded-bl-none rounded-tr-none rounded-tl-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PaddingContainer>
    </PageContainer>
  );
}
