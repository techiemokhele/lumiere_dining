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
