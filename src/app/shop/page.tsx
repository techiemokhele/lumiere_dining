"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useShop } from "@/lib/hooks/use-shop";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/structure/PageContainer";
import { HeaderComponent } from "@/components/layout/HeaderComponent";
import { LoaderComponent } from "@/components/LoaderComponent";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

const ITEMS_PER_PAGE = 12;

export default function ShopPage() {
  const { addItem } = useCart();
  const { shopData, loading } = useShop();

  const allProducts = shopData.flatMap((s) => s.items);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);

  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 },
    );
    if (headerRef.current) headerObserver.observe(headerRef.current);
    return () => headerObserver.disconnect();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allProducts.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [allProducts]);

  const filteredItems = useMemo(() => {
    let items =
      activeCategory === "all"
        ? [...allProducts]
        : shopData.find((s) => s.id === activeCategory)?.items || [];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopData, activeCategory, searchQuery, selectedTags, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("default");
    setCurrentPage(1);
  };

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const hasActiveFilters =
    searchQuery || selectedTags.length > 0 || sortBy !== "default";

  const categories = [
    { id: "all", title: "All Products" },
    ...shopData.map((s) => ({ id: s.id, title: s.title })),
  ];

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <div ref={headerRef} className="lg:-mt-[52px] -mt-12 w-full">
        <HeaderComponent
          image="/knife-product.jpg"
          badgeText="Lumière Collection"
          addBadgeBorder={true}
          title="Bring Lumière Home"
          description="Discover our exclusive collection of artisanal pantry goods, premium kitchen tools, signed cookbooks, and curated gifts — each selected by Chef Antonie."
          onClick={scrollToGrid}
        />
      </div>

      <div
        className={cn(
          "flex flex-col sticky lg:top-[0px] top-12 z-10 transition-colors duration-300 gap-4 w-full",
          !isHeaderVisible && "bg-burgundy-700/95 backdrop-blur-md shadow-lg",
        )}
      >
        <div className="flex flex-row justify-center items-center lg:gap-6 gap-4 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                "text-xs md:text-lg transition-all",
                "text-white/80 hover:text-white",
                activeCategory === cat.id && "!font-extrabold text-white",
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>
        <Separator />
      </div>

      <div className="w-full px-4 lg:px-8 xl:px-16">
        <div
          ref={gridRef}
          className="flex flex-col w-full gap-8 py-10 max-w-7xl mx-auto scroll-m-16 overflow-x-hidden"
        >
          <div className="flex flex-col gap-4">
            <div className="flex lg:flex-row flex-col gap-3 items-center w-full">
              <div className="relative lg:flex-1 lg:min-w-0 w-full">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white-60"
                />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 bg-burgundy-800 border-burgundy-700 text-white placeholder:text-white-60 rounded-3xl lg:text-sm text-xs w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white-60 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-row items-center gap-3 lg:shrink-0 w-full lg:w-auto justify-end">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    handleSortChange(e.target.value as SortOption)
                  }
                  className="bg-burgundy-800 border border-burgundy-700 text-white lg:text-sm text-xs rounded-3xl px-3 py-2 outline-none cursor-pointer shrink-0"
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
            </div>

            {showFilters && (
              <div className="flex flex-row flex-wrap gap-2 items-center">
                <span className="text-xs text-white-60 mr-1">Filter by:</span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs transition-colors border",
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
                <p className="text-xs text-white-60">
                  Showing {filteredItems.length} product
                  {filteredItems.length !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <LoaderComponent />
          ) : paginatedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col rounded-2xl bg-burgundy-800/60 border border-burgundy-700/50 overflow-hidden hover:border-crimson-600/30 transition-all duration-300"
                >
                  <Link href={`/shop/${item.id}`}>
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star
                          size={12}
                          className="fill-amber-400 text-amber-400"
                        />
                        <span className="text-xxs text-white font-bold">
                          {item.rating}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase font-semibold bg-crimson-600/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/shop/${item.id}`}>
                        <h3 className="font-bold text-lg text-white group-hover:text-crimson-500 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <span className="font-bold text-lg text-crimson-500 shrink-0">
                        R{item.price}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 line-clamp-2 flex-1">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-xxs text-white/40">
                        {item.reviewCount} reviews
                      </span>
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded-full gap-1.5 h-8 px-4"
                        onClick={() =>
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            excerpt: item.excerpt,
                          })
                        }
                      >
                        <ShoppingBag size={14} />
                        <span className="text-xs">Add</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-full flex w-full">
              <div className="flex flex-col flex-1 rounded-2xl bg-burgundy-800 shadow-lg overflow-hidden">
                <div className="flex flex-col items-center justify-center flex-1 p-10 gap-6">
                  <ShoppingBag size={64} className="text-white/20" />
                  <p className="text-lg text-white-60 text-center">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="border-burgundy-700 text-white"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-row items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="icon"
                className="border-burgundy-700 text-white-60 hover:text-white disabled:opacity-30"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => p - 1);
                  scrollToGrid();
                }}
              >
                <ChevronLeft size={16} />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      scrollToGrid();
                    }}
                    className={cn(
                      "w-9 h-9 rounded-md text-sm transition-colors",
                      currentPage === page
                        ? "bg-primary text-white"
                        : "text-white-60 hover:text-white hover:bg-burgundy-700",
                    )}
                  >
                    {page}
                  </button>
                ),
              )}

              <Button
                variant="outline"
                size="icon"
                className="border-burgundy-700 text-white-60 hover:text-white disabled:opacity-30"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => p + 1);
                  scrollToGrid();
                }}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
