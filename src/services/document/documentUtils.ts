/**
 * Document utility functions
 */

/**
 * Fetches image data from a URL and returns it as Uint8Array (browser-compatible)
 */
export async function fetchImageData(imageUrl: string): Promise<Uint8Array> {
  try {
    // For browser environments, we need to use fetch + ArrayBuffer
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error(`Failed to load image from ${imageUrl}:`, error);
    // Return an empty array in case of error
    return new Uint8Array();
  }
}
