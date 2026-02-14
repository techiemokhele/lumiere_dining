"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LogoComponent } from "./LogoComponent";
import { PageContainer } from "./structure/PageContainer";
import { Button } from "./ui/button";

export function EmptyCartComponent() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/coming-soon-1.jpg",
    "/coming-soon-2.jpg",
    "/coming-soon-3.jpg",
    "/coming-soon-4.jpg",
    "/coming-soon-5.jpg",
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <PageContainer showFooter={true} showNavigation={true} className="!p-0">
      <div className="relative flex flex-col w-full h-screen overflow-hidden bg-black lg:-mt-[52px] -mt-12">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentImage === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            style={{ zIndex: currentImage === index ? 1 : 0 }}
          >
            <Image
              src={img}
              alt={`Background ${index + 1}`}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="relative flex lg:flex-row flex-col flex-1 rounded-3xl overflow-hidden m-4 z-10">
          <div className="relative lg:w-1/2 w-full flex flex-col items-center justify-center p-12 lg:mt-0 mt-20 backdrop-blur-xl bg-black/60">
            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <h2 className="font-serif xl:text-6xl lg:text-4xl text-3xl text-white tracking-wider">
                Your Cart is Empty
              </h2>

              <Link href="/" className="flex flex-col items-center gap-6">
                <LogoComponent showText={true} />
              </Link>

              <p className="font-serif text-white xl:text-lg lg:text-sm text-xs max-w-md">
                Your cart is currently empty. Explore our menu and discover
                exceptional dishes crafted to elevate your dining experience.
              </p>

              <Button
                asChild
                size="lg"
                className="mt-4 bg-crimson-500 hover:bg-crimson-600 text-white rounded-full px-8"
              >
                <Link href="/menu">Browse Menu</Link>
              </Button>
            </div>
          </div>

          <div className="relative lg:w-1/2 w-full flex flex-col">
            <div className="relative flex-1 w-full h-full">
              <button
                onClick={prevImage}
                className="absolute lg:left-4 left-0 lg:top-1/2 top-16 -translate-y-1/2 bg-white/40 hover:bg-white/60 backdrop-blur-sm lg:p-3 p-1 rounded-full transition-colors z-10 border-white-60 border"
              >
                <ChevronLeft size={32} className="text-crimson-500" />
              </button>
              <button
                onClick={nextImage}
                className="absolute lg:right-4 right-0 lg:top-1/2 top-16 -translate-y-1/2 bg-white/40 hover:bg-white/60 backdrop-blur-sm lg:p-3 p-1 rounded-full transition-colors z-10 border-white-60 border"
              >
                <ChevronRight size={32} className="text-crimson-500" />
              </button>
            </div>

            <div className="flex absolute lg:bottom-4 bottom-0 left-1/2 -translate-x-1/2 gap-2 lg:gap-4 p-4 lg:p-6 bg-black/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-t-2xl lg:rounded-none w-full lg:w-auto justify-center">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative xl:w-24 lg:w-20 w-16 xl:h-24 lg:h-16 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImage === index
                      ? "border-crimson-500 scale-105"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 64px, 128px"
                    quality={60}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
