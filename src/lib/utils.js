import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes intelligently.
 * Uses clsx for conditional classes and tailwind-merge
 * to resolve conflicting Tailwind utilities.
 *
 * @param  {...any} inputs - Class values (strings, objects, arrays)
 * @returns {string} - Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
