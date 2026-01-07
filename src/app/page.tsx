"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Button } from "@/components/ui/button";
import { philosophyImageData } from "@/data/landingPhilosophyData";
import { signatureOfferingsData } from "@/data/signatureOfferingData";

export default function LandingPage() {
  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="flex-col lg:gap-24 gap-16 lg:mt-0 -mt-14"
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

      <PaddingContainer size="large">
        <section className="flex flex-col w-full justify-center items-center gap-8 py-16">
          <Quote size={24} className="fill-crimson-600 stroke-crimson-600" />

          <p className="!font-semibold lg:text-4xl text-3xl text-white italic text-center w-full lg:max-w-2xl">
            &ldquo;A dining experience that transcends the ordinary, where every
            bite is a revelation of flavor.&rdquo;
          </p>

          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-white-60 stroke-white-60"
                />
              ))}
            </div>
            <p className="!font-bold text-xs text-white uppercase">
              Michelin Guide 2024
            </p>
          </div>
        </section>
      </PaddingContainer>

      <PaddingContainer
        size="small"
        className="w-full xl:max-w-screen-lg lg:max-w-screen-md max-w-screen-lg bg-burgundy-900 lg:py-10 py-12 rounded-2xl"
      >
        <section className="flex flex-col w-full lg:gap-10 gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="!font-extrabold lg:text-4xl text-3xl text-white">
              Signature Offerings
            </h2>
            <div className="flex lg:flex-row flex-col lg:justify-between justify-start lg:items-center items-start lg:gap-0 gap-2">
              <p className="font-normal lg:text-sm text-xs text-white">
                Curated experience for the discerning palate.
              </p>
              <Link href="/menu">
                <Button
                  asChild
                  variant="link"
                  className="p-0 hover:no-underline"
                >
                  <span className="uppercase text-crimson-600">
                    View Full Menu
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {signatureOfferingsData.map((offering) => (
              <Link
                key={offering.id}
                href={offering.link}
                className="group relative overflow-hidden rounded-lg bg-black/20 transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="relative xl:h-[460px] lg:h-[400px] h-[580px] w-full overflow-hidden">
                  <Image
                    src={offering.image}
                    alt={offering.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 xl:p-6 lg:p-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white font-bold xl:text-xl lg:text-lg text-xl">
                        {offering.title}
                      </h3>
                      <p className="text-white/80 xl:text-sm text-xs">
                        {offering.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </PaddingContainer>
    </PageContainer>
  );
}
