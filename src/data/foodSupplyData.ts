interface FoodSupplyItem {
  image: string;
  title: string;
  gridArea: string;
}

export const foodSupplyData: FoodSupplyItem[] = [
  {
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80",
    title: "Local Produce",
    gridArea: "local",
  },
  {
    image: "https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?q=80",
    title: "Sustainable Seafood",
    gridArea: "seafood",
  },
  {
    image: "https://images.unsplash.com/photo-1632154023554-c2975e9be348?q=80",
    title: "Premium Cuts",
    gridArea: "cuts",
  },
  {
    image: "https://images.unsplash.com/photo-1724882207681-9e7e8c3dd45c?q=80",
    title: "Curated Cellar",
    gridArea: "cellar",
  },
];
