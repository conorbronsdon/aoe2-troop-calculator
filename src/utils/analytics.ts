/**
 * Analytics utilities for tracking user interactions
 * Supports Google Analytics 4 (gtag.js)
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

interface GtagConfigParams {
  send_page_view: boolean;
  cookie_flags: string;
}

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Initialize Google Analytics
 * @param measurementId - Google Analytics measurement ID (G-XXXXXXXXXX)
 */
export const initializeAnalytics = (measurementId: string): void => {
  if (!measurementId || typeof window === 'undefined') {
    return;
  }

  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
  } as GtagConfigParams);
};

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param eventParams - Additional event parameters
 */
export const trackEvent = (eventName: string, eventParams: EventParams = {}): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track civilization selection
 * @param civilizationId - ID of the selected civilization
 * @param civilizationName - Name of the civilization
 */
export const trackCivilizationSelect = (civilizationId: string, civilizationName: string): void => {
  trackEvent('civilization_selected', {
    civilization_id: civilizationId,
    civilization_name: civilizationName,
    event_category: 'engagement',
  });
};

/**
 * Track unit addition to army
 * @param unitId - ID of the unit
 * @param unitName - Name of the unit
 * @param quantity - Quantity added
 */
export const trackUnitAdded = (unitId: string, unitName: string, quantity: number): void => {
  trackEvent('unit_added', {
    unit_id: unitId,
    unit_name: unitName,
    quantity,
    event_category: 'engagement',
  });
};

/**
 * Track army composition save
 * @param method - Save method (local, csv, url)
 */
export const trackArmySave = (method: string): void => {
  trackEvent('army_saved', {
    save_method: method,
    event_category: 'conversion',
  });
};

/**
 * Track army composition load
 * @param method - Load method (local, url)
 */
export const trackArmyLoad = (method: string): void => {
  trackEvent('army_loaded', {
    load_method: method,
    event_category: 'engagement',
  });
};

/**
 * Track social share
 * @param platform - Social platform (twitter, facebook, etc.)
 */
export const trackSocialShare = (platform: string): void => {
  trackEvent('share', {
    method: platform,
    content_type: 'army_calculator',
    event_category: 'engagement',
  });
};

/**
 * Track export action
 * @param format - Export format (csv, json, etc.)
 */
export const trackExport = (format: string): void => {
  trackEvent('export', {
    export_format: format,
    event_category: 'conversion',
  });
};

/**
 * Track Buy Me a Coffee click
 */
export const trackDonationClick = (): void => {
  trackEvent('donation_click', {
    event_category: 'conversion',
    event_label: 'buy_me_coffee',
  });
};

/**
 * Track age change
 * @param age - Selected age
 */
export const trackAgeChange = (age: string): void => {
  trackEvent('age_changed', {
    age,
    event_category: 'engagement',
  });
};

/**
 * Track resource mode change
 * @param mode - Resource mode (total, remaining, etc.)
 */
export const trackResourceModeChange = (mode: string): void => {
  trackEvent('resource_mode_changed', {
    mode,
    event_category: 'engagement',
  });
};
