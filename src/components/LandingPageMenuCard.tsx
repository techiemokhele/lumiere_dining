"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";

interface MenuCardProps {
  itemDirection: "left" | "right";
  id: string;
  name: string;
  price: number;
  excerpt: string;
  tags: string[];
  image: string;
}

export function LandingPageMenuCard({
  itemDirection,
  id,
  name,
  price,
  excerpt,
  tags,
  image,
}: MenuCardProps) {
  const { addItem } = useCart();

  return (
    <div
      className={cn(
        "group flex w-full rounded-2xl bg-burgundy-800 shadow-lg overflow-hidden",
        itemDirection === "left"
          ? "lg:flex-row flex-col"
          : "lg:flex-row-reverse flex-col",
      )}
    >
      <div className="flex flex-col lg:w-2/3 w-full gap-4 p-6">
        <div className="flex flex-row justify-between items-center">
          <Link
            href={`/menu/details/${name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}`}
            className="hover:text-primary transition-colors"
          >
            <p className="font-bold text-xl text-white">{name}</p>
          </Link>
          <p className="font-bold text-xl text-primary">R{price}</p>
        </div>

        <div className="flex flex-row gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge key={index} className="bg-burgundy-700 text-white-80">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="font-normal lg:text-sm text-xs text-white-60 line-clamp-4">
          {excerpt}
        </p>

        <div className="flex justify-end mt-auto">
          <Button
            className="bg-burgundy-700 hover:bg-crimson-500"
            onClick={() => addItem({ id: id, name, price, image, excerpt })}
          >
            <Plus size={16} />
            <span>Add to Order</span>
          </Button>
        </div>
      </div>

      <Link
        href={`/menu/details/${id}`}
        className="lg:w-1/3 w-full h-64 lg:h-auto relative block"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
        "
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </Link>
    </div>
  );
}
