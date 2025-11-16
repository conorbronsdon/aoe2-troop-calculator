/**
 * Analytics utilities for tracking user interactions
 * Supports Google Analytics 4 (gtag.js)
 */

/**
 * Initialize Google Analytics
 * @param {string} measurementId - Google Analytics measurement ID (G-XXXXXXXXXX)
 */
export const initializeAnalytics = (measurementId) => {
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
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
  });
};

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Additional event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track civilization selection
 * @param {string} civilizationId - ID of the selected civilization
 * @param {string} civilizationName - Name of the civilization
 */
export const trackCivilizationSelect = (civilizationId, civilizationName) => {
  trackEvent('civilization_selected', {
    civilization_id: civilizationId,
    civilization_name: civilizationName,
    event_category: 'engagement',
  });
};

/**
 * Track unit addition to army
 * @param {string} unitId - ID of the unit
 * @param {string} unitName - Name of the unit
 * @param {number} quantity - Quantity added
 */
export const trackUnitAdded = (unitId, unitName, quantity) => {
  trackEvent('unit_added', {
    unit_id: unitId,
    unit_name: unitName,
    quantity,
    event_category: 'engagement',
  });
};

/**
 * Track army composition save
 * @param {string} method - Save method (local, csv, url)
 */
export const trackArmySave = (method) => {
  trackEvent('army_saved', {
    save_method: method,
    event_category: 'conversion',
  });
};

/**
 * Track army composition load
 * @param {string} method - Load method (local, url)
 */
export const trackArmyLoad = (method) => {
  trackEvent('army_loaded', {
    load_method: method,
    event_category: 'engagement',
  });
};

/**
 * Track social share
 * @param {string} platform - Social platform (twitter, facebook, etc.)
 */
export const trackSocialShare = (platform) => {
  trackEvent('share', {
    method: platform,
    content_type: 'army_calculator',
    event_category: 'engagement',
  });
};

/**
 * Track export action
 * @param {string} format - Export format (csv, json, etc.)
 */
export const trackExport = (format) => {
  trackEvent('export', {
    export_format: format,
    event_category: 'conversion',
  });
};

/**
 * Track Buy Me a Coffee click
 */
export const trackDonationClick = () => {
  trackEvent('donation_click', {
    event_category: 'conversion',
    event_label: 'buy_me_coffee',
  });
};

/**
 * Track age change
 * @param {string} age - Selected age
 */
export const trackAgeChange = (age) => {
  trackEvent('age_changed', {
    age,
    event_category: 'engagement',
  });
};

/**
 * Track resource mode change
 * @param {string} mode - Resource mode (total, remaining, etc.)
 */
export const trackResourceModeChange = (mode) => {
  trackEvent('resource_mode_changed', {
    mode,
    event_category: 'engagement',
  });
};
