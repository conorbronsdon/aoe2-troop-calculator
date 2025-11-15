/**
 * Share Service
 * Handles encoding/decoding army compositions for shareable URLs
 */

export const ShareService = {
  /**
   * Encode composition and config to base64 string
   * @param {Object} composition - Army composition
   * @param {Object} config - Configuration
   * @returns {string} Base64 encoded string
   */
  encode(composition, config) {
    const data = {
      v: 1, // version for future compatibility
      c: composition,
      cfg: {
        mode: config.resourceLimitMode,
        limits: config.resourceLimits,
        total: config.totalResourceLimit,
        pop: config.populationCap,
        age: config.selectedAge,
        civ: config.selectedCiv
      }
    };

    try {
      const json = JSON.stringify(data);
      return btoa(encodeURIComponent(json));
    } catch (error) {
      console.error('Failed to encode composition:', error);
      return null;
    }
  },

  /**
   * Decode base64 string to composition and config
   * @param {string} encodedData - Base64 encoded string
   * @returns {Object|null} Decoded data or null if invalid
   */
  decode(encodedData) {
    try {
      const json = decodeURIComponent(atob(encodedData));
      const data = JSON.parse(json);

      // Validate version
      if (!data.v || data.v !== 1) {
        console.warn('Unsupported share link version');
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
          selectedCiv: data.cfg.civ
        }
      };
    } catch (error) {
      console.error('Failed to decode composition:', error);
      return null;
    }
  },

  /**
   * Generate shareable URL
   * @param {Object} composition - Army composition
   * @param {Object} config - Configuration
   * @returns {string} Full shareable URL
   */
  generateUrl(composition, config) {
    const encoded = this.encode(composition, config);
    if (!encoded) return null;

    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?army=${encoded}`;
  },

  /**
   * Copy URL to clipboard
   * @param {string} url - URL to copy
   * @returns {Promise<boolean>} Success status
   */
  async copyToClipboard(url) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
      return false;
    }
  },

  /**
   * Get composition from current URL parameters
   * @returns {Object|null} Decoded composition or null
   */
  loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const armyData = params.get('army');

    if (!armyData) return null;

    return this.decode(armyData);
  }
};
