import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  showText: boolean;
  isFooter?: boolean;
}

export function LogoComponent({ showText, isFooter = false }: LogoProps) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <Utensils className="text-primary xl:text-2xl text-xl" />
      {showText && (
        <p
          className={cn(
            `xl:font-extrabold font-bold text-white`,
            isFooter
              ? "xl:text-2xl lg:text-xl text-xs"
              : "xl:text-2xl lg:text-xl text-lg",
          )}
        >
          Lumière Dining
        </p>
      )}
    </div>
  );
}
