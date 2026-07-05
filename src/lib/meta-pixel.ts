/* Meta (Facebook) Pixel — configuration et helper d'événements. */

export const META_PIXEL_ID = "4551467058462611";

type FbqArgs = [string, string, Record<string, unknown>?];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
  }
}

/** Envoie un événement standard Meta si le pixel est chargé. */
export function trackPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}
