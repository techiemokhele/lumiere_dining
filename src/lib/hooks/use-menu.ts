import { useEffect, useState } from "react";
import type { MenuSection } from "@/data/landingMenuData";

export function useMenu() {
  const [menuData, setMenuData] = useState<MenuSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      });
  }, []);

  return { menuData, loading };
}
