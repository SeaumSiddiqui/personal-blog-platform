import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/blog';
import { BlogActionsMenu } from './BlogActionsMenu';
import { Portal } from './Portal';
import { Calendar, User, Clock, Tag, Share2, Copy, Check, Twitter, Facebook, Linkedin } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  viewMode: 'grid' | 'list';
  onDelete?: () => void;
}

// Custom Share Button Component for Cards
const CardShareButton: React.FC<{ title: string; url: string; description?: string }> = ({ 
  title, 
  url, 
  description = 'Check out this post!' 
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
      color: 'hover:bg-blue-700 hover:text-white'
    }
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleToggleMenu = () => {
    if (!showShareMenu && buttonRef.current) {
      // Calculate position when opening menu
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      setMenuPosition({
        top: rect.bottom + scrollY + 8, // 8px gap below button
        left: rect.right + scrollX - 224, // 224px is menu width (w-56 = 14rem = 224px), align right edge
        width: rect.width
      });
    }
    setShowShareMenu(!showShareMenu);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggleMenu}
        className="p-2 rounded-lg transition-colors duration-200 hover:bg-light-border text-light-text-secondary hover:text-light-text dark:hover:bg-dark-border dark:text-dark-text-secondary dark:hover:text-dark-text"
        title="Share post"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Share menu rendered in portal */}
      {showShareMenu && (
        <Portal>
          {/* Backdrop */}
          <div
            className="fixed inset-0"
            style={{ zIndex: 1000 }}
            onClick={() => setShowShareMenu(false)}
          />

          {/* Menu positioned absolutely */}
          <div
            className="w-56 rounded-lg shadow-xl border bg-light-card border-light-border dark:bg-dark-card dark:border-dark-border"
            style={{
              position: 'absolute',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              zIndex: 1001
            }}
          >
            <div className="p-3">
              <h3 className="text-sm font-medium mb-3 text-light-text dark:text-dark-text">
                Share this post
              </h3>

              {/* Social share buttons */}
              <div className="space-y-1 mb-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleShare(option.url)}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 text-light-text hover:bg-light-border dark:text-dark-text dark:hover:bg-dark-border"
                  >
                    <option.icon className="w-4 h-4" />
                    <span>Share on {option.name}</span>
                  </button>
                ))}
              </div>

              {/* Copy link */}
              <div className="pt-2 border-t border-light-border dark:border-dark-border">
                <button
                  onClick={handleCopyLink}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    copied
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-light-text hover:bg-light-border dark:text-dark-text dark:hover:bg-dark-border'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Link copied!' : 'Copy link'}</span>
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export const BlogCard: React.FC<BlogCardProps> = ({ post, viewMode, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Use the new date fields or fall back to legacy ones
  const createdDate = post.createdAt || post.createdDate || '';
  const updatedDate = post.lastModifiedAt || post.updatedDate || '';
  const currentUrl = `${window.location.origin}/post/${post.id}`;

  if (viewMode === 'list') {
    return (
      <div className="group p-6 rounded-xl shadow-md border transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:border-primary-400/50 bg-light-card border-light-border hover:shadow-primary-500/20 dark:bg-dark-card dark:border-dark-border dark:hover:border-primary-500/50 dark:hover:shadow-primary-500/30">
        <div className="flex gap-6">
          {/* Banner Image */}
          {post.coverURL && (
            <div className="flex-shrink-0 overflow-hidden rounded-lg">
              <Link to={`/post/${post.id}`}>
                <img
                  src={post.coverURL}
                  alt={post.title}
                  className="w-48 h-32 object-cover rounded-lg border border-light-border dark:border-dark-border group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link to={`/post/${post.id}`}>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 text-light-text dark:text-dark-text">
                    {post.title}
                  </h3>
                </Link>

                {post.description && (
                  <p className="text-sm mb-4 line-clamp-2 text-light-text-secondary dark:text-dark-text-secondary">
                    {post.description}
                  </p>
                )}

                {/* Tags and Share Button Row */}
                <div className="flex items-center justify-between mb-4">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2">
                      <Tag className="w-3 h-3 text-light-text-secondary dark:text-dark-text-secondary" />
                      {post.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 4 && (
                        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          +{post.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Share Button - Visible on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <CardShareButton
                      title={post.title}
                      url={currentUrl}
                      description={post.description || 'Check out this interesting blog post!'}
                    />
                  </div>
                </div>

                {/* Separator */}
                <hr className="my-4 border-light-border dark:border-dark-border" />

                {/* Meta information */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-light-text-secondary dark:text-dark-text-secondary">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-light-text-secondary dark:text-dark-text-secondary">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(createdDate)}</span>
                    </div>

                    {updatedDate !== createdDate && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Updated {formatDate(updatedDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="ml-4">
                <BlogActionsMenu 
                  blogId={post.id} 
                  onDelete={onDelete}
                  showReadOption={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl shadow-md border transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:border-primary-400/50 hover:shadow-primary-500/20 bg-light-card border-light-border dark:bg-dark-card dark:border-dark-border dark:hover:border-primary-500/50 dark:hover:shadow-primary-500/30 h-fit overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Banner Image */}
        {post.coverURL && (
          <div className="relative overflow-hidden">
            <Link to={`/post/${post.id}`}>
              <img
                src={post.coverURL}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <Link to={`/post/${post.id}`} className="flex-1">
              <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200 text-light-text dark:text-dark-text">
                {post.title}
              </h3>
            </Link>

            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <BlogActionsMenu
                blogId={post.id}
                onDelete={onDelete}
                showReadOption={true}
              />
            </div>
          </div>

          {post.description && (
            <p className="text-sm mb-3 line-clamp-2 flex-1 text-light-text-secondary dark:text-dark-text-secondary">
              {post.description}
            </p>
          )}

          {/* Tags and Share Button Row */}
          <div className="flex items-center justify-between mb-3">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-1">
                <Tag className="w-3 h-3 text-light-text-secondary dark:text-dark-text-secondary" />
                {post.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Share Button - Visible on hover, using custom component */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <CardShareButton
                title={post.title}
                url={currentUrl}
                description={post.description || 'Check out this interesting blog post!'}
              />
            </div>
          </div>

          {/* Separator */}
          <hr className="my-3 border-light-border dark:border-dark-border" />

          {/* Meta information */}
          <div className="space-y-2 mt-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-light-text-secondary dark:text-dark-text-secondary">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(createdDate)}</span>
              </div>

              {updatedDate !== createdDate && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Updated</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};