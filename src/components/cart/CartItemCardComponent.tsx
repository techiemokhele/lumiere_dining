import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface CartItemProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  price: number;
}

export function CartItemCardComponent({
  quantity,
  setQuantity,
  price,
}: CartItemProps) {
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleDeleteSingleItem = () => {
    console.log("delete");
  };

  const itemTotal = price * quantity;

  return (
    <div className="relative flex flex-row w-full gap-8">
      <div className="w-1/4">
        <Image
          src="/wagyu-beef.jpg"
          alt="wagyu beef"
          width={1000}
          height={1000}
          className="w-44 h-32 object-fill rounded-3xl"
        />
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="w-full flex flex-row justify-between">
          <div className="flex w-full flex-col gap-2">
            <p className="!font-bold text-2xl text-white-100">
              Wagyu Beef Carpaccio
            </p>
            <p className="font-normal lg:text-sm text-xs text-white-60">
              Thinly sliced A5 Wagyu, truffle oil, parmesan shavings, and capers
            </p>
          </div>

          <div className="flex w-8 items-start justify-start">
            <Trash2
              size={26}
              className="text-crimson-600/40 cursor-pointer"
              onClick={handleDeleteSingleItem}
            />
          </div>
        </div>

        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row items-center justify-evenly gap-4 p-1.5 rounded-full bg-burgundy-800 border border-burgundy-900">
            <Button
              onClick={handleDecrease}
              variant="ghost"
              size="icon"
              className="w-10 bg-transparent"
            >
              <Minus size={26} className="text-white-100" />
            </Button>

            <p className="font-normal text-xl text-white-100"> {quantity}</p>

            <Button
              onClick={handleIncrease}
              variant="ghost"
              size="icon"
              className="w-10 bg-transparent"
            >
              <Plus size={26} className="text-white-100" />
            </Button>
          </div>

          <p className="flex self-end !font-bold text-2xl text-white-100">
            R{itemTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
