import { Utensils } from "lucide-react";

interface LogoProps {
  showText: boolean;
}

export function LogoComponent({ showText }: LogoProps) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <Utensils className="text-primary xl:text-2xl text-xl" />
      {showText && (
        <p className="font-serif xl:font-extrabold font-bold xl:text-2xl lg:text-xl text-lg text-white">
          Lumière Dining
        </p>
      )}
    </div>
  );
}
