/* Meta (Facebook) Pixel — configuration et helper d'événements. */

export const META_PIXEL_ID = "4551467058462611";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Envoie un événement standard Meta si le pixel est chargé.
    `eventID` permet la déduplication avec la Conversions API (serveur). */
export function trackPixel(
  event: string,
  params?: Record<string, unknown>,
  eventID?: string,
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (eventID) {
      window.fbq("track", event, params, { eventID });
    } else {
      window.fbq("track", event, params);
    }
  }
}
