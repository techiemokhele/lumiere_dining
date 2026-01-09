export interface PhilosophyImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  span?: "col-span-2" | "col-span-1";
}

export const philosophyImageData: PhilosophyImage[] = [
  {
    id: 1,
    src: "/culinary-heritage.jpg",
    alt: "Chef drizzling sauce over a plated dish",
    title: "Culinary Heritage",
    subtitle: "Respecting classic methods.",
    span: "col-span-2",
  },
  {
    id: 2,
    src: "/fresh-ingredients.jpg",
    alt: "Fresh vegetables in wooden crate",
    title: "Fresh Ingredients",
    subtitle: "Sourced from local farms.",
    span: "col-span-1",
  },
  {
    id: 3,
    src: "/artisan-plating.jpg",
    alt: "Beautifully plated dessert dish",
    title: "Artisan Plating",
    subtitle: "Every detail matters.",
    span: "col-span-1",
  },
];
