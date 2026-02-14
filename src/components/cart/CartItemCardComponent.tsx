import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { CartItem, useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItem;
}

export function CartItemCardComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="relative flex flex-row w-full gap-8">
      <div className="w-1/4">
        <Image
          src={item.image}
          alt={item.name}
          width={1000}
          height={1000}
          className="w-full h-32 object-cover rounded-3xl"
        />
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="w-full flex flex-row justify-between">
          <div className="flex w-full flex-col gap-2">
            <p className="!font-bold text-2xl text-white-100">{item.name}</p>
            <p className="font-normal lg:text-sm text-xs text-white-60">
              {item.excerpt}
            </p>
          </div>
          <div className="flex w-4 items-start justify-start">
            <Trash2
              size={20}
              className="text-crimson-600/40 cursor-pointer"
              onClick={() => removeItem(item.id)}
            />
          </div>
        </div>

        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row items-center justify-evenly gap-4 p-1.5 rounded-full bg-burgundy-800 border border-burgundy-900">
            <Button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              variant="ghost"
              size="icon"
              className="w-10 bg-transparent"
            >
              <Minus size={26} className="text-white-100" />
            </Button>
            <p className="font-normal text-xl text-white-100">
              {item.quantity}
            </p>
            <Button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              variant="ghost"
              size="icon"
              className="w-10 bg-transparent"
            >
              <Plus size={26} className="text-white-100" />
            </Button>
          </div>
          <p className="flex self-end !font-bold text-2xl text-white-100">
            R{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
