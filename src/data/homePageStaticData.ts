import { ChefHat, GlassWater, UtensilsCrossed, Wine } from "lucide-react";

export const reviews = [
  {
    id: 1,
    name: "Sophie Laurent",
    rating: 5,
    text: "An unforgettable evening. The wagyu ribeye was cooked to absolute perfection, and the wine pairing suggestions from the sommelier were impeccable.",
    date: "Jan 2025",
    dish: "Wagyu Ribeye",
  },
  {
    id: 2,
    name: "Marcus Chen",
    rating: 5,
    text: "Chef Antonie's tasting menu is a masterpiece. Every course told a story. The lobster thermidor was the finest I've had outside of Paris.",
    date: "Dec 2024",
    dish: "Lobster Thermidor",
  },
  {
    id: 3,
    name: "Isabella Rossi",
    rating: 5,
    text: "The ambiance, the service, the food — everything was flawless. The chocolate soufflé alone is worth the visit. We'll be back every anniversary.",
    date: "Nov 2024",
    dish: "Chocolate Soufflé",
  },
  {
    id: 4,
    name: "James Whitfield",
    rating: 4,
    text: "Stunning presentation and bold flavours. The seared scallops were delicate yet rich, and the truffle burrata was heavenly.",
    date: "Oct 2024",
    dish: "Seared Scallops",
  },
];

export const slideshowImages = [
  {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
    alt: "Chef preparing a gourmet dish",
  },
  {
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&q=80",
    alt: "Fine dining plating",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    alt: "Restaurant interior ambiance",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80",
    alt: "Chef at work in the kitchen",
  },
];

export const services = [
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    description:
      "An elevated culinary journey with seasonal tasting menus crafted by Chef Antonie using the finest local ingredients.",
  },
  {
    icon: Wine,
    title: "Wine Cellar",
    description:
      "Over 300 labels from the world's most prestigious vineyards, curated by our head sommelier with expert pairing guidance.",
  },
  {
    icon: ChefHat,
    title: "Private Chef Experience",
    description:
      "Exclusive tableside dining with Chef Antonie for intimate gatherings. A bespoke multi-course menu tailored to your palate.",
  },
  {
    icon: GlassWater,
    title: "Cocktail Lounge",
    description:
      "Handcrafted cocktails and curated spirits in an intimate setting. Perfect for pre-dinner drinks or a nightcap.",
  },
];
