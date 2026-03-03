import { CardType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an array of 30 dates starting from today
 * @returns An array of objects with 'label' and 'value' properties
 * The 'label' property is a string representing the date in the format 'Weekday, Month Day'
 * The 'value' property is a string representing the date in ISO format
 */
export const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formatted = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const value = date.toISOString().split("T")[0];
    dates.push({ label: formatted, value });
  }
  return dates;
};

/**
 * Generates an array of time slots starting from 5:00 PM to 10:00 PM with an interval of 30 minutes
 * @returns An array of objects with 'label' and 'value' properties
 * The 'label' property is a string representing the time in the format 'HH:MM AM/PM'
 * The 'value' property is a string representing the time in the format 'HH:MM'
 */
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 17; hour <= 22; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;
      const label = new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      slots.push({ label, value: time });
    }
  }
  return slots;
};

/**
 * Returns a string representing the time difference between the current time and the given date string.
 * The returned string will be in the format of "Xm ago", "Xh ago", or "Xd ago" depending on the time difference.
 * @param {string} dateStr - The date string in ISO format.
 * @returns {string} - A string representing the time difference between the current time and the given date string.
 */
export function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

/**
 * Formats a credit card number by removing all non-digit characters and trimming to 16 characters, then inserting a space every 4 characters.
 * @param {string} value - The credit card number to format.
 * @returns {string} - The formatted credit card number string.
 */
export function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

/**
 * Formats a credit card expiry date by removing all non-digit characters, trimming to 4 characters, then inserting a '/' every 2 characters.
 * If the resulting string is less than 3 characters, it will be returned as is.
 * @param {string} value - The credit card expiry date to format.
 * @returns {string} - The formatted credit card expiry date string.
 */
export function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

/**
 * Detects the type of credit card based on the card number.
 * @param {string} number - The credit card number to detect the type from.
 * @returns {CardType} - The type of credit card, can be "visa", "mastercard", "amex", "discover", or "unknown".
 */
export function detectCardType(number: string): CardType {
  const raw = number.replace(/\s/g, "");
  if (/^4/.test(raw)) return "visa";
  if (/^5[1-5]/.test(raw) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/.test(raw))
    return "mastercard";
  if (/^3[47]/.test(raw)) return "amex";
  if (/^6(?:011|5\d{2})/.test(raw)) return "discover";
  return "unknown";
}

/**
 * Checks if a given string represents a valid credit card number using the Luhn algorithm.
 * The Luhn algorithm is a simple checksum formula used to validate a variety of identification numbers, such as credit card numbers, IMEI numbers, etc.
 * @param {string} value - The string to validate using the Luhn algorithm.
 * @returns {boolean} - true if the string is a valid credit card number, false otherwise.
 */
export function luhnCheck(value: string): boolean {
  const digits = value.replace(/\s/g, "");
  if (!/^\d+$/.test(digits)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i]);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/**
 * Validates a credit card expiry date by checking if it is a valid date and if it is not in the past.
 * @param {string} value - The credit card expiry date to validate, in the format "MM/YY".
 * @returns {boolean} - true if the credit card expiry date is valid, false otherwise.
 */
export function validateExpiry(value: string): boolean {
  if (value.length !== 5) return false;
  const [mm, yy] = value.split("/");
  const month = parseInt(mm);
  const year = parseInt("20" + yy);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expDate = new Date(year, month - 1, 1);
  const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return expDate >= firstOfThisMonth;
}
