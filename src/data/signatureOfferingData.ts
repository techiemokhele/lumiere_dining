export interface SignatureOffering {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  link: string;
}

export const signatureOfferingsData: SignatureOffering[] = [
  {
    id: 1,
    title: "The Tasting Menu",
    description: "A 7-course journey through the season.",
    image: "/tasting-menu.jpg",
    alt: "Beautifully plated dish on white plate",
    link: "/menu/tasting",
  },
  {
    id: 2,
    title: "Reserve Wine Pairing",
    description: "Expertly curated wines from our cellar.",
    image: "/wine-pairing.jpg",
    alt: "Red wine being poured into a glass",
    link: "/menu/wine-pairing",
  },
  {
    id: 3,
    title: "Private Dining Area",
    description: "Exclusive spaces for intimate gatherings.",
    image: "/private-dining.jpg",
    alt: "Elegant private dining room with candlelight",
    link: "/reservations/private-dining",
  },
];
