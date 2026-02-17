import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface HeaderProps {
  image?: string;
  badgeText?: string;
  addBadgeBorder?: boolean;
  title: string;
  description?: string;
  onClick?: () => void;
}

export function HeaderComponent({
  image,
  badgeText,
  addBadgeBorder = true,
  title,
  description,
  onClick,
}: HeaderProps) {
  return (
    <header className="relative flex flex-col h-[100vh] w-full items-center justify-center gap-8 lg:px-0 px-6 overflow-hidden">
      {image && (
        <>
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      <Badge
        variant="default"
        className={cn(
          "relative z-10 py-2 px-4",
          !addBadgeBorder
            ? "border-none bg-crimson-500"
            : "border-2 border-crimson-500 bg-crimson-500/40 hover:bg-crimson-500/40",
        )}
      >
        <span className="font-serif font-semibold text-lg text-white">
          {badgeText}
        </span>
      </Badge>
      <h1 className="relative z-10 font-serif lg:font-extrabold md:font-extrabold font-bold md:text-5xl text-4xl text-white text-center italic xl:max-w-4xl lg:max-w-4xl md:max-w-3xl max-w-md">
        {title}
      </h1>
      <p className="relative z-10 font-serif font-normal text-sm text-white text-center w-full xl:max-w-4xl lg:max-w-4xl md:max-w-3xl max-w-md">
        {description}
      </p>
      <ChevronDown
        size={24}
        onClick={onClick}
        className="relative z-10 cursor-pointer animate-bounce text-white hover:text-white-60"
      />
    </header>
  );
}
