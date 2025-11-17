import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PWAInstallPrompt from './PWAInstallPrompt';

describe('PWAInstallPrompt', () => {
  let originalMatchMedia;
  let originalLocalStorage;

  beforeEach(() => {
    // Mock matchMedia
    originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    // Mock localStorage
    originalLocalStorage = window.localStorage;
    const localStorageData = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key) => localStorageData[key] || null),
        setItem: vi.fn((key, value) => {
          localStorageData[key] = value;
        }),
        removeItem: vi.fn((key) => {
          delete localStorageData[key];
        }),
        clear: vi.fn(() => {
          Object.keys(localStorageData).forEach((key) => delete localStorageData[key]);
        }),
      },
      writable: true,
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.localStorage = originalLocalStorage;
    vi.restoreAllMocks();
  });

  describe('rendering', () => {
    it('should not render by default (no prompt available)', () => {
      render(<PWAInstallPrompt />);
      expect(screen.queryByText('Install AoE2 Calculator')).not.toBeInTheDocument();
    });

    it('should not render when app is already installed', () => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(display-mode: standalone)',
        media: query,
      }));

      render(<PWAInstallPrompt />);
      expect(screen.queryByText('Install AoE2 Calculator')).not.toBeInTheDocument();
    });

    it('should render when beforeinstallprompt event fires', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      expect(screen.getByText('Install AoE2 Calculator')).toBeInTheDocument();
    });

    it('should display install description', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      expect(
        screen.getByText(/Install this app for offline access and faster load times/)
      ).toBeInTheDocument();
    });

    it('should show Install App button', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      expect(screen.getByText('Install App')).toBeInTheDocument();
    });

    it('should show Not now button', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      expect(screen.getByText('Not now')).toBeInTheDocument();
    });

    it('should show dismiss button with correct aria-label', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      expect(screen.getByLabelText('Dismiss install prompt')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should dismiss prompt when "Not now" is clicked', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      fireEvent.click(screen.getByText('Not now'));

      expect(screen.queryByText('Install AoE2 Calculator')).not.toBeInTheDocument();
    });

    it('should dismiss prompt when X button is clicked', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      fireEvent.click(screen.getByLabelText('Dismiss install prompt'));

      expect(screen.queryByText('Install AoE2 Calculator')).not.toBeInTheDocument();
    });

    it('should store dismissal timestamp in localStorage', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      const beforeDismiss = Date.now();
      fireEvent.click(screen.getByText('Not now'));

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'pwa-install-dismissed',
        expect.any(String)
      );

      const storedTime = parseInt(window.localStorage.setItem.mock.calls[0][1], 10);
      expect(storedTime).toBeGreaterThanOrEqual(beforeDismiss);
      expect(storedTime).toBeLessThanOrEqual(Date.now());
    });

    it('should call prompt() on deferredPrompt when Install App is clicked', async () => {
      render(<PWAInstallPrompt />);

      const mockPrompt = vi.fn();
      const mockUserChoice = Promise.resolve({ outcome: 'dismissed' });

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        event.prompt = mockPrompt;
        event.userChoice = mockUserChoice;
        window.dispatchEvent(event);
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Install App'));
        await mockUserChoice;
      });

      expect(mockPrompt).toHaveBeenCalled();
    });

    it('should hide prompt when user accepts installation', async () => {
      render(<PWAInstallPrompt />);

      const mockPrompt = vi.fn();
      const mockUserChoice = Promise.resolve({ outcome: 'accepted' });

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        event.prompt = mockPrompt;
        event.userChoice = mockUserChoice;
        window.dispatchEvent(event);
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Install App'));
        await mockUserChoice;
      });

      expect(screen.queryByText('Install AoE2 Calculator')).not.toBeInTheDocument();
    });

    it('should hide prompt when appinstalled event fires', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      expect(screen.getByText('Install AoE2 Calculator')).toBeInTheDocument();

      act(() => {
        window.dispatchEvent(new Event('appinstalled'));
      });

      expect(screen.queryByText('Install AoE2 Calculator')).not.toBeInTheDocument();
    });
  });

  describe('dismissal persistence', () => {
    it('should not show prompt if dismissed within last 7 days', () => {
      // Set dismissal to 1 day ago
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      window.localStorage.getItem = vi.fn().mockReturnValue(oneDayAgo.toString());

      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      // Should not show because dismissed recently
      expect(screen.queryByText('Install AoE2 Calculator')).not.toBeInTheDocument();
    });

    it('should show prompt if dismissed more than 7 days ago', () => {
      // Set dismissal to 8 days ago
      const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
      window.localStorage.getItem = vi.fn().mockReturnValue(eightDaysAgo.toString());

      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      expect(screen.getByText('Install AoE2 Calculator')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper button structure', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      const installButton = screen.getByText('Install App');
      expect(installButton.tagName).toBe('BUTTON');

      const notNowButton = screen.getByText('Not now');
      expect(notNowButton.tagName).toBe('BUTTON');
    });

    it('should display mobile icon emoji', () => {
      render(<PWAInstallPrompt />);

      act(() => {
        const event = new Event('beforeinstallprompt');
        event.preventDefault = vi.fn();
        window.dispatchEvent(event);
      });

      expect(screen.getByText('📱')).toBeInTheDocument();
    });
  });

  describe('cleanup', () => {
    it('should remove event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = render(<PWAInstallPrompt />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'beforeinstallprompt',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith('appinstalled', expect.any(Function));
    });
  });
});
