import { cn } from "@/lib/utils";

interface PaddingProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "large";
}

export function PaddingContainer({
  children,
  className,
  size = "small",
}: PaddingProps) {
  return (
    <div
      className={cn(
        "max-w-screen-2xl",
        size === "small" && "px-4 md:px-12",
        size === "large" && "px-4 md:px-20 xl:px-40",
        className,
      )}
    >
      {children}
    </div>
  );
}
