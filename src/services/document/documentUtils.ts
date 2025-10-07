
/**
 * Document utility functions
 */
import { nextSaturday, format } from 'date-fns';

/**
 * Fetches image data from a URL and returns it as Uint8Array (browser-compatible)
 */
export async function fetchImageData(imageUrl: string): Promise<Uint8Array> {
  try {
    // For browser environments, we need to use fetch + ArrayBuffer
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      return new Uint8Array();
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error(`Failed to load image from ${imageUrl}:`, error);
    // Return an empty array in case of error
    return new Uint8Array();
  }
}

/**
 * Gets the next Saturday from today and formats it as "DD MMMM YYYY"
 * Example: "11 October 2025"
 */
export function getNextSaturdayFormatted(): string {
  const today = new Date();
  const saturday = nextSaturday(today);
  return format(saturday, 'd MMMM yyyy');
}
