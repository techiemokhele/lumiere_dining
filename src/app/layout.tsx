import type { Metadata } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/inter";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import SessionProvider from "@/common/SessionProvider";
import ScrollToTopComponent from "@/components/ScrollToTopComponent";

export const metadata: Metadata = {
  title: "Lumière Dining",
  description: "An extraordinary fine dining experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="font-serif antialiased bg-background text-foreground"
        suppressHydrationWarning={true}
      >
        <SessionProvider>
          <CartProvider>{children}</CartProvider>
        </SessionProvider>
        <Toaster />
        <ScrollToTopComponent />
      </body>
    </html>
  );
}
