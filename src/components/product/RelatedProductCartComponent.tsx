"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ShopProduct } from "@/data/shopData";

export function RelatedProductCardComponent({ item }: { item: ShopProduct }) {
  const { addItem } = useCart();

  return (
    <Link
      href={`/shop/${item.id}`}
      className="group flex flex-col rounded-2xl bg-burgundy-800 shadow-lg overflow-hidden min-w-[260px] lg:min-w-0"
    >
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 80vw, 25vw"
        />
      </div>
      <div className="flex flex-col flex-1 gap-2 p-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold text-sm text-white">{item.name}</p>
          <p className="font-bold text-sm text-primary">R{item.price}</p>
        </div>
        <div className="flex flex-row gap-1 flex-wrap">
          {item.tags.slice(0, 2).map((tag, i) => (
            <Badge
              key={i}
              className="bg-burgundy-700 text-white-80 text-[10px]"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-[11px] text-white-60 line-clamp-2">{item.excerpt}</p>
        <Button
          size="sm"
          className="bg-crimson-500 mt-auto self-end rounded-full"
          onClick={(e) => {
            e.preventDefault();
            addItem({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              excerpt: item.excerpt,
            });
          }}
        >
          <ShoppingBag size={14} />
          <span className="text-xs">Add to cart</span>
        </Button>
      </div>
    </Link>
  );
}
