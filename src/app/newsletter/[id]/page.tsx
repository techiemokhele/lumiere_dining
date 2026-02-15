"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowRight,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/structure/PageContainer";
import { PaddingContainer } from "@/components/structure/PaddingContainer";
import { useToast } from "@/lib/hooks/use-toast";
import { newsletterPosts, newsletterCategories } from "@/data/newsletterData";
import type { NewsletterPost } from "@/data/newsletterData";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ShareButtons({ post }: { post: NewsletterPost }) {
  const { toast } = useToast();

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://lumieredining.com/newsletter/${post.id}`;

  const shareText = `${post.title} — Lumière Dining Newsletter`;

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch {}
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "Article link has been copied to your clipboard.",
        variant: "default",
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-white-60 uppercase font-semibold">Share</p>
      <div className="flex flex-row gap-2">
        {typeof window !== "undefined" &&
          typeof navigator !== "undefined" &&
          typeof navigator.share === "function" && (
            <button
              onClick={handleNativeShare}
              className="w-9 h-9 rounded-full bg-burgundy-700 flex items-center justify-center text-white-60 hover:text-white hover:bg-crimson-600 transition-colors"
            >
              <Share2 size={15} />
            </button>
          )}
        <Link
          href={facebookUrl}
          target="_blank"
          className="w-9 h-9 rounded-full bg-burgundy-700 flex items-center justify-center text-white-60 hover:text-white hover:bg-[#1877F2] transition-colors"
        >
          <Facebook size={15} />
        </Link>
        <Link
          href={twitterUrl}
          target="_blank"
          className="w-9 h-9 rounded-full bg-burgundy-700 flex items-center justify-center text-white-60 hover:text-white hover:bg-[#1DA1F2] transition-colors"
        >
          <Twitter size={15} />
        </Link>
        <Link
          href={linkedinUrl}
          target="_blank"
          className="w-9 h-9 rounded-full bg-burgundy-700 flex items-center justify-center text-white-60 hover:text-white hover:bg-[#0A66C2] transition-colors"
        >
          <Linkedin size={15} />
        </Link>
        <button
          onClick={copyLink}
          className="w-9 h-9 rounded-full bg-burgundy-700 flex items-center justify-center text-white-60 hover:text-white hover:bg-crimson-600 transition-colors"
        >
          <LinkIcon size={15} />
        </button>
      </div>
    </div>
  );
}

function RelatedPostCard({ post }: { post: NewsletterPost }) {
  return (
    <Link
      href={`/newsletter/${post.id}`}
      className="group flex flex-col rounded-2xl bg-burgundy-800 shadow-lg overflow-hidden"
    >
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-crimson-600/90 backdrop-blur-sm text-white text-[10px]">
            {post.category}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-2 p-4">
        <div className="flex flex-row items-center gap-2 text-white-60">
          <Calendar size={11} />
          <span className="text-xxs">{formatDate(post.publishedAt)}</span>
          <Clock size={11} />
          <span className="text-xxs">{post.readTime} min</span>
        </div>
        <h3 className="font-bold text-sm text-white group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xxs text-white-60 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex flex-row items-center gap-2 mt-auto pt-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={post.author.image}
              alt={post.author.name}
              fill
              className="object-cover"
              sizes="24px"
            />
          </div>
          <span className="text-xxs text-white-60">{post.author.name}</span>
        </div>
      </div>
    </Link>
  );
}

