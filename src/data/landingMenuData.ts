interface MenuItem {
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
  ingredients: string[];
  preparationNotes: string;
  allergies: string[];
  pairings: string[];
}

interface MenuSection {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
}

export type { MenuItem, MenuSection };
