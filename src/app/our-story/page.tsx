"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Calendar,
  SquareMenu,
  UtensilsCrossed,
} from "lucide-react";
import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";
import { foodSupplyData } from "@/data/foodSupplyData";

export default function OurStoryPage() {
  const experienceRef = useRef<HTMLElement>(null);

  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="overflow-x-clip flex flex-col"
    >
      <div className="lg:-mt-[52px] -mt-[48px] w-full">
        <HeaderComponent
          onClick={() =>
            experienceRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          image="/story-header.jpg"
          badgeText="Since 1984"
          addBadgeBorder={false}
          title="A Symphony of Taste"
          description="Where culinary meets great innovation. Step into a world where every dish tells a story."
        />
      </div>

      <section
        ref={experienceRef}
        className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex lg:flex-row flex-col gap-12 items-center">
            <div className="flex flex-col gap-6 lg:w-2/3 w-full">
              <p className="flex items-center gap-4 font-normal text-xxs text-crimson-600 uppercase tracking-widest">
                <span className="w-12 border-t border-crimson-600" />
                the culinary experience
              </p>

              <div className="flex flex-col w-full">
                <h1 className="!font-extrabold md:text-6xl text-3xl text-white">
                  Rooted in tradition,
                </h1>
                <h2 className="font-normal md:text-6xl text-3xl text-white/60 italic lg:-mt-4 -mt-1">
                  Daring in Execution
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-normal md:text-sm text-xs text-white/90">
                  We believe in the purity of flaws. Our kitchen merges ancient
                  culinary techniques with modern flair to create a dining
                  experience that transcends the ordinary.
                </p>
                <p className="font-normal md:text-sm text-xs text-white/90">
                  Every plate is a canvas, and every ingredient is a color. We
                  strive not just to feed the belly, but to spark a memory, to
                  evolve in a world of culinary possibilities and artistry,
                  which is the essence of our culinary journey.
                </p>
              </div>

              <Button
                variant="link"
                asChild
                className="self-start p-0 items-center flex flex-row gap-2 hover:no-underline"
              >
                <Link href="/menu">
                  <span className="text-left">Order Our Finest Dishes</span>
                  <ArrowRight size={18} className="text-crimson-600" />
                </Link>
              </Button>
            </div>

            <div className="lg:w-1/2 w-full flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-[4/5] rounded-2xl bg-burgundy-900 p-3 rotate-2 flex items-center justify-center">
                <Image
                  src="/tradition-story.jpg"
                  alt="Rooted in tradition"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 500px"
                  className="object-cover rounded-2xl -rotate-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24 bg-burgundy-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col w-full py-10 lg:py-12 lg:px-10 px-6 rounded-2xl bg-burgundy-900 border border-burgundy-700/40">
            <div className="flex md:flex-row flex-col-reverse gap-10 lg:gap-12 items-center justify-center">
              <div className="relative w-full md:w-1/2 max-w-sm sm:max-w-sm lg:max-w-md aspect-[3/4]">
                <Image
                  src="/chef-antonie.jpg"
                  alt="Chef Antonie"
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
                  <p className="font-normal text-xxs text-crimson-600 uppercase tracking-widest">
                    executive chef
                  </p>
                  <h3 className="!font-extrabold md:text-4xl text-2xl text-white">
                    Meet Chef Antonie
                  </h3>
                </div>

                <div className="flex flex-row gap-4">
                  <div className="border-l-[3px] border-crimson-600 shrink-0" />
                  <p className="lg:text-lg text-md text-white/60 italic">
                    &ldquo;Food is memory. I cook to create moments that linger
                    forever in the heart and palate.&rdquo;
                  </p>
                </div>

                <p className="font-normal lg:text-sm text-xs text-white/90 leading-relaxed">
                  Cooking, to me, is memory made tangible. Every dish I create
                  begins with respect for tradition—the hands that taught me,
                  the fire that shaped me, the imperfections that give food its
                  soul. In my kitchen, ancient techniques meet fearless
                  experimentation, where restraint is as powerful as excess. I
                  cook not to impress, but to connect: to stir emotion, awaken
                  nostalgia, and invite curiosity. Each plate is a quiet
                  conversation between past and present, between discipline and
                  instinct.
                </p>

                <div className="flex flex-row gap-6">
                  <div className="flex flex-col gap-1">
                    <p className="!font-extrabold text-2xl text-white">23</p>
                    <p className="!font-normal lg:text-xs text-xxs text-white/60 uppercase">
                      Years of Experience
                    </p>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div className="flex flex-col gap-1">
                    <p className="!font-extrabold text-2xl text-white">20+</p>
                    <p className="!font-normal lg:text-xs text-xxs text-white/60 uppercase">
                      Team Members
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 items-center">
          <div className="flex flex-col gap-3 items-center text-center max-w-2xl">
            <h3 className="!font-extrabold md:text-4xl text-3xl text-white">
              Uncompromising Quality
            </h3>
            <p className="font-normal md:text-sm text-xs text-white/60">
              We source directly from our farmers to ensure the freshest
              ingredients for our customers who share our passion for culinary
              excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full md:hidden">
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
                <div className="absolute bottom-6 left-5">
                  <p className="text-white font-bold text-sm tracking-wide drop-shadow-md">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="hidden md:grid w-full gap-4"
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
                className="group relative rounded-2xl overflow-hidden border border-burgundy-700/30"
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
                <div className="absolute bottom-6 left-5">
                  <p className="text-white font-bold text-sm tracking-wide drop-shadow-md">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24 bg-burgundy-900/50">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-3 items-center text-center">
            <div className="flex flex-row gap-3 items-center">
              <span className="w-8 border-t border-crimson-600" />
              <p className="font-normal text-xxs text-crimson-600 uppercase tracking-widest">
                our history
              </p>
              <span className="w-8 border-t border-crimson-600" />
            </div>
            <h3 className="!font-extrabold md:text-4xl text-2xl text-white">
              A Legacy of Excellence
            </h3>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex lg:flex-row flex-col rounded-2xl overflow-hidden bg-burgundy-800 border border-burgundy-700/40">
              <div className="flex flex-col gap-6 lg:w-1/2 w-full p-6 lg:p-10 justify-center">
                <div className="flex flex-col">
                  <span className="!font-extrabold text-4xl text-crimson-600/20 leading-none">
                    1984
                  </span>
                  <h4 className="!font-extrabold md:text-3xl text-2xl text-white -mt-1">
                    The Beginning
                  </h4>
                </div>
                <p className="font-normal lg:text-sm text-xs text-white/80 leading-relaxed">
                  What began in 1984 as a modest passion project quickly evolved
                  into a lifelong calling. In a small, bustling kitchen driven
                  by curiosity rather than convention, our founders explored the
                  power of honest ingredients and time-honored techniques. Every
                  dish was an experiment, every mistake a lesson. These early
                  years shaped our philosophy: respect the ingredient, trust the
                  process, and allow imperfection to guide creativity.
                </p>
              </div>
              <div className="lg:w-1/2 w-full relative h-56 lg:h-auto min-h-[220px]">
                <Image
                  src="/old-shop.jpg"
                  alt="The original shop in 1984"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex lg:flex-row-reverse flex-col rounded-2xl overflow-hidden bg-burgundy-800 border border-burgundy-700/40">
              <div className="flex flex-col gap-6 lg:w-1/2 w-full p-6 lg:p-10 justify-center">
                <div className="flex flex-col">
                  <span className="!font-extrabold text-4xl text-crimson-600/20 leading-none">
                    2023
                  </span>
                  <h4 className="!font-extrabold md:text-3xl text-2xl text-white -mt-1">
                    Reinvention
                  </h4>
                </div>
                <p className="font-normal lg:text-sm text-xs text-white/80 leading-relaxed">
                  In 2023, we entered a new chapter—one of renewal rather than
                  reinvention. The transformation honored our roots while
                  embracing modern refinement, reshaping the space to reflect
                  how far we had come. Thoughtful design, improved flow, and
                  elevated techniques allowed our kitchen to evolve without
                  losing its soul. This transformation wasn&apos;t about change
                  for its own sake, but about creating a space where tradition
                  and innovation coexist effortlessly. Today, the same spirit
                  that ignited our journey continues to guide us forward,
                  stronger and more intentional than ever.
                </p>
              </div>
              <div className="lg:w-1/2 w-full relative h-56 lg:h-auto min-h-[220px]">
                <Image
                  src="/new-shop.jpg"
                  alt="The reinvented restaurant in 2023"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/light-decoration.jpg"
            alt="Lumière Dining ambiance"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-2xl">
          <h2 className="font-extrabold md:text-5xl text-3xl text-white">
            Taste the Extraordinary
          </h2>
          <p className="font-normal text-sm text-white/80">
            Join us for unforgettable flavours and impeccable service.
          </p>

          <div className="flex md:flex-row flex-col gap-4 mt-2">
            <Button
              variant="default"
              size="lg"
              asChild
              className="rounded-full gap-2"
            >
              <Link href="/reservations">
                <Calendar size={16} />
                <span>Reserve a Table</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full gap-2 border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/menu">
                <SquareMenu size={16} />
                <span>View Menu</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
