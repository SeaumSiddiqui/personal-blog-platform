import React, { useState, useRef, KeyboardEvent } from 'react';
import { useTheme } from '../hooks/useTheme';
import { X, Link as LinkIcon, Plus } from 'lucide-react';

interface RelatedPostInputProps {
  relatedPosts: string[];
  onChange: (posts: string[]) => void;
  maxPosts?: number;
}

export const RelatedPostInput: React.FC<RelatedPostInputProps> = ({
  relatedPosts,
  onChange,
  maxPosts = 5
}) => {
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addRelatedPost = () => {
    const trimmedUrl = inputValue.trim();
    
    if (trimmedUrl && 
        isValidUrl(trimmedUrl) &&
        !relatedPosts.includes(trimmedUrl) && 
        relatedPosts.length < maxPosts) {
      onChange([...relatedPosts, trimmedUrl]);
      setInputValue('');
    }
  };

  const removeRelatedPost = (indexToRemove: number) => {
    onChange(relatedPosts.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addRelatedPost();
      }
    } else if (e.key === 'Backspace' && !inputValue && relatedPosts.length > 0) {
      removeRelatedPost(relatedPosts.length - 1);
    } else if (e.key === 'Escape') {
      setInputValue('');
      inputRef.current?.blur();
    }
  };

  const extractDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const truncateUrl = (url: string, maxLength: number = 40): string => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className="space-y-3">
      <label className={`block text-sm font-medium ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <div className="flex items-center space-x-2">
          <LinkIcon className="w-4 h-4" />
          <span>Related Posts</span>
          <span className={`text-xs ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            (Optional)
          </span>
        </div>
      </label>

      {/* Existing Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-2">
          {relatedPosts.map((url, index) => (
            <div
              key={index}
              className={`
                flex items-center justify-between p-3 rounded-lg border
                ${isDarkMode
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
                }
              `}
            >
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {extractDomain(url)}
                </div>
                <div className={`text-xs truncate ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {truncateUrl(url, 60)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1 rounded transition-colors duration-200 ${
                    isDarkMode
                      ? 'text-gray-400 hover:text-blue-400'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                  title="Open in new tab"
                >
                  <LinkIcon className="w-4 h-4" />
                </a>
                
                <button
                  type="button"
                  onClick={() => removeRelatedPost(index)}
                  className={`p-1 rounded transition-colors duration-200 ${
                    isDarkMode
                      ? 'text-gray-400 hover:text-red-400'
                      : 'text-gray-500 hover:text-red-600'
                  }`}
                  title="Remove related post"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Related Post */}
      {relatedPosts.length < maxPosts && (
        <div className="space-y-2">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="url"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="https://example.com/related-post"
              className={`
                flex-1 px-3 py-2 rounded-lg border transition-colors duration-200
                ${isFocused 
                  ? 'ring-2 ring-blue-500/20 border-blue-500' 
                  : 'border-gray-300 dark:border-gray-600'
                }
                ${isDarkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-white text-gray-900 placeholder-gray-500'
                }
                focus:outline-none
              `}
            />
            
            <button
              type="button"
              onClick={addRelatedPost}
              disabled={!inputValue.trim() || !isValidUrl(inputValue.trim())}
              className={`
                px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2
                ${inputValue.trim() && isValidUrl(inputValue.trim())
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
          
          {inputValue && !isValidUrl(inputValue.trim()) && (
            <p className={`text-xs ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>
              Please enter a valid URL (including http:// or https://)
            </p>
          )}
        </div>
      )}
      
      {/* Helper text */}
      <div className={`text-xs ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <div className="flex items-center justify-between">
          <span>
            {relatedPosts.length}/{maxPosts} related posts
          </span>
          {relatedPosts.length >= maxPosts && (
            <span className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}>
              Maximum related posts reached
            </span>
          )}
        </div>
      </div>
    </div>
  );
};