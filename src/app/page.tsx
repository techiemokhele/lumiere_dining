"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";
import { philosophyImageData } from "@/data/landingPhilosophyData";

export default function LandingPage() {
  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="flex-col gap-14 lg:mt-0 -mt-14"
    >
      <section
        className="flex flex-col h-[100vh] w-full items-center justify-center bg-cover bg-center gap-8 lg:px-0 px-6 lg:-mt-[52px] -mt-12"
        style={{ backgroundImage: `url(/light-decoration.jpg)` }}
      >
        <h1 className="lg:font-extrabold md:font-extrabold font-bold md:text-5xl text-4xl text-white text-center">
          Taste the Exceptional
        </h1>
        <p className="font-normal text-sm text-white text-center">
          Experience a symphony of flavors crafted by Chef Antonie in an
          atmosphere of timeless elegance.
        </p>

        <div className="flex md:flex-row flex-col gap-4">
          <Button variant="default" size="lg" className="w-40">
            <span className="font-normal text-sm text-white">View Menus</span>
          </Button>

          <Button variant="outline" size="lg" className="w-40">
            <span className="font-normal text-sm text-white">
              Explore Wines
            </span>
          </Button>
        </div>
      </section>

      <PaddingContainer size="large">
        <section className="flex lg:flex-row flex-col w-full lg:gap-12 gap-8">
          <div className="flex flex-1 flex-col lg:w-1/2 w-full gap-6 justify-center items-center">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-4 font-normal text-xxs text-crimson-600 uppercase">
                <span className="w-16 border-t border-crimson-600"></span> the
                culinary experience
              </p>

              <h2 className="!font-extrabold lg:text-4xl text-3xl text-white">
                Rooted in tradition, inspired by innovation.
              </h2>
            </div>

            <p className="font-normal lg:text-sm text-xs text-white">
              We source the finest local ingredients to create dishes that tell
              a story of the land and the season. Every plate is a testament to
              our commitment to sustainability and culinary excellence.
            </p>

            <Button
              variant="link"
              className="self-start p-0 items-center flex flex-row gap-2 hover:no-underline"
            >
              <span className="text-left">Order Our Finest Dishes</span>
              <ArrowRight size={18} className="text-crimson-600" />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:w-1/2 w-full gap-4">
            {philosophyImageData.map((image) => (
              <div
                key={image.id}
                className={`relative overflow-hidden rounded-lg group cursor-pointer h-56 ${
                  image.span || "col-span-1"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 lg:p-6 p-3 lg:translate-y-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-white font-bold lg:text-xl text-md mb-1">
                    {image.title}
                  </h3>
                  <p className="text-white/90 lg:text-sm text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PaddingContainer>
    </PageContainer>
  );
}
