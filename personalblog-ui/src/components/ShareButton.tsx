import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { 
  Share2, 
  Copy, 
  Check, 
  Twitter, 
  Facebook, 
  Linkedin, 
  X 
} from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url: string;
  description?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  title, 
  url, 
  description = '' 
}) => {
  const { isDarkMode } = useTheme();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOptions = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-500 hover:text-white'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-blue-700 hover:text-white'
    }
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
          isDarkMode
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {/* Share menu */}
      {showShareMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* Menu */}
          <div className={`absolute right-0 top-full mt-2 w-64 rounded-lg shadow-lg border z-50 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-4">
              <h3 className={`text-sm font-medium mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Share this post
              </h3>
              
              {/* Social share buttons */}
              <div className="space-y-2 mb-4">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleShare(option.url)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${option.color}`}
                  >
                    <option.icon className="w-4 h-4" />
                    <span>Share on {option.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Copy link */}
              <div className={`pt-3 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <button
                  onClick={handleCopyLink}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    copied
                      ? 'text-green-600 dark:text-green-400'
                      : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Link copied!' : 'Copy link'}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};