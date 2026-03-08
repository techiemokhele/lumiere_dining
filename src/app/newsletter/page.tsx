"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  SlidersHorizontal,
  Clock,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { newsletterPosts, newsletterCategories } from "@/data/newsletterData";
import type { NewsletterPost } from "@/data/newsletterData";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function HeroBanner({ post }: { post: NewsletterPost }) {
  return (
    <div className="relative w-full h-[85vh] lg:h-[90vh] min-h-[600px] overflow-hidden rounded-2xl lg:rounded-3xl">
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950 via-burgundy-950/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 flex flex-col gap-4 lg:gap-5 max-w-3xl">
        <Badge className="bg-crimson-600 text-white w-fit text-xs">
          {post.category}
        </Badge>

        <h1 className="font-extrabold text-2xl md:text-4xl lg:text-5xl text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-xs lg:text-sm lg:text-base text-white-60 leading-relaxed line-clamp-3 lg:line-clamp-5">
          {post.excerpt}
        </p>

        <div className="flex flex-row items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-crimson-500">
            <Image
              src={post.author.image}
              alt={post.author.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm font-semibold text-white">
              {post.author.name}
            </span>
            <span className="text-xxs text-white-60">
              {formatDate(post.publishedAt)} · {post.readTime} min read
            </span>
          </div>
        </div>

        <Link href={`/newsletter/${post.id}`}>
          <Button className="bg-crimson-600 hover:bg-crimson-500 text-white w-fit gap-2 mt-1">
            <span>Read Full Story</span>
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function PostCard({ post, index }: { post: NewsletterPost; index: number }) {
  return (
    <Link
      href={`/newsletter/${post.id}`}
      className="group flex flex-col rounded-2xl bg-burgundy-800 shadow-lg overflow-hidden"
      style={{
        animationDelay: `${index * 80}ms`,
        animation: "fadeSlideUp 0.5s ease-out both",
      }}
    >
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-crimson-600/90 backdrop-blur-sm text-white text-[10px]">
            {post.category}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-3 p-5">
        <div className="flex flex-row items-center gap-3 text-white-60">
          <div className="flex flex-row items-center gap-1">
            <Calendar size={12} />
            <span className="text-xxs">{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Clock size={12} />
            <span className="text-xxs">{post.readTime} min read</span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-xs text-white-60 line-clamp-3 flex-1 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-row items-center justify-between mt-auto pt-3 border-t border-burgundy-700">
          <div className="flex flex-row items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden">
              <Image
                src={post.author.image}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="28px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xxs font-semibold text-white">
                {post.author.name}
              </span>
              <span className="text-xxs text-white-60">{post.author.role}</span>
            </div>
          </div>
          <span className="text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
            Read
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function NewsletterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const heroPost = newsletterPosts[0];

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    newsletterPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    let posts = newsletterPosts.slice(1);

    if (selectedCategory !== "All") {
      posts = posts.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.name.toLowerCase().includes(q),
      );
    }

    if (selectedTags.length > 0) {
      posts = posts.filter((p) => selectedTags.some((t) => p.tags.includes(t)));
    }

    return posts;
  }, [searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTags([]);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || selectedTags.length > 0;

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <PaddingContainer size="small" className="w-full">
        <div className="flex flex-col w-full gap-10 py-10 lg:mt-0 -mt-12 pt-20 lg:pt-24">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-4">
              <div className="w-16 border border-crimson-600" />
              <p className="font-normal text-xs lg:text-sm text-crimson-600 uppercase">
                Newsletter
              </p>
            </div>
            <h1 className="font-extrabold text-3xl lg:text-5xl text-white">
              From Our Kitchen
            </h1>
            <p className="text-xs lg:text-sm text-white-60 max-w-2xl">
              Stories, techniques, and insights from the world of fine dining —
              curated by the Lumière editorial team.
            </p>
          </div>

          <HeroBanner post={heroPost} />

          <Separator />

          <div className="flex flex-row gap-2 overflow-x-auto scrollbar-hide pb-1">
            {newsletterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border",
                  selectedCategory === cat
                    ? "bg-crimson-600 text-white border-crimson-600"
                    : "bg-burgundy-800 text-white-60 border-burgundy-700 hover:border-white-60 hover:text-white",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-3 items-center">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white-60"
                />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-burgundy-800 border-burgundy-700 text-white placeholder:text-white-60 text-xs lg:text-sm"
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
                <span className="text-xs text-white-60 mr-1">
                  Filter by tag:
                </span>
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
                  Showing {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? "s" : ""}
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

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-lg text-white-60">
                No articles found matching your criteria.
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
