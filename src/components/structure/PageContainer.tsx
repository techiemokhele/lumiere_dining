import { NavComponent } from "../layout/NavComponent";
import { FooterComponent } from "../layout/FooterComponent";

interface PageProps {
  children: React.ReactNode;
  showNavigation: boolean;
  showFooter: boolean;
}

export function PageContainer({
  children,
  showNavigation,
  showFooter,
}: PageProps) {
  return (
    <main>
      {showNavigation && <NavComponent />}
      {children}
      {showFooter && <FooterComponent />}
    </main>
  );
}
