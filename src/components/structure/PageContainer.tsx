import { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { NavComponent } from "../layout/NavComponent";
import { FooterComponent } from "../layout/FooterComponent";
import { CookieConsentComponent } from "../CookieConsentComponent";

interface PageProps {
  children: React.ReactNode;
  showNavigation: boolean;
  showFooter: boolean;
  className?: string;
  style?: CSSProperties;
}

export function PageContainer({
  children,
  showNavigation,
  showFooter,
  className,
  style,
}: PageProps) {
  return (
    <main className={cn(`flex flex-col items-center`, className)} style={style}>
      {showNavigation && <NavComponent />}
      {children}
      {showFooter && <FooterComponent />}
      <CookieConsentComponent />
    </main>
  );
}
