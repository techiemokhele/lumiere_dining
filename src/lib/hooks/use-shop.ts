import { useEffect, useState } from "react";
import type { ShopCategory } from "@/data/shopData";

export function useShop() {
  const [shopData, setShopData] = useState<ShopCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/shop")
      .then((r) => r.json())
      .then((data) => {
        setShopData(data);
        setLoading(false);
      });
  }, []);

  return { shopData, loading };
}
