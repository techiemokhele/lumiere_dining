import Image from "next/image";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";

interface RelatedItemProps {
  id: string;
  name: string;
  excerpt: string;
  price: number;
  image: string;
}

export function CartRelatedItemComponent({
  id,
  name,
  excerpt,
  price,
  image,
}: RelatedItemProps) {
  const { addItem } = useCart();

  return (
    <div className="relative flex lg:flex-row flex-col w-full gap-4 p-4 rounded-3xl bg-burgundy-900">
      <div className="lg:w-1/4 w-full">
        <Image
          src={image}
          alt={name}
          width={1000}
          height={1000}
          className="w-full h-24 object-cover rounded-3xl"
        />
      </div>
      <div className="lg:w-3/4 w-full flex flex-col lg:gap-6 gap-2">
        <div className="flex flex-col gap-1">
          <p className="!font-bold lg:text-sm text-xs text-white-100">{name}</p>
          <p className="font-normal lg:text-sm text-xxs text-white-60 line-clamp-2 lg:leading-5 leading-[14px] py-[2px]">
            {excerpt}
          </p>
        </div>
        <div className="flex lg:flex-row flex-col items-center gap-4">
          <p className="!font-bold text-sm text-white-100">
            R{price.toFixed(2)}
          </p>
          <Button
            onClick={() => addItem({ id, name, price, image, excerpt })}
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
