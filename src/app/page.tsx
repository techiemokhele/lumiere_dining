"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { LandingPageMenuCard } from "@/components/LandingPageMenuCard";
import { SectionTitleComponent } from "@/components/SectionTitleComponent";
import { landingMenuData } from "@/data/landingMenuData";
import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("starters");
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);

  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    starters: useRef<HTMLDivElement>(null),
    mains: useRef<HTMLDivElement>(null),
    grill: useRef<HTMLDivElement>(null),
    desserts: useRef<HTMLDivElement>(null),
    wines: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (sectionId: string) => {
    sectionRefs[sectionId as keyof typeof sectionRefs]?.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "start",
      }
    );
  };

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    );

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    return () => headerObserver.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <div ref={headerRef} className="-mt-12 w-full">
        <HeaderComponent
          image="./menu-header.jpg"
          badgeText="Seasonal Tasting Menu"
          addBadgeBorder={true}
          title="A Symphony of Flavors"
          description="Experience the art of fine dining with our seasonal tasting menu, crafted meticulously by Check Antonie using only the finest local ingredients."
          onClick={() => scrollToSection("starters")}
        />
      </div>

      <div
        className={cn(
          `flex flex-col sticky lg:top-[0px] top-12 z-10 transition-colors duration-300 gap-4 w-full`,
          !isHeaderVisible && "bg-burgundy-700/95 backdrop-blur-md shadow-lg"
        )}
      >
        <div className="flex flex-row justify-center items-center gap-6 pt-4">
          {landingMenuData.map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "font-serif text-[10px] md:text-lg transition-all",
                "text-white/80 hover:text-white",
                activeSection === section.id && "!font-extrabold text-white"
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
        <Separator />
      </div>

      <PaddingContainer size="large">
        <div className="flex flex-col w-full gap-16 py-10">
          {landingMenuData.map((section) => (
            <div
              key={section.id}
              id={section.id}
              ref={sectionRefs[section.id as keyof typeof sectionRefs]}
              className="flex flex-col gap-6 scroll-mt-28"
            >
              <SectionTitleComponent
                title={section.title}
                description={section.description}
              />
              <div className="flex flex-col gap-6">
                {section.items.slice(0, 3).map((item, index) => (
                  <LandingPageMenuCard
                    key={index}
                    itemDirection={index % 2 === 0 ? "left" : "right"}
                    {...item}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
