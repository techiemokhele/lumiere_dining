"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useActivePath = () => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  const isActive = (path: string) => {
    if (!mounted) return false;
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return { isActive };
};
