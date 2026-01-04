import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";

interface HeaderProps {
  image?: string;
  badgeText?: string;
  title: string;
  description?: string;
  onClick?: () => void;
}
export function HeaderComponent({
  image,
  badgeText,
  title,
  description,
  onClick,
}: HeaderProps) {
  return (
    <header
      className="flex flex-col h-[100vh] w-full items-center justify-center bg-cover bg-center gap-8 lg:px-0 px-6"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Badge
        variant="default"
        className="py-2 px-4 border-2 border-crimson-500 bg-crimson-500/40 hover:bg-crimson-500/40"
      >
        <span className="font-sans font-semibold text-lg text-white">
          {badgeText}
        </span>
      </Badge>
      <h1 className="font-sans lg:font-extrabold md:font-extrabold font-bold md:text-5xl text-4xl text-white text-center">
        {title}
      </h1>
      <p className="font-sans font-normal text-sm text-white text-center">
        {description}
      </p>
      <ChevronDown
        size={24}
        onClick={onClick}
        className="cursor-pointer animate-bounce text-white hover:text-white-60"
      />
    </header>
  );
}
