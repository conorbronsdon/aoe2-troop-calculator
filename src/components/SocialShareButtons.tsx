import { useState, ReactNode } from 'react';
import { trackSocialShare } from '../utils/analytics';
import { logger } from '../utils/errorHandler';

interface SocialButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
  bgColor: string;
  hoverColor: string;
}

/**
 * Social Share Buttons Component
 * Provides buttons to share the calculator on various social media platforms
 */
const SocialShareButtons: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const shareUrl = window.location.href;
  const shareTitle = 'Age of Empires II: Army Calculator';

  const handleCopyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackSocialShare('copy_link');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      logger.error('Failed to copy link', err);
    }
  };

  const handleSocialClick = (platform: string): void => {
    trackSocialShare(platform);
  };

  const shareLinks: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
  };

  const SocialButton: React.FC<SocialButtonProps> = ({ href, icon, label, bgColor, hoverColor }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => handleSocialClick(label.toLowerCase())}
      className={`${bgColor} ${hoverColor} text-white p-1.5 rounded transition-all duration-200 hover:scale-110 flex items-center justify-center`}
      aria-label={`Share on ${label}`}
      title={`Share on ${label}`}
    >
      {icon}
    </a>
  );

  return (
    <div className="flex items-center gap-1.5">
      {/* Twitter */}
      <SocialButton
        href={shareLinks.twitter}
        label="Twitter"
        bgColor="bg-white/20"
        hoverColor="hover:bg-white/30"
        icon={
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        }
      />

      {/* Reddit */}
      <SocialButton
        href={shareLinks.reddit}
        label="Reddit"
        bgColor="bg-white/20"
        hoverColor="hover:bg-white/30"
        icon={
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
          </svg>
        }
      />

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`${copied ? 'bg-green-500' : 'bg-white/20'} hover:bg-white/30 text-white p-1.5 rounded transition-all duration-200 hover:scale-110 flex items-center justify-center`}
        aria-label="Copy link"
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SocialShareButtons;
