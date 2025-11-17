/**
 * Analytics configuration
 * Set your Google Analytics 4 measurement ID here
 *
 * To get a measurement ID:
 * 1. Go to https://analytics.google.com/
 * 2. Create a new GA4 property
 * 3. Copy the measurement ID (format: G-XXXXXXXXXX)
 * 4. Set it in the VITE_GA_MEASUREMENT_ID environment variable
 *    or replace the default value below
 */

interface AnalyticsConfig {
  /** Google Analytics 4 Measurement ID */
  measurementId: string;
  /** Enable/disable analytics */
  enabled: boolean;
  /** Debug mode (logs events to console) */
  debug: boolean;
}

export const analyticsConfig: AnalyticsConfig = {
  // Google Analytics 4 Measurement ID
  // Can be overridden with VITE_GA_MEASUREMENT_ID environment variable
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',

  // Enable/disable analytics (can be toggled for development)
  enabled: import.meta.env.PROD && !!import.meta.env.VITE_GA_MEASUREMENT_ID,

  // Debug mode (logs events to console)
  debug: import.meta.env.DEV,
} as const;
