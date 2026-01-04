import { Separator } from "@/components/ui/separator";
import { LogoComponent } from "../LogoComponent";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Facebook, Instagram, TwitterIcon, Youtube } from "lucide-react";

export function FooterComponent() {
  const showCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  };

  return (
    <footer className="flex flex-col gap-4 py-10 xl:px-8 lg:px-8 px-4 bg-secondary">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-8">
        <div className="flex flex-col gap-4">
          <LogoComponent showText={true} />
          <p className="font-sans font-normal xl:text-sm text-xs text-white">
            A culinary where flower meets art. Experience the finest dining in
            the heart of the city.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-1">
          <p className="font-sans font-bold xl:text-xl text-lg text-white">
            Visit Us
          </p>
          <p className="font-sans font-normal xl:text-sm text-xs text-white">
            123 Culinary Avenue <br /> Metropolis, South Africa 1559
          </p>
          <Button variant="link" className="flex items-start justify-start p-0">
            <span className="font-sans font-normal xl:text-sm text-xs text-burgundy ">
              Get Directions
            </span>
          </Button>
        </div>

        <div className="flex flex-col gap-4 pt-1">
          <p className="font-sans font-bold xl:text-xl text-lg text-white">
            Opening Hours
          </p>
          <div className="flex flex-row justify-between items-center">
            <p className="font-sans font-normal xl:text-sm text-xs text-white">
              Mon - Thu:
            </p>
            <p className="font-sans font-normal xl:text-sm text-xs text-white">
              7am - 10pm
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="font-sans font-normal xl:text-sm text-xs text-white">
              Fri - Sat:
            </p>
            <p className="font-sans font-normal xl:text-sm text-xs text-white">
              7am - 12am
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="font-sans font-normal xl:text-sm text-xs text-white">
              Sunday:
            </p>
            <p className="font-sans font-normal xl:text-sm text-xs text-white">
              8am - 10pm
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-1">
          <p className="font-sans font-bold xl:text-xl text-lg text-white">
            Newsletter
          </p>
          <div className="flex flex-col gap-4 w-full">
            <Input placeholder="Enter your email" className="bg-burgundy-950" />
            <Button
              variant="secondary"
              className="bg-burgundy-700 hover:bg-burgundy-700/80"
            >
              <span>Subscribe</span>
            </Button>
          </div>
        </div>
      </div>

      <div></div>

      <Separator orientation="horizontal" className="my-4" />

      <div className="flex flex-row justify-between items-center gap-6">
        <p className="font-sans font-normal xl:text-sm text-xs text-white-60">
          &copy; {showCurrentYear()} Lumiere Dining. All rights reserved.
        </p>

        <div className="flex flex-row gap-4">
          <TwitterIcon className="hover:text-primary lg:size-6 size-4 cursor-pointer" />
          <Instagram className="hover:text-primary lg:size-6 size-4 cursor-pointer" />
          <Facebook className="hover:text-primary lg:size-6 size-4 cursor-pointer" />
          <Youtube className="hover:text-primary lg:size-6 size-4 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
