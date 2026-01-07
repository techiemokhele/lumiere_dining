import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface MenuCardProps {
  itemDirection: "left" | "right";
  name: string;
  price: number;
  excerpt: string;
  tags: string[];
  image: string;
}

export function LandingPageMenuCard({
  itemDirection,
  name,
  price,
  excerpt,
  tags,
  image,
}: MenuCardProps) {
  return (
    <div
      className={cn(
        "group flex w-full rounded-2xl bg-burgundy-800 shadow-lg overflow-hidden",
        itemDirection === "left"
          ? "lg:flex-row flex-col"
          : "lg:flex-row-reverse flex-col"
      )}
    >
      <div className="flex flex-col lg:w-2/3 w-full gap-4 p-6">
        <div className="flex flex-row justify-between items-center">
          <p className="font-serif font-bold text-xl text-white">{name}</p>
          <p className="font-serif font-bold text-xl text-primary">${price}</p>
        </div>

        <div className="flex flex-row gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge key={index} className="bg-burgundy-700 text-white-80">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="font-serif font-normal lg:text-sm text-xs text-white-60 line-clamp-4">
          {excerpt}
        </p>

        <div className="flex justify-end mt-auto">
          <Button className="bg-burgundy-700 hover:bg-crimson-500">
            <Plus size={16} />
            <span>Add to Order</span>
          </Button>
        </div>
      </div>

      <div className="lg:w-1/3 w-full h-64 lg:h-auto relative">
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
      </div>
    </div>
  );
}
