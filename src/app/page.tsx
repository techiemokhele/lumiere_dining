"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { PageContainer } from "@/components/structure/PageContainer";
import { Separator } from "@/components/ui/separator";
import { LandingPageMenuCard } from "@/components/LandingPageMenuCard";
import { SectionTitleComponent } from "@/components/SectionTitleComponent";
import { landingMenuData } from "@/data/landingMenuData";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("starters");

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
  }, []);

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <div
        className={cn(
          `sticky top-0 z-10 transition-colors duration-300 pb-4`,
          activeSection === "starters" ? "bg-transparent" : "bg-burgundy-700"
        )}
      >
        <div className="flex flex-row justify-center items-center gap-6 pt-4">
          {landingMenuData.map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "font-sans text-sm lg:text-lg transition-all",
                "text-white/80 hover:text-white",
                activeSection === section.id && "font-semibold text-white"
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
              ref={sectionRefs[section.id as keyof typeof sectionRefs]}
              className="flex flex-col gap-6 scroll-mt-16"
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
