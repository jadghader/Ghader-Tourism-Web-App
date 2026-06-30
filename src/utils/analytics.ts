// Google Analytics 4 (GA4) Tracking Utility for Ghader Tourism
// Provides direct, lightweight integration with GA4 for page views and custom events

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Support a configurable Measurement ID with a reliable default fallback
export const GA_MEASUREMENT_ID = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID || "G-K4L6G6Z7X1";

/**
 * Initializes the GA4 global tag script in the document head and triggers configuration.
 */
export function initGA() {
  if (typeof window === "undefined") return;

  // Prevent multiple initializations
  if (window.gtag) return;

  try {
    // 1. Inject Google Tag script element
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Set up the dataLayer array and gtag wrapper function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // 3. Perform initial config
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false, // Turned off default to let our SPA control custom page views
      cookie_flags: "SameSite=None;Secure" // Secure cookies in iframed dev spaces
    });

    console.log(`[Analytics] Google Analytics 4 successfully initialized with ID: ${GA_MEASUREMENT_ID}`);
  } catch (error) {
    console.error("[Analytics] Failed to initialize Google Analytics:", error);
  }
}

/**
 * Tracks SPA-style custom page views.
 * @param pagePath The relative URL path or custom view name (e.g. '/#tours', '/#fleet')
 * @param pageTitle The human-friendly title of the current view/page
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  } catch (error) {
    console.error("[Analytics] Error tracking page view:", error);
  }
}

/**
 * Tracks custom user interactions and engagement events (e.g. WhatsApp clicks, vehicle select).
 * @param action Event name (e.g., 'click_whatsapp_booking', 'select_vehicle')
 * @param category Broad group (e.g., 'Engagement', 'Conversions')
 * @param label Additional context string (e.g., vehicle name, selected tour)
 * @param value Numeric value if applicable
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: GA_MEASUREMENT_ID,
    });
  } catch (error) {
    console.error("[Analytics] Error tracking custom event:", error);
  }
}
