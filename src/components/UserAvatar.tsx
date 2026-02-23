import Image from "next/image";

interface UserAvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
}

function isValidImageSrc(src: string): boolean {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/") ||
    src.startsWith("data:")
  );
}

export function UserAvatar({
  src,
  alt,
  size = 32,
  className = "",
}: UserAvatarProps) {
  const initials = alt?.[0]?.toUpperCase() ?? "?";

  if (!src || !isValidImageSrc(src)) {
    return (
      <div
        className={`rounded-full bg-crimson-600 flex items-center justify-center shrink-0 text-white font-bold ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {initials}
      </div>
    );
  }

  if (src.startsWith("data:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
