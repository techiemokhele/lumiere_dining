"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  HandPlatter,
  ShoppingBag,
  TextSearchIcon,
  UserCircle,
  LogOut,
  LogIn,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useActivePath } from "@/lib/hooks/use-active-path";
import { PaddingContainer } from "../structure/PaddingContainer";
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
import { UserAvatar } from "../UserAvatar";

export function NavComponent() {
  const { isActive } = useActivePath();
  const { totalItems } = useCart();
  const { data: session, status } = useSession();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Our Story", href: "/our-story" },
    { label: "Gallery", href: "/gallery" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Contact", href: "/contact-us" },
  ];

  const accountHref =
    status === "authenticated" ? "/my-account" : "/auth/sign-in";

  return (
    <PaddingContainer
      className={cn(
        `z-50 sticky lg:top-[51px] top-0 transition-all duration-200 w-full`,
        isScrolled && "lg:bg-transparent bg-burgundy-700/95 pb-4",
      )}
    >
      <div className="lg:hidden w-full flex mt-4">
        <MobileSheet>
          <Link href={"/"} className="block" aria-label="Lumière Dining home">
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
                    "font-semibold text-sm xl:px-4 lg:px-1 px-4 py-2 text-center relative transition-colors",
                    isActive(href)
                      ? "text-primary hover:text-primary"
                      : "text-white-80 hover:text-primary",
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
            <Button asChild variant="default">
              <Link href="/reservations">Book a Table</Link>
            </Button>
            <Link href="/my-cart" className="relative">
              <Button variant="link" size="icon" className="p-0">
                <ShoppingBag size={24} className="text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-crimson-500 text-white text-xxs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link href={accountHref}>
              <Button variant="link" size="icon" className="p-0">
                {session?.user?.image ? (
                  <div className="ring-2 ring-crimson-500 rounded-full">
                    <UserAvatar
                      src={session.user.image}
                      alt="Profile"
                      size={28}
                    />
                  </div>
                ) : (
                  <UserCircle size={24} className="text-white" />
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PaddingContainer>
  );
}

function MobileSheet({ children }: { children: React.ReactNode }) {
  const { isActive } = useActivePath();
  const { totalItems } = useCart();
  const { data: session, status } = useSession();

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isLegalOpen, setIsLegalOpen] = useState<boolean>(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Our Story", href: "/our-story" },
    { label: "Gallery", href: "/gallery" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Contact", href: "/contact-us" },
  ];

  const legalLinks = [
    { label: "Cancellation Policy", href: "/legal/cancellation-policy" },
    { label: "Refund Policy", href: "/legal/refund-policy" },
    { label: "Cookie Policy", href: "/legal/cookie-policy" },
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
  ];

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
  };

  const showCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  const accountHref =
    status === "authenticated" ? "/my-account" : "/auth/sign-in";

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
            Lumière Dining
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Main navigation">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4 -mt-6">
              {navLinks.map((link) => (
                <Button asChild key={link.label} variant="link">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex justify-between font-extrabold lg:text-2xl text-xl hover:no-underline !px-0",
                      isActive(link.href)
                        ? "text-primary relative"
                        : "text-white-60",
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

              <div className="flex flex-col">
                <Button
                  variant="link"
                  className="flex justify-between font-extrabold lg:text-2xl text-xl hover:no-underline !px-0 text-white-60"
                  onClick={() => setIsLegalOpen(!isLegalOpen)}
                >
                  <span>Legal</span>
                  <ChevronDownIcon
                    className={cn(
                      "transition-transform duration-200",
                      isLegalOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </Button>
                <div
                  className={cn(
                    "flex flex-col gap-1 overflow-hidden transition-all duration-200",
                    isLegalOpen
                      ? "max-h-56 opacity-100 pt-2"
                      : "max-h-0 opacity-0",
                  )}
                >
                  {legalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "font-medium text-base pl-2 py-1 transition-colors",
                        isActive(link.href)
                          ? "text-primary"
                          : "text-white-60 hover:text-white",
                      )}
                      aria-current={isActive(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center gap-3 px-6">
              {session?.user && (
                <div className="flex flex-row items-center justify-between w-full px-2 mb-1">
                  <div className="flex flex-row items-center gap-2">
                    {session.user.image ? (
                      <UserAvatar
                        src={session.user.image}
                        alt="Profile"
                        size={28}
                      />
                    ) : (
                      <UserCircle size={20} className="text-white-60" />
                    )}
                    <span className="text-xs text-white truncate max-w-[140px]">
                      {session.user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex flex-row items-center gap-1 text-xxs text-crimson-500 hover:text-crimson-600 transition-colors"
                  >
                    <LogOut size={12} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}

              <div className="flex flex-row gap-6 w-full">
                <Button asChild variant="default" className="w-full">
                  <Link href="/my-cart" className="relative">
                    <Button variant="link" size="icon" className="p-0">
                      <ShoppingBag size={24} className="text-white" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-burgundy-700 text-white text-xxs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </Link>
                </Button>
                <Button asChild variant="default" className="w-full">
                  <Link href="/reservations">
                    <HandPlatter size={24} className="text-white" />
                  </Link>
                </Button>
                <Button asChild variant="default" className="w-full">
                  <Link href={accountHref}>
                    {status === "authenticated" ? (
                      <UserCircle size={24} className="text-white" />
                    ) : (
                      <LogIn size={24} className="text-white" />
                    )}
                  </Link>
                </Button>
              </div>

              <p className="font-normal xl:text-sm text-xxs text-white-60">
                &copy; {showCurrentYear()} Lumière Dining. All rights reserved.
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
