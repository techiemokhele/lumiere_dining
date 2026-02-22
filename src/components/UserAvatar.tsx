import Image from "next/image";

interface UserAvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
}

export function UserAvatar({
  src,
  alt,
  size = 32,
  className = "",
}: UserAvatarProps) {
  if (!src) return null;

  const isBase64 = src.startsWith("data:");

  if (isBase64) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="relative rounded-full overflow-hidden shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes={`${size}px`}
      />
    </div>
  );
}
