"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRightIcon,
  HandPlatter,
  ShoppingBag,
  TextSearchIcon,
  UserCircle,
} from "lucide-react";
import { PaddingContainer } from "../structure/PaddingContainer";
import { cn } from "@/lib/utils";
import { LogoComponent } from "../LogoComponent";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

export function NavComponent() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    } else {
      return pathname.startsWith(path);
    }
  };

  const navLinks = [
    { label: "Menu", href: "/menu" },
    { label: "Reservations", href: "/reservations" },
    { label: "Private Dining", href: "/private-dining" },
    { label: "Our Story", href: "/our-story" },
  ];

  return (
    <PaddingContainer
      className={cn(
        `z-50 sticky lg:top-[51px] top-0 transition-all duration-200 w-full`,
        isScrolled && "lg:bg-transparent bg-burgundy-700/95 pb-4"
      )}
    >
      <div className="lg:hidden w-full flex mt-4">
        <MobileSheet>
          <Link href={"/"} className="block" aria-label="Lumiere Dining home">
            <LogoComponent showText={true} />
          </Link>
        </MobileSheet>
      </div>

      <div className={cn(`w-full hidden lg:block`)}>
        <div className="flex flex-row items-center justify-between px-6 py-2 rounded-full bg-burgundy-700/95 backdrop-blur-md w-full">
          <div className="flex-shrink-0">
            <Link href="/">
              <LogoComponent showText={true} />
            </Link>
          </div>

          <nav
            className="flex-1 flex justify-center"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-2">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "font-serif font-semibold text-sm xl:px-4 lg:px-1 px-4 py-2 text-center relative transition-colors",
                    isActive(href)
                      ? "text-white"
                      : "text-white-80 hover:text-white"
                  )}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  <span>
                    {label}
                    {isActive(href) && (
                      <span className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 h-6 w-auto rounded-t-full opacity-50 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(255,_116,_57,_0.3)_0%,_#ff7439_0%,_rgba(255,_116,_57,_0)_58%)]" />
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="default">
              <span>Book a Table</span>
            </Button>
            <Button variant="link" size="icon" className="p-0">
              <ShoppingBag size={24} className="text-white" />
            </Button>
            <Button variant="link" size="icon" className="p-0">
              <UserCircle size={24} className="text-white" />
            </Button>
          </div>
        </div>
      </div>
    </PaddingContainer>
  );
}

function MobileSheet({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const navLinks = [
    { label: "Menu", href: "/menu" },
    { label: "Reservations", href: "/reservations" },
    { label: "Private Dining", href: "/private-dining" },
    { label: "Our Story", href: "/our-story" },
  ];

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
  };

  const showCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <div className="flex justify-between w-full mx-auto xl:max-w-none">
        <div className="flex justify-center pt-2">{children}</div>
        <SheetTrigger asChild className="hover:cursor-pointer flex-none pt-2">
          <button aria-label="Open search menu">
            <TextSearchIcon
              size={24}
              className="stroke-crimson-500"
              aria-hidden="true"
            />
          </button>
        </SheetTrigger>
      </div>

      <SheetContent>
        <SheetHeader className="pb-11">
          <Link href="/" className="w-full">
            <LogoComponent showText={true} />
          </Link>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Lumiere Dining
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Main navigation">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4 pt-6">
              {navLinks.map((link) => (
                <Button asChild key={link.label} variant="link">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex justify-between font-serif font-extrabold lg:text-2xl text-xl hover:no-underline !px-0",
                      isActive(link.href)
                        ? "text-primary relative"
                        : "text-white-60"
                    )}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <ChevronRightIcon
                      className={isActive(link.href) ? "stroke-primary" : ""}
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              ))}
            </div>
            <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center gap-3 px-6">
              <Button variant="default" className="w-full">
                <ShoppingBag size={24} className="text-white" />
                <span>Your Cart</span>
              </Button>
              <Button variant="default" className="w-full">
                <HandPlatter size={24} className="text-white" />
                <span>Book a Table</span>
              </Button>
              <Button variant="default" className="w-full">
                <UserCircle size={24} className="text-white" />
                <span>My Account</span>
              </Button>

              <p className="font-serif font-normal xl:text-sm text-xxs text-white-60">
                &copy; {showCurrentYear()} Lumiere Dining. All rights reserved.
              </p>
            </div>
          </div>
        </nav>

        <figure className="absolute -right-72 -z-10 top-80" aria-hidden="true">
          <LogoComponent showText={true} />
        </figure>
      </SheetContent>
    </Sheet>
  );
}
