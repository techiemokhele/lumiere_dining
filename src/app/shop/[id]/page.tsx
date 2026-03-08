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
import { useShop } from "@/lib/hooks/use-shop";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { ReviewFormComponent } from "@/components/product/ReviewFormComponent";
import { LoaderComponent } from "@/components/LoaderComponent";
import { RelatedProductCardComponent } from "@/components/product/RelatedProductCartComponent";
import type { ShopCategory, ShopProduct } from "@/data/shopData";

function findProductById(
  shopData: ShopCategory[],
  id: string,
): { item: ShopProduct; categoryId: string } | null {
  for (const category of shopData) {
    const item = category.items.find((i) => i.id === id);
    if (item) return { item, categoryId: category.id };
  }
  return null;
}

function findProductsByIds(
  shopData: ShopCategory[],
  ids: string[],
): ShopProduct[] {
  const allItems = shopData.flatMap((s) => s.items);
  return ids
    .map((id) => allItems.find((i) => i.id === id))
    .filter(Boolean) as ShopProduct[];
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
        <span className="text-xs lg:text-sm font-semibold text-white">
          {title}
        </span>
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

export default function ShopProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCart();
  const { shopData, loading } = useShop();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [liveReviewCount, setLiveReviewCount] = useState<number | null>(null);
  const [liveRating, setLiveRating] = useState<number | null>(null);

  const result = !loading ? findProductById(shopData, productId) : null;
  const item = result?.item;

  const relatedItems = useMemo(
    () => (item ? findProductsByIds(shopData, item.relatedProducts) : []),
    [shopData, item],
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
  if (!result || !item) return notFound();

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
            href="/shop"
            className="flex flex-row items-center gap-2 text-white-60 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft size={16} />
            <span className="text-xs lg:text-sm">Back to Shop</span>
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

              <StarRating rating={liveRating!} reviewCount={liveReviewCount!} />

              <Separator />

              <p className="!font-bold lg:text-sm text-xs text-white-100 leading-relaxed">
                {item.excerpt}
              </p>

              <p className="lg:text-sm text-xs text-white-60 leading-relaxed">
                {item.description}
              </p>

              <Separator />

              <div className="flex flex-col gap-3">
                <DetailDropdown title="Product Details" defaultOpen={false}>
                  <ul className="flex flex-row flex-wrap gap-2 pt-2">
                    {item.details.map((detail, i) => (
                      <li
                        key={i}
                        className="px-3 py-1 rounded-full bg-burgundy-900/60 text-xs text-white-60 border border-burgundy-700"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </DetailDropdown>

                <DetailDropdown title="Care Instructions" defaultOpen={false}>
                  <p className="text-xs text-white-60 leading-relaxed pt-2">
                    {item.careInstructions}
                  </p>
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
                  <span className="px-4 py-2.5 text-xs lg:text-sm font-bold text-white min-w-[40px] text-center">
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
                    Add to Cart — R{item.price * quantity}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <ReviewFormComponent
            itemName={item.name}
            onCountChange={setLiveReviewCount}
            onRatingChange={setLiveRating}
          />

          {relatedItems.length > 0 && (
            <div className="flex flex-col gap-6 pt-6">
              <Separator />
              <div className="flex flex-col gap-2">
                <h2 className="font-extrabold text-2xl lg:text-3xl text-white">
                  You May Also Like
                </h2>
                <p className="lg:text-sm text-xs text-white-60">
                  Curated products that complement your selection
                </p>
              </div>

              <div className="flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none scrollbar-hide">
                {relatedItems.map((relItem) => (
                  <div
                    key={relItem.id}
                    className="snap-start shrink-0 lg:shrink w-[280px] lg:w-auto"
                  >
                    <RelatedProductCardComponent item={relItem} />
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
