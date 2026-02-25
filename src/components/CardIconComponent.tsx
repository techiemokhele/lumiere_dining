import { CardType } from "@/types";

export function CardIconComponent({ type }: { type: CardType }) {
  if (type === "visa") {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-6 w-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <text
          x="6"
          y="22"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="14"
          fill="#FFFFFF"
          letterSpacing="1"
        >
          VISA
        </text>
      </svg>
    );
  }
  if (type === "mastercard") {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-6 w-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="32" rx="4" fill="#252525" />
        <circle cx="19" cy="16" r="9" fill="#EB001B" />
        <circle cx="29" cy="16" r="9" fill="#F79E1B" />
        <path
          d="M24 9.13a9 9 0 0 1 0 13.74A9 9 0 0 1 24 9.13z"
          fill="#FF5F00"
        />
      </svg>
    );
  }
  if (type === "amex") {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-6 w-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="32" rx="4" fill="#2E77BC" />
        <text
          x="5"
          y="22"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="9"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          AMERICAN
        </text>
        <text
          x="5"
          y="29"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="9"
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          EXPRESS
        </text>
      </svg>
    );
  }
  if (type === "discover") {
    return (
      <svg
        viewBox="0 0 48 32"
        className="h-6 w-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="32" rx="4" fill="#F76F20" />
        <text
          x="5"
          y="22"
          fontFamily="Arial"
          fontWeight="bold"
          fontSize="9"
          fill="#FFFFFF"
        >
          DISCOVER
        </text>
        <circle cx="36" cy="16" r="8" fill="#FFCC00" opacity="0.9" />
      </svg>
    );
  }
  return null;
}
