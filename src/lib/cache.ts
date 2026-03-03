import { unstable_cache } from "next/cache";
import { connectDB } from "@/config/mongodb";
import { MenuSection } from "@/models/ecommerce/MenuSection";
import { ShopCategory } from "@/models/ecommerce/ShopCategory";

export const getCachedMenuData = unstable_cache(
  async () => {
    await connectDB();
    const sections = await MenuSection.find({}).lean();
    return JSON.parse(JSON.stringify(sections));
  },
  ["menu-data"],
  {
    revalidate: 3600,
    tags: ["menu"],
  },
);

export const getCachedShopData = unstable_cache(
  async () => {
    await connectDB();
    const data = await ShopCategory.find({}).lean();
    return JSON.parse(JSON.stringify(data));
  },
  ["shop-data"],
  {
    revalidate: 3600,
    tags: ["shop"],
  },
);
