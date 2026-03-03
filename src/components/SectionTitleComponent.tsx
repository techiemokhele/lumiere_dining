"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface SectionTitleProps {
  id: string;
  title: string;
  description: string;
}

export function SectionTitleComponent({
  id,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col lg:w-full w-1/2 gap-2">
          <p className="xl:font-extrabold font-bold lg:text-2xl text-xl text-white">
            {title}
          </p>
          <p className="font-normal lg:text-sm text-xs text-white-60">
            {description}
          </p>
        </div>

        <Link href={`/menu/${id}`}>
          <Button variant="default">
            <span>View All</span>
          </Button>
        </Link>
      </div>
      <Separator />
    </div>
  );
}
