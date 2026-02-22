interface ShopProduct {
  id: string;
  name: string;
  price: number;
  excerpt: string;
  description: string;
  tags: string[];
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  details: string[];
  careInstructions: string;
  relatedProducts: string[];
}

interface ShopCategory {
  id: string;
  title: string;
  description: string;
  items: ShopProduct[];
}

export type { ShopProduct, ShopCategory };
