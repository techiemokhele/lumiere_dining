"use client";

import { useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Minus,
  Star,
  ChevronDown,
  ShoppingBag,
  ZoomIn,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useMenu } from "@/lib/hooks/use-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { ReviewFormComponent } from "@/components/product/ReviewFormComponent";
import type { MenuItem, MenuSection } from "@/data/landingMenuData";
import { LoaderComponent } from "@/components/LoaderComponent";

function findItemById(menuData: MenuSection[], id: string) {
  for (const section of menuData) {
    const item = section.items.find((i) => i.id === id);
    if (item) return { item, sectionId: section.id };
  }
  return null;
}

function findItemsByIds(menuData: MenuSection[], ids: string[]) {
  const allItems = menuData.flatMap((s) => s.items);
  return ids
    .map((id) => allItems.find((i) => i.id === id))
    .filter(Boolean) as MenuItem[];
}

function DetailDropdown({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-burgundy-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center justify-between w-full px-4 py-3 text-left hover:bg-burgundy-800/50 transition-colors"
      >
        <span className="text-sm font-semibold text-white">{title}</span>
        <ChevronDown
          size={16}
          className={cn(
            "text-white-60 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-row gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={cn(
              star <= Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= rating
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-burgundy-700",
            )}
          />
        ))}
      </div>
      <span className="text-sm text-white">{rating}</span>
      <span className="text-xs text-white-60">({reviewCount} reviews)</span>
    </div>
  );
}

function PairingCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <Link
      href={`/menu/details/${item.id}`}
      className="group flex flex-col rounded-2xl bg-burgundy-800 shadow-lg overflow-hidden min-w-[260px] lg:min-w-0"
    >
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 80vw, 25vw"
        />
      </div>
      <div className="flex flex-col flex-1 gap-2 p-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold text-sm text-white">{item.name}</p>
          <p className="font-bold text-sm text-primary">R{item.price}</p>
        </div>
        <div className="flex flex-row gap-1 flex-wrap">
          {item.tags.slice(0, 2).map((tag, i) => (
            <Badge
              key={i}
              className="bg-burgundy-700 text-white-80 text-[10px]"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-[11px] text-white-60 line-clamp-2">{item.excerpt}</p>
        <Button
          size="sm"
          className="bg-burgundy-700 hover:bg-crimson-500 mt-auto self-end"
          onClick={(e) => {
            e.preventDefault();
            addItem({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              excerpt: item.excerpt,
            });
          }}
        >
          <Plus size={14} />
          <span className="text-xs">Add</span>
        </Button>
      </div>
    </Link>
  );
}

function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
      >
        <X size={28} />
      </button>
      <div
        className="relative w-[90vw] h-[80vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const itemId = params.id as string;
  const { addItem } = useCart();
  const { menuData, loading } = useMenu();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [liveReviewCount, setLiveReviewCount] = useState<number | null>(null);

  const result = !loading ? findItemById(menuData, itemId) : null;
  const item = result?.item;
  const sectionId = result?.sectionId;

  const pairingItems = useMemo(
    () => (item ? findItemsByIds(menuData, item.pairings) : []),
    [menuData, item],
  );

  const handleAddToCart = useCallback(() => {
    if (!item) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        excerpt: item.excerpt,
      });
    }
  }, [addItem, item, quantity]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderComponent />
      </div>
    );
  if (!result || !item || !sectionId) return notFound();

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      {lightboxOpen && (
        <ImageLightbox
          src={item.images[selectedImage]}
          alt={item.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PaddingContainer size="small" className="w-full">
        <div className="flex flex-col w-full gap-10 py-10 lg:mt-0 -mt-12 pt-20 lg:pt-24">
          <Link
            href={`/menu/${sectionId}`}
            className="flex flex-row items-center gap-2 text-white-60 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Menu</span>
          </Link>

          <div className="flex lg:flex-row flex-col gap-8 lg:gap-12">
            <div className="flex flex-col gap-4 lg:w-1/2 w-full">
              <div
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-burgundy-800 cursor-zoom-in group"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={item.images[selectedImage]}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <ZoomIn
                    size={32}
                    className="text-white opacity-0 group-hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-3">
                {item.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden transition-all duration-200",
                      selectedImage === index
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-burgundy-900"
                        : "opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${item.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:w-1/2 w-full">
              <div className="flex flex-row gap-2 flex-wrap">
                {item.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    className="bg-burgundy-700 text-white-80 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="font-extrabold text-3xl lg:text-4xl text-white">
                {item.name}
              </h1>

              <p className="font-bold text-2xl text-primary">R{item.price}</p>

              <StarRating
                rating={item.rating}
                reviewCount={liveReviewCount ?? item.reviewCount}
              />

              <Separator />

              <p className="!font-bold lg:text-sm text-xs text-white-100 leading-relaxed">
                {item.excerpt}
              </p>

              <p className="lg:text-sm text-xs text-white-60 leading-relaxed">
                {item.description}
              </p>

              <Separator />

              <div className="flex flex-col gap-3">
                <DetailDropdown title="Ingredients" defaultOpen={false}>
                  <ul className="flex flex-row flex-wrap gap-2 pt-2">
                    {item.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="px-3 py-1 rounded-full bg-burgundy-900/60 text-xs text-white-60 border border-burgundy-700"
                      >
                        {ing}
                      </li>
                    ))}
                  </ul>
                </DetailDropdown>

                <DetailDropdown title="Preparation Notes" defaultOpen={false}>
                  <p className="text-xs text-white-60 leading-relaxed pt-2">
                    {item.preparationNotes}
                  </p>
                </DetailDropdown>

                <DetailDropdown title="Allergies & Dietary" defaultOpen={false}>
                  {item.allergies.length > 0 ? (
                    <div className="flex flex-row flex-wrap gap-2 pt-2">
                      {item.allergies.map((allergy, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-red-900/30 text-xs text-red-300 border border-red-800/50"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-white-60">
                      No common allergens identified.
                    </p>
                  )}
                </DetailDropdown>
              </div>

              <Separator />

              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center border border-burgundy-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2.5 text-white-60 hover:text-white hover:bg-burgundy-700 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2.5 text-sm font-bold text-white min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2.5 text-white-60 hover:text-white hover:bg-burgundy-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  size="sm"
                  variant="default"
                  className="flex-1 bg-crimson-600 hover:bg-crimson-500 text-white py-6 rounded-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span className="font-semibold">
                    Add to Order — R{item.price * quantity}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <ReviewFormComponent
            itemName={item.name}
            onCountChange={setLiveReviewCount}
          />

          {pairingItems.length > 0 && (
            <div className="flex flex-col gap-6 pt-6">
              <Separator />
              <div className="flex flex-col gap-2">
                <h2 className="font-extrabold text-2xl lg:text-3xl text-white">
                  Perfect Pairings
                </h2>
                <p className="lg:text-sm text-xs text-white-60">
                  Our chef recommends these items to complement your selection
                </p>
              </div>

              <div className="flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none scrollbar-hide">
                {pairingItems.map((pairItem) => (
                  <div
                    key={pairItem.id}
                    className="snap-start shrink-0 lg:shrink w-[280px] lg:w-auto"
                  >
                    <PairingCard item={pairItem} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
