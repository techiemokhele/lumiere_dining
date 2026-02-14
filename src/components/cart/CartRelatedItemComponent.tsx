import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export function CartRelatedItemComponent() {
  const addItemToCart = () => {
    console.log("add to cart");
  };

  return (
    <div className="relative flex flex-row w-full gap-4 p-4 rounded-3xl bg-burgundy-900">
      <div className="w-1/4">
        <Image
          src="/wagyu-beef.jpg"
          alt="wagyu beef"
          width={1000}
          height={1000}
          className="w-full h-24 object-cover rounded-3xl"
        />
      </div>
      <div className="w-3/4 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="!font-bold text-sm text-white-100">
            Dark Chocolate Ganache
          </p>
          <p className="font-normal text-sm text-white-60">
            Rich 70% cocoa with gold leaf
          </p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <p className="!font-bold text-sm text-white-100">R174.00</p>
          <Button
            onClick={addItemToCart}
            variant="default"
            size="sm"
            className="rounded-full"
          >
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
