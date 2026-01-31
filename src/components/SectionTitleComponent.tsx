import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface SectionTitleProps {
  title: string;
  description: string;
}

export function SectionTitleComponent({
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col lg:w-full w-1/2 gap-2">
          <p className="font-serif xl:font-extrabold font-bold lg:text-2xl text-xl text-white">
            {title}
          </p>
          <p className="font-serif font-normal lg:text-sm text-xs text-white-60">
            {description}
          </p>
        </div>

        <Button variant="default">
          <span>View All</span>
        </Button>
      </div>
      <Separator />
    </div>
  );
}
