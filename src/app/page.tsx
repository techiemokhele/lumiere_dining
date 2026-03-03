"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Star,
  Quote,
  ChefHat,
  CalendarDays,
  Clock,
  Users,
  ShoppingBag,
  Play,
  Pause,
  Send,
  Flame,
  Sparkles,
  LoaderCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useMenu } from "@/lib/hooks/use-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/structure/PageContainer";
import { reviews, services, slideshowImages } from "@/data/homePageStaticData";

export default function LandingPage() {
  const { addItem } = useCart();
  const { menuData, loading } = useMenu();

  const popularDishes = menuData
    .flatMap((s) => s.items)
    .filter((i) => i.id !== "wines")
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 6);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const [subscribeError, setSubscribeError] = useState<string>("");

  const popularRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const scrollToPopular = () => {
    popularRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    setSubscribeError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubscribed(true);
      setEmail("");
    } catch (error) {
      setSubscribeError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <PageContainer
      showNavigation={true}
      showFooter={true}
      className="flex-col lg:-mt-24 -mt-[64px]"
    >
      <section className="relative flex flex-col h-[100vh] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/light-decoration.jpg"
            alt="Lumière Dining ambiance"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-burgundy-950" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-3xl text-center">
          <p className="flex items-center gap-3 font-normal text-xxs text-crimson-500 uppercase tracking-[0.3em]">
            <span className="w-10 border-t border-crimson-500" />
            est. 2018
            <span className="w-10 border-t border-crimson-500" />
          </p>

          <h1 className="font-extrabold md:text-6xl text-4xl text-white leading-tight">
            Where Every Flavour
            <br />
            <span className="text-crimson-500">Tells a Story</span>
          </h1>

          <p className="font-normal text-sm text-white/80 max-w-lg">
            Experience a symphony of flavours crafted by Chef Antonie in an
            atmosphere of timeless elegance. Seasonal ingredients, world-class
            wines, unforgettable moments.
          </p>

          <div className="flex md:flex-row flex-col gap-4 mt-2">
            <Button
              variant="default"
              size="lg"
              asChild
              className="rounded-full"
            >
              <Link href="/menu" className="gap-2">
                <span>Explore Menu</span>
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white/30 text-white hover:bg-white/10 rounded-full"
            >
              <Link href="/reservations">Book a Table</Link>
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToPopular}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2 animate-bounce cursor-pointer p-0 hover:bg-transparent"
          aria-label="Scroll to popular dishes"
        >
          <span className="text-xxs text-white/50 uppercase tracking-widest">
            Discover
          </span>
          <ArrowDown size={20} className="text-white/50" />
        </Button>
      </section>

      <section
        ref={popularRef}
        className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24"
      >
        <div className="flex flex-col gap-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-3 font-normal text-xxs text-crimson-600 uppercase tracking-widest">
                <Flame size={14} className="text-crimson-600" />
                most loved
              </p>
              <h2 className="font-extrabold lg:text-4xl text-3xl text-white">
                Popular Dishes
              </h2>
              <p className="font-normal text-sm text-white/60 max-w-md">
                Guest favourites that have earned their place on our menu
                through exceptional flavour and presentation.
              </p>
            </div>
            <Link href="/menu">
              <Button
                variant="link"
                className="p-0 hover:no-underline gap-2 text-crimson-500"
              >
                <span>View Full Menu</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-white/40 text-sm text-center py-10">
              Loading...
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {popularDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="group flex flex-col rounded-2xl bg-burgundy-800/60 border border-burgundy-700/50 overflow-hidden hover:border-crimson-600/30 transition-all duration-300 hover:shadow-2xl"
                >
                  <Link href={`/menu/details/${dish.id}`}>
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {dish.tags.slice(0, 2).map((tag) => (
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
                      <Link href={`/menu/${dish.id}`}>
                        <h3 className="font-bold text-lg text-white group-hover:text-crimson-500 transition-colors">
                          {dish.name}
                        </h3>
                      </Link>
                      <span className="font-bold text-lg text-crimson-500 shrink-0">
                        R{dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 line-clamp-2 flex-1">
                      {dish.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-xxs text-white/40">
                        {dish.reviewCount} reviews
                      </span>
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded-full gap-1.5 h-8 px-4"
                        onClick={() =>
                          addItem({
                            id: dish.id,
                            name: dish.name,
                            price: dish.price,
                            image: dish.image,
                            excerpt: dish.excerpt,
                          })
                        }
                      >
                        <ShoppingBag size={14} />
                        <span>Add to cart</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24 bg-burgundy-900/50">
        <div className="flex flex-col gap-12 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3">
            <p className="flex items-center gap-3 font-normal text-xxs text-crimson-600 uppercase tracking-widest">
              <Sparkles size={14} className="text-crimson-600" />
              what we offer
            </p>
            <h2 className="font-extrabold lg:text-4xl text-3xl text-white">
              Our Services
            </h2>
            <p className="font-normal text-sm text-white/60 max-w-lg">
              From intimate dinners to grand celebrations, we craft experiences
              that transcend the ordinary.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center gap-5 p-8 rounded-2xl bg-burgundy-800/40 border border-burgundy-700/40 hover:border-crimson-600/30 hover:bg-burgundy-800/70 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-crimson-600/10 flex items-center justify-center group-hover:bg-crimson-600/20 transition-colors">
                    <Icon
                      size={28}
                      className="text-crimson-500 group-hover:text-crimson-400 transition-colors"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex md:flex-row flex-col rounded-2xl overflow-hidden bg-burgundy-800/60 border border-burgundy-700/50">
            <div className="lg:w-1/2 w-full relative h-64 md:h-auto min-h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"
                alt="Lumière Dining interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-burgundy-950/40 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-burgundy-950/60 lg:hidden" />
            </div>

            <div className="lg:w-1/2 w-full flex flex-col justify-center gap-6 p-8 lg:p-12">
              <p className="flex items-center gap-3 font-normal text-xxs text-crimson-600 uppercase tracking-widest">
                <CalendarDays size={14} className="text-crimson-600" />
                reservations
              </p>
              <h2 className="font-extrabold lg:text-4xl text-3xl text-white">
                Reserve Your Table
              </h2>
              <p className="font-normal text-sm text-white/60">
                Whether it&apos;s an intimate dinner for two or a celebration
                with friends, we&apos;ll ensure every detail is perfect. Secure
                your preferred date and time with ease.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-crimson-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      Opening Hours
                    </p>
                    <p className="text-xxs text-white/60">
                      Tue–Sat: 18:00 – 23:00 &middot; Sun: 12:00 – 16:00
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-crimson-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      Private Events
                    </p>
                    <p className="text-xxs text-white/60">
                      Up to 60 guests for exclusive hire
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="default"
                size="lg"
                asChild
                className="self-start gap-2 mt-2 rounded-full"
              >
                <Link href="/reservations">
                  <CalendarDays size={16} />
                  <span>Book a Table</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24 bg-burgundy-900/50">
        <div className="flex flex-col gap-12 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3">
            <Quote
              size={28}
              className="fill-crimson-600 stroke-crimson-600 opacity-60"
            />
            <h2 className="font-extrabold lg:text-4xl text-3xl text-white">
              What Our Guests Say
            </h2>
            <p className="font-normal text-sm text-white/60 max-w-md">
              Every review is a reflection of our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-4 p-6 lg:p-8 rounded-2xl bg-burgundy-800/40 border border-burgundy-700/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-burgundy-700"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xxs text-white/40">{review.date}</span>
                </div>
                <p className="text-sm text-white/80 italic leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm text-white">
                      {review.name}
                    </p>
                    <p className="text-xxs text-crimson-500">{review.dish}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 py-8">
            <p className="font-semibold lg:text-2xl text-xl text-white italic text-center max-w-2xl">
              &ldquo;A dining experience that transcends the ordinary, where
              every bite is a revelation of flavour.&rdquo;
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-crimson-500 text-crimson-500"
                  />
                ))}
              </div>
              <p className="font-bold text-xxs text-white/60 uppercase tracking-widest">
                Michelin Guide 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex md:flex-row-reverse flex-col rounded-2xl overflow-hidden bg-burgundy-800 border border-burgundy-700/50">
            <div className="md:w-1/2 w-full flex flex-col justify-center gap-6 p-8 md:p-12">
              <p className="flex items-center gap-3 font-normal text-xxs text-crimson-600 uppercase tracking-widest">
                <ShoppingBag size={14} className="text-crimson-600" />
                shop
              </p>
              <h2 className="font-extrabold lg:text-4xl text-3xl text-white">
                Bring Lumière Home
              </h2>
              <p className="font-normal text-sm text-white/60 leading-relaxed">
                Discover our exclusive collection of artisanal pantry goods,
                signed cookbooks, and premium steak knives used in our
                restaurant. Each item has been carefully selected by Chef
                Antonie to elevate your home dining experience.
              </p>
              <p className="font-normal text-xs text-white/40 leading-relaxed">
                From our house-made truffle oil and aged balsamic vinegar to
                hand-forged Japanese steel knives — every product reflects our
                commitment to exceptional quality.
              </p>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="self-start border-crimson-600 text-crimson-500 hover:bg-crimson-600/10 gap-2 rounded-full"
              >
                <Link href="/shop">
                  <span>View Shop</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>

            <div className="md:w-1/2 w-full relative h-64 md:h-auto min-h-[280px]">
              <Image
                src="/knife-product.jpg"
                alt="Premium kitchen products"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24 bg-burgundy-900/50">
        <div className="flex flex-col gap-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3">
            <p className="flex items-center gap-3 font-normal text-xxs text-crimson-600 uppercase tracking-widest">
              <ChefHat size={14} className="text-crimson-600" />
              behind the scenes
            </p>
            <h2 className="font-extrabold lg:text-4xl text-3xl text-white">
              The Art of Lumière
            </h2>
            <p className="font-normal text-sm text-white/60 max-w-lg">
              A glimpse into our kitchen where passion meets precision, and
              every dish is crafted with purpose.
            </p>
          </div>

          <div className="relative w-full aspect-[16/7] md:aspect-[16/6] rounded-2xl overflow-hidden group">
            {slideshowImages.map((img, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: currentSlide === idx ? 1 : 0 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={idx === 0}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/70 via-transparent to-burgundy-950/30" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
              <div className="flex flex-col gap-2">
                <p className="font-bold text-lg text-white drop-shadow-lg">
                  Chef Antonie&apos;s Kitchen
                </p>
                <p className="text-xxs text-white/70 drop-shadow-lg">
                  Where tradition meets innovation
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {slideshowImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === idx
                          ? "bg-crimson-500 w-6"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isPlaying ? (
                    <Pause size={14} className="text-white" />
                  ) : (
                    <Play size={14} className="text-white ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 lg:px-8 xl:px-16 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-crimson-600/10 flex items-center justify-center">
            <Send size={24} className="text-crimson-500" />
          </div>

          <h2 className="font-extrabold lg:text-4xl text-3xl text-white">
            Stay in the Know
          </h2>
          <p className="font-normal text-sm text-white/60 max-w-md">
            Be the first to hear about seasonal menu launches, exclusive events,
            chef&apos;s table experiences, and special offers.
          </p>

          {subscribed ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                <Sparkles size={20} className="text-emerald-400" />
              </div>
              <p className="font-bold text-lg text-white">
                Welcome to the Lumière family!
              </p>
              <p className="text-xs text-white/60">
                Check your inbox for a special welcome from Chef Antonie.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3 w-full max-w-md"
            >
              <div className="flex flex-row gap-3 w-full">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubscribeError("");
                  }}
                  required
                  disabled={isSubscribing}
                  className={`flex-1 bg-burgundy-800 border-burgundy-700 text-white placeholder:text-white/40 ${subscribeError ? "border-crimson-500" : ""}`}
                />
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubscribing}
                  className="rounded-full gap-2 shrink-0 disabled:opacity-50 w-40"
                >
                  {isSubscribing ? (
                    <>
                      <span className="hidden sm:inline">Subscribing...</span>
                      <LoaderCircle className="animate-spin h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Subscribe</span>
                      <Send size={16} />
                    </>
                  )}
                </Button>
              </div>
              {subscribeError && (
                <p className="text-crimson-500 text-xs font-normal">
                  {subscribeError}
                </p>
              )}
            </form>
          )}

          <p className="text-xxs text-white/30">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}
