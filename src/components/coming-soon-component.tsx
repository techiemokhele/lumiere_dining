"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoComponent } from "./LogoComponent";
import { PageContainer } from "./structure/PageContainer";
import {
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Image from "next/image";

export function ComingSoonComponent() {
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
    <PageContainer showFooter={false} showNavigation={false} className="!p-0">
      <div className="relative flex flex-col w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        />

        <div className="relative flex justify-between items-center px-8 py-4 bg-black/50 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2 text-white lg:text-sm !text-xs">
            <Phone size={16} />
            <span>+27 555 511 2233</span>
          </div>
          <div className="flex items-center gap-2 text-white lg:text-sm !text-xs">
            <MapPin size={16} />
            <span>Cape Town, Western Cape</span>
          </div>
        </div>

        <div className="relative flex lg:flex-row flex-col flex-1 rounded-3xl overflow-hidden m-4 z-10">
          <div className="relative lg:w-1/2 w-full flex flex-col items-center justify-center p-12 backdrop-blur-xl bg-black/60">
            <div className="relative z-10 flex flex-col items-center gap-8 text-center">
              <h2 className="font-serif xl:text-6xl lg:text-4xl text-3xl text-white tracking-wider">
                Coming soon
              </h2>

              <div className="flex flex-col items-center gap-6">
                <LogoComponent showText={true} />
              </div>

              <p className="font-serif text-white xl:text-lg lg:text-sm text-xs max-w-md">
                The best of fine dining coming soon to Cape Town, South Africa.
              </p>

              <div className="flex gap-6 mt-4">
                <Link
                  href="#"
                  className="text-white hover:text-crimson-500 transition-colors"
                >
                  <Facebook size={24} />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-crimson-500 transition-colors"
                >
                  <Instagram size={24} />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-crimson-500 transition-colors"
                >
                  <Twitter size={24} />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative lg:w-1/2 w-full flex flex-col">
            <div className="relative flex-1 w-full h-full">
              <button
                onClick={prevImage}
                className="absolute lg:left-4 left-0 lg:top-1/2 top-16 -translate-y-1/2 bg-white/40 hover:bg-white/40 backdrop-blur-sm lg:p-3 p-1 rounded-full transition-colors z-10 border-white-60 border"
              >
                <ChevronLeft size={32} className="text-crimson-500" />
              </button>
              <button
                onClick={nextImage}
                className="absolute lg:right-4 right-0 lg:top-1/2 top-16 -translate-y-1/2 bg-white/40 hover:bg-white/40 backdrop-blur-sm lg:p-3 p-1 rounded-full transition-colors z-10 border-white-60 border"
              >
                <ChevronRight size={32} className="text-crimson-500" />
              </button>
            </div>

            <div className="flex absolute lg:bottom-4 bottom-0 left-1/2 -translate-x-1/2 gap-2 lg:gap-4 p-4 lg:p-6 bg-black/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-t-2xl lg:rounded-none w-full lg:w-auto justify-center">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative lg:w-32 w-16 xl:h-24 lg:h-16 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImage === index
                      ? "border-crimson-500 scale-105"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    unoptimized
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    sizes="128px"
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
