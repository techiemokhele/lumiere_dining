"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopComponent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/auth")) return null;
  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-crimson text-white shadow-lg hover:bg-crimson-600 transition-all duration-300"
    >
      <ChevronUp size={22} />
    </button>
  );
}