function ArticleSidebar({ post }: { post: NewsletterPost }) {
  const categories = newsletterCategories.filter((c) => c !== "All");

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-burgundy-800 p-5 flex flex-col items-center gap-3">
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-crimson-500">
          <Image
            src={post.author.image}
            alt={post.author.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-sm text-white">{post.author.name}</p>
          <p className="text-xxs text-white-60">{post.author.role}</p>
        </div>
      </div>

      <ShareButtons post={post} />

      <div className="flex flex-col gap-3">
        <p className="text-xs text-white-60 uppercase font-semibold">Tags</p>
        <div className="flex flex-row flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-burgundy-700 text-white-60 text-xxs hover:bg-crimson-600 hover:text-white cursor-pointer transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="bg-burgundy-700" />

      <div className="flex flex-col gap-3">
        <p className="text-xs text-white-60 uppercase font-semibold">
          Categories
        </p>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/newsletter?category=${encodeURIComponent(cat)}`}
              className={cn(
                "px-3 py-2 rounded-lg text-xs transition-colors",
                post.category === cat
                  ? "bg-crimson-600 text-white"
                  : "text-white-60 hover:bg-burgundy-700 hover:text-white",
              )}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NewsletterDetailPage() {
  const params = useParams();
  const postId = params.id as string;

  const post = newsletterPosts.find((p) => p.id === postId);
  if (!post) notFound();

  const relatedPosts = useMemo(() => {
    const sameCat = newsletterPosts.filter(
      (p) => p.category === post.category && p.id !== post.id,
    );
    const others = newsletterPosts.filter(
      (p) => p.category !== post.category && p.id !== post.id,
    );
    return [...sameCat, ...others].slice(0, 3);
  }, [post]);

  const morePosts = useMemo(() => {
    return newsletterPosts
      .filter(
        (p) => p.id !== post.id && !relatedPosts.find((r) => r.id === p.id),
      )
      .slice(0, 3);
  }, [post, relatedPosts]);

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <PageContainer showNavigation={true} showFooter={true}>
      <PaddingContainer size="small" className="w-full">
        <div className="flex flex-col w-full gap-10 py-10 lg:mt-0 -mt-12 pt-20 lg:pt-24">
          <Link
            href="/newsletter"
            className="flex flex-row items-center gap-2 text-white-60 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Newsletter</span>
          </Link>

          <div className="relative w-full aspect-[21/9] rounded-2xl lg:rounded-3xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/50 to-transparent" />
          </div>

          <div className="flex flex-col gap-4">
            <Badge className="bg-crimson-600 text-white w-fit text-xs">
              {post.category}
            </Badge>
            <h1 className="font-extrabold text-2xl md:text-4xl lg:text-5xl text-white leading-tight max-w-4xl">
              {post.title}
            </h1>
            <div className="flex flex-row items-center gap-4 flex-wrap text-white-60">
              <div className="flex flex-row items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-crimson-500">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <span className="text-sm font-semibold text-white">
                  {post.author.name}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Calendar size={14} />
                <span className="text-xs">{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Clock size={14} />
                <span className="text-xs">{post.readTime} min read</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex lg:flex-row flex-col gap-10 lg:gap-14">
            <article className="flex-1 flex flex-col gap-6 max-w-none">
              <p className="text-base lg:text-lg text-white font-semibold leading-relaxed">
                {post.excerpt}
              </p>

              {paragraphs.map((para, i) => (
                <div key={i}>
                  <p className="text-sm lg:text-base text-white-60 leading-relaxed">
                    {para}
                  </p>

                  {i === 1 && post.quote && (
                    <blockquote className="my-8 relative pl-6 border-l-4 border-crimson-600">
                      <Quote
                        size={32}
                        className="absolute -top-2 -left-1 text-crimson-600/30"
                      />
                      <p className="text-lg lg:text-xl font-bold text-white italic leading-relaxed">
                        &ldquo;{post.quote}&rdquo;
                      </p>
                    </blockquote>
                  )}
                </div>
              ))}

              {post.images.length > 1 && (
                <div className="flex flex-col gap-4 mt-4">
                  <Separator className="bg-burgundy-700" />
                  <p className="text-xs text-white-60 uppercase font-semibold">
                    Gallery
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {post.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`${post.title} — image ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex lg:hidden flex-col gap-4 mt-4">
                <Separator className="bg-burgundy-700" />
                <ShareButtons post={post} />
                <div className="flex flex-row flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-burgundy-700 text-white-60 text-xxs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>

            <aside className="hidden lg:flex flex-col w-72 shrink-0 sticky top-28 self-start">
              <ArticleSidebar post={post} />
            </aside>
          </div>

          <Separator />

          {relatedPosts.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-extrabold text-2xl lg:text-3xl text-white">
                  Recommended For You
                </h2>
                <p className="text-xs text-white-60">
                  More stories we think you&apos;ll enjoy
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <RelatedPostCard key={rp.id} post={rp} />
                ))}
              </div>
            </div>
          )}

          {morePosts.length > 0 && (
            <div className="flex flex-col gap-6">
              <Separator />
              <div className="flex flex-col gap-2">
                <h2 className="font-extrabold text-2xl lg:text-3xl text-white">
                  More From the Kitchen
                </h2>
                <p className="text-xs text-white-60">
                  Continue exploring our culinary stories
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {morePosts.map((mp) => (
                  <RelatedPostCard key={mp.id} post={mp} />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center py-6">
            <Link href="/newsletter">
              <Button
                variant="outline"
                className="border-burgundy-700 text-white hover:bg-crimson-600 hover:border-crimson-600 gap-2"
              >
                <ArrowLeft size={16} />
                <span>Back to All Articles</span>
              </Button>
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </PageContainer>
  );
}
