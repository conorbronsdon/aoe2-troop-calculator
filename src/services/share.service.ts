/**
 * Share Service
 * Handles encoding/decoding army compositions for shareable URLs
 */

import { logger } from '../utils/errorHandler';
import { ResourceLimits, Age, ResourceLimitMode } from '../types';

// Types for share service
interface ShareConfig {
  resourceLimitMode: ResourceLimitMode;
  resourceLimits: ResourceLimits;
  totalResourceLimit: number;
  populationCap: number;
  selectedAge: Age;
  selectedCiv: string;
}

interface ShareComposition {
  [unitId: string]: number;
}

interface EncodedData {
  v: number;
  c: ShareComposition;
  cfg: {
    mode: ResourceLimitMode;
    limits: ResourceLimits;
    total: number;
    pop: number;
    age: Age;
    civ: string;
  };
}

interface DecodedShareData {
  composition: ShareComposition;
  config: ShareConfig;
}

interface ShareServiceInterface {
  encode(composition: ShareComposition, config: ShareConfig): string | null;
  decode(encodedData: string): DecodedShareData | null;
  generateUrl(composition: ShareComposition, config: ShareConfig): string | null;
  copyToClipboard(url: string): Promise<boolean>;
  loadFromUrl(): DecodedShareData | null;
}

export const ShareService: ShareServiceInterface = {
  /**
   * Encode composition and config to base64 string
   * @param composition - Army composition
   * @param config - Configuration
   * @returns Base64 encoded string
   */
  encode(composition: ShareComposition, config: ShareConfig): string | null {
    const data: EncodedData = {
      v: 1, // version for future compatibility
      c: composition,
      cfg: {
        mode: config.resourceLimitMode,
        limits: config.resourceLimits,
        total: config.totalResourceLimit,
        pop: config.populationCap,
        age: config.selectedAge,
        civ: config.selectedCiv,
      },
    };

    try {
      const json = JSON.stringify(data);
      return btoa(encodeURIComponent(json));
    } catch (error) {
      logger.error('Failed to encode composition', error);
      return null;
    }
  },

  /**
   * Decode base64 string to composition and config
   * @param encodedData - Base64 encoded string
   * @returns Decoded data or null if invalid
   */
  decode(encodedData: string): DecodedShareData | null {
    try {
      const json = decodeURIComponent(atob(encodedData));
      const data: EncodedData = JSON.parse(json);

      // Validate version
      if (!data.v || data.v !== 1) {
        logger.warn('Unsupported share link version');
        return null;
      }

      return {
        composition: data.c,
        config: {
          resourceLimitMode: data.cfg.mode,
          resourceLimits: data.cfg.limits,
          totalResourceLimit: data.cfg.total,
          populationCap: data.cfg.pop,
          selectedAge: data.cfg.age,
          selectedCiv: data.cfg.civ,
        },
      };
    } catch (error) {
      logger.error('Failed to decode composition', error);
      return null;
    }
  },

  /**
   * Generate shareable URL
   * @param composition - Army composition
   * @param config - Configuration
   * @returns Full shareable URL
   */
  generateUrl(composition: ShareComposition, config: ShareConfig): string | null {
    const encoded = this.encode(composition, config);
    if (!encoded) {
      return null;
    }

    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?army=${encoded}`;
  },

  /**
   * Copy URL to clipboard
   * @param url - URL to copy
   * @returns Success status
   */
  async copyToClipboard(url: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      logger.error('Failed to copy URL to clipboard', error);
      return false;
    }
  },

  /**
   * Get composition from current URL parameters
   * @returns Decoded composition or null
   */
  loadFromUrl(): DecodedShareData | null {
    const params = new URLSearchParams(window.location.search);
    const armyData = params.get('army');

    if (!armyData) {
      return null;
    }

    return this.decode(armyData);
  },
};
