"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { landingMenuData } from "@/data/landingMenuData";
import { useCart } from "@/context/CartContext";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export default function CategoryPage() {
  const params = useParams();
  const id = params.id as string;
  const { addItem } = useCart();

  const section = landingMenuData.find((s) => s.id === id);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  if (!section) {
    notFound();
  }

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    section.items.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [section]);

  const filteredItems = useMemo(() => {
    let items = [...section.items];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    if (selectedTags.length > 0) {
      items = items.filter((item) =>
        selectedTags.some((tag) => item.tags.includes(tag)),
      );
    }

    switch (sortBy) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        items.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return items;
  }, [section.items, searchQuery, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("default");
  };

  const hasActiveFilters =
    searchQuery || selectedTags.length > 0 || sortBy !== "default";

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <PaddingContainer size="small">
        <div className="flex flex-col w-full gap-8 py-10 lg:mt-0 -mt-12 pt-20 lg:pt-24">
          <div className="flex flex-col gap-4">
            <Link
              href="/menu"
              className="flex flex-row items-center gap-2 text-white-60 hover:text-white transition-colors w-fit"
            >
              <ArrowLeft size={16} />
              <span className="font-serif text-sm">Back to Menu</span>
            </Link>

            <div className="flex flex-col gap-2">
              <h1 className="font-serif font-extrabold text-3xl lg:text-5xl text-crimson-600">
                {section.title}
              </h1>
              <p className="font-serif font-normal text-sm lg:text-base text-white-60">
                {section.description}
              </p>
            </div>
            <Separator />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-3 items-center">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white-60"
                />
                <Input
                  placeholder={`Search ${section.title.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-burgundy-800 border-burgundy-700 text-white placeholder:text-white-60 font-serif text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white-60 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-burgundy-800 border border-burgundy-700 text-white font-serif text-sm rounded-md px-3 py-2 outline-none cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>

              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "border-burgundy-700 text-white-60 hover:text-white shrink-0",
                  showFilters && "bg-burgundy-700 text-white",
                )}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={16} />
              </Button>
            </div>

            {showFilters && (
              <div className="flex flex-row flex-wrap gap-2 items-center">
                <span className="font-serif text-xs text-white-60 mr-1">
                  Filter by:
                </span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-3 py-1 rounded-full font-serif text-xs transition-colors border",
                      selectedTags.includes(tag)
                        ? "bg-primary text-white border-primary"
                        : "bg-burgundy-800 text-white-60 border-burgundy-700 hover:border-white-60",
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {hasActiveFilters && (
              <div className="flex flex-row items-center justify-between">
                <p className="font-serif text-xs text-white-60">
                  Showing {filteredItems.length} of {section.items.length} items
                </p>
                <button
                  onClick={clearFilters}
                  className="font-serif text-xs text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col rounded-2xl bg-burgundy-800 shadow-lg overflow-hidden"
                >
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>

                  <div className="flex flex-col flex-1 gap-3 p-5">
                    <div className="flex flex-row justify-between items-center">
                      <p className="font-serif font-bold text-lg text-white">
                        {item.name}
                      </p>
                      <p className="font-serif font-bold text-lg text-primary">
                        R{item.price}
                      </p>
                    </div>

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

                    <p className="font-serif font-normal text-xs text-white-60 line-clamp-3 flex-1">
                      {item.excerpt}
                    </p>

                    <div className="flex justify-end mt-auto pt-2">
                      <Button
                        className="bg-burgundy-700 hover:bg-crimson-500"
                        onClick={() =>
                          addItem({
                            id: item.name,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            excerpt: item.excerpt,
                          })
                        }
                      >
                        <Plus size={16} />
                        <span>Add to Order</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="font-serif text-lg text-white-60">
                No items found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="border-burgundy-700 text-white"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
