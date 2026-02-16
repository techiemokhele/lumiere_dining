"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  ShoppingBag,
  CreditCard,
  Star,
  Headphones,
  LogOut,
  LoaderCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";

const accountLinks = [
  { label: "My Profile", href: "/my-account", icon: User },
  { label: "Order History", href: "/my-account/orders", icon: ShoppingBag },
  { label: "Payment Method", href: "/my-account/payment", icon: CreditCard },
  { label: "Ratings & Reviews", href: "/my-account/reviews", icon: Star },
  { label: "Contact Support", href: "/contact-us", icon: Headphones },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <PageContainer showNavigation={true} showFooter={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoaderCircle className="animate-spin h-8 w-8 text-crimson-500" />
        </div>
      </PageContainer>
    );
  }

  if (!session) return null;

  const isActive = (href: string) => {
    if (href === "/my-account") return pathname === "/my-account";
    return pathname.startsWith(href);
  };

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <PaddingContainer size="small" className="w-full">
        <div className="flex flex-col lg:flex-row w-full gap-8 py-10 lg:mt-0 -mt-12 pt-20 lg:pt-24 min-h-[70vh]">
          <aside className="lg:w-64 w-full shrink-0">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div className="flex flex-row items-center gap-3 p-4 rounded-2xl bg-burgundy-800">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-burgundy-700 flex items-center justify-center shrink-0">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Profile"}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <User size={24} className="text-white-60" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="font-bold text-sm text-white truncate">
                    {session.user?.name}
                  </p>
                  <p className="text-xxs text-white-60 truncate">
                    {session.user?.email}
                  </p>
                </div>
              </div>

              <nav className="flex lg:flex-col flex-row gap-1 overflow-x-auto scrollbar-hide lg:overflow-visible">
                {accountLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex flex-row items-center gap-3 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-colors",
                        active
                          ? "bg-crimson-600 text-white"
                          : "text-white-60 hover:bg-burgundy-800 hover:text-white",
                      )}
                    >
                      <Icon size={16} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <Separator className="bg-burgundy-700 hidden lg:block" />

              <div className="hidden lg:flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full border-burgundy-700 text-white-60 hover:text-white hover:bg-burgundy-800 gap-2 justify-start"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </Button>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
