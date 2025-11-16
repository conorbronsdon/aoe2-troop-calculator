/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ShareService } from './share.service';

describe('ShareService', () => {
  const mockComposition = { militia: 10, archer: 5 };
  const mockConfig = {
    resourceLimitMode: 'total',
    resourceLimits: { food: 8000, wood: 8000, gold: 4000, stone: 0 },
    totalResourceLimit: 20000,
    populationCap: 200,
    selectedAge: 'imperial',
    selectedCiv: 'britons'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.location
    delete window.location;
    window.location = {
      origin: 'https://example.com',
      pathname: '/calculator',
      search: ''
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('encode', () => {
    it('should encode composition and config to base64', () => {
      const encoded = ShareService.encode(mockComposition, mockConfig);

      expect(encoded).toBeDefined();
      expect(typeof encoded).toBe('string');
      expect(encoded.length).toBeGreaterThan(0);
    });

    it('should produce valid base64 string', () => {
      const encoded = ShareService.encode(mockComposition, mockConfig);

      // Should not throw when decoding
      expect(() => atob(encoded)).not.toThrow();
    });

    it('should include version number in encoded data', () => {
      const encoded = ShareService.encode(mockComposition, mockConfig);
      const decoded = JSON.parse(decodeURIComponent(atob(encoded)));

      expect(decoded.v).toBe(1);
    });

    it('should handle special characters in data', () => {
      const specialConfig = {
        ...mockConfig,
        selectedCiv: 'teutöns' // Special character
      };

      const encoded = ShareService.encode(mockComposition, specialConfig);
      expect(encoded).toBeDefined();
    });
  });

  describe('decode', () => {
    it('should decode base64 string to composition and config', () => {
      const encoded = ShareService.encode(mockComposition, mockConfig);
      const decoded = ShareService.decode(encoded);

      expect(decoded).toBeDefined();
      expect(decoded.composition).toEqual(mockComposition);
      expect(decoded.config.selectedAge).toBe(mockConfig.selectedAge);
      expect(decoded.config.selectedCiv).toBe(mockConfig.selectedCiv);
    });

    it('should return null for invalid base64', () => {
      const result = ShareService.decode('not-valid-base64!!!');
      expect(result).toBeNull();
    });

    it('should return null for invalid JSON', () => {
      const invalidBase64 = btoa('not json');
      const result = ShareService.decode(invalidBase64);
      expect(result).toBeNull();
    });

    it('should return null for unsupported version', () => {
      const data = {
        v: 999, // Unsupported version
        c: mockComposition,
        cfg: {}
      };
      const encoded = btoa(encodeURIComponent(JSON.stringify(data)));

      const result = ShareService.decode(encoded);
      expect(result).toBeNull();
    });

    it('should handle roundtrip encode/decode', () => {
      const encoded = ShareService.encode(mockComposition, mockConfig);
      const decoded = ShareService.decode(encoded);

      expect(decoded.composition).toEqual(mockComposition);
      expect(decoded.config.resourceLimitMode).toBe(mockConfig.resourceLimitMode);
      expect(decoded.config.resourceLimits).toEqual(mockConfig.resourceLimits);
      expect(decoded.config.totalResourceLimit).toBe(mockConfig.totalResourceLimit);
      expect(decoded.config.populationCap).toBe(mockConfig.populationCap);
    });
  });

  describe('generateUrl', () => {
    it('should generate full shareable URL', () => {
      const url = ShareService.generateUrl(mockComposition, mockConfig);

      expect(url).toContain('https://example.com/calculator');
      expect(url).toContain('?army=');
    });

    it('should include encoded data in URL', () => {
      const url = ShareService.generateUrl(mockComposition, mockConfig);
      const armyParam = url.split('?army=')[1];

      expect(armyParam).toBeDefined();
      expect(armyParam.length).toBeGreaterThan(0);
    });

    it('should return null if encoding fails', () => {
      const originalEncode = ShareService.encode;
      ShareService.encode = vi.fn(() => null);

      const url = ShareService.generateUrl(mockComposition, mockConfig);
      expect(url).toBeNull();

      ShareService.encode = originalEncode;
    });
  });

  describe('copyToClipboard', () => {
    it('should copy URL to clipboard', async () => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined)
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true
      });

      const result = await ShareService.copyToClipboard('https://example.com');

      expect(result).toBe(true);
      expect(mockClipboard.writeText).toHaveBeenCalledWith('https://example.com');
    });

    it('should return false on clipboard error', async () => {
      const mockClipboard = {
        writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true
      });

      const result = await ShareService.copyToClipboard('https://example.com');

      expect(result).toBe(false);
    });
  });

  describe('loadFromUrl', () => {
    it('should load composition from URL parameters', () => {
      const encoded = ShareService.encode(mockComposition, mockConfig);
      window.location.search = `?army=${encoded}`;

      const result = ShareService.loadFromUrl();

      expect(result).toBeDefined();
      expect(result.composition).toEqual(mockComposition);
    });

    it('should return null when no army parameter', () => {
      window.location.search = '';

      const result = ShareService.loadFromUrl();
      expect(result).toBeNull();
    });

    it('should return null for invalid army parameter', () => {
      window.location.search = '?army=invalid-data';

      const result = ShareService.loadFromUrl();
      expect(result).toBeNull();
    });
  });
});
