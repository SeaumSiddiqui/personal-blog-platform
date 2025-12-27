import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { BlogPost as BlogPostType } from '../types/blog';
import { BlogReader } from '../components/BlogReader';
import { ShareButton } from '../components/ShareButton';
import { BlogActionsMenu } from '../components/BlogActionsMenu';
import { ThemeToggle } from '../components/ThemeToggle';
import { UserMenu } from '../components/UserMenu';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Footer } from '../components/Footer';
import { apiEndpoints } from '../config/api';
import { 
  ArrowLeft, 
  LogIn, 
  ExternalLink, 
  Calendar,
  User,
  Clock,
  Tag,
  Heart,
  MessageCircle,
  Bookmark,
  Sparkles
} from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, login } = useAuth();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError('Blog post ID is required');
        setLoading(false);
        return;
      }

      try {
        // Fetch blog post details (public endpoint)
        const response = await fetch(apiEndpoints.getBlogById(id));
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }

        const blogPost: BlogPostType = await response.json();
        setPost(blogPost);

        // Fetch markdown content from the URL
        const contentUrl = blogPost.markdownFileURL || blogPost.content;
        if (contentUrl) {
          const markdownResponse = await fetch(contentUrl);
          if (!markdownResponse.ok) {
            throw new Error('Failed to fetch blog content');
          }
          const markdownContent = await markdownResponse.text();
          setContent(markdownContent);
          
          // Calculate reading time (average 200 words per minute)
          const wordCount = markdownContent.split(/\s+/).length;
          const estimatedTime = Math.ceil(wordCount / 200);
          setReadingTime(estimatedTime);
        } else {
          setContent('No content available');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleDelete = () => {
    // Navigate back to home after successful deletion
    navigate('/blogs');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const extractDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode
          ? 'bg-dark-bg'
          : 'bg-light-bg'
      }`}>
        <LoadingSpinner isDarkMode={isDarkMode} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-dark-bg'
          : 'bg-light-bg'
      }`}>
        {/* Floating Theme Toggle */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>

        {/* Header */}
        <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
          isDarkMode
            ? 'bg-dark-card/80 border-dark-border'
            : 'bg-light-card/80 border-light-border'
        }`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/blogs"
                className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent"
              >
                Seaum Siddiqui
              </Link>
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <button
                    onClick={login}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isDarkMode
                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                        : 'bg-primary-400 hover:bg-primary-500 text-white'
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className={`text-center p-8 rounded-xl max-w-md transition-colors duration-300 ${
            isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
          }`}>
            <p className="text-lg font-medium mb-2">Blog post not found</p>
            <p className="text-sm opacity-80 mb-4">{error}</p>
            <Link
              to="/blogs"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog List</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentUrl = window.location.href;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-dark-bg'
        : 'bg-light-bg'
    }`}>
      <Helmet>
        <title>{post.title} | Seaum Siddiqui</title>
        <meta name="description" content={post.description || `Read ${post.title} by ${post.author}`} />
        <meta name="author" content={post.author} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description || `Read ${post.title} by ${post.author}`} />
        <meta property="og:url" content={currentUrl} />
        {post.coverURL && <meta property="og:image" content={post.coverURL} />}
        <meta property="og:site_name" content="Seaum Siddiqui" />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.createdAt} />
        {post.lastModifiedAt && <meta property="article:modified_time" content={post.lastModifiedAt} />}
        {post.tags && post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SeaumSiddiqui" />
        <meta name="twitter:creator" content="@SeaumSiddiqui" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description || `Read ${post.title} by ${post.author}`} />
        {post.coverURL && <meta name="twitter:image" content={post.coverURL} />}
      </Helmet>
      {/* Floating Theme Toggle */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDarkMode
          ? 'bg-dark-card/80 border-dark-border'
          : 'bg-light-card/80 border-light-border'
      }`}>
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left-aligned elements */}
          <div className="flex items-center space-x-4">
            <Link
              to="/blogs"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? 'hover:bg-dark-border text-dark-text'
                  : 'hover:bg-light-border text-light-text'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <Link to="/blogs" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">
              Seaum Siddiqui
            </Link>
          </div>

          {/* Right-aligned elements */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <BlogActionsMenu
                  blogId={post.id}
                  onDelete={handleDelete}
                  showReadOption={false}
                />
                <UserMenu />
              </>
            ) : (
              <button
                onClick={login}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-primary-400 hover:bg-primary-500 text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Cover Image (Full Width, No Border) */}
      {post.coverURL && (
        <div className="w-full h-[60vh] overflow-hidden">
          <img
            src={post.coverURL}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header - Only show title, description, meta, and tags */}
        <div className="mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight transition-colors duration-300 ${
            isDarkMode ? 'text-dark-text' : 'text-light-text'
          }`}>
            {post.title}
          </h1>

          {post.description && (
            <p className={`text-xl mb-8 leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              {post.description}
            </p>
          )}

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
            <div className={`flex items-center space-x-2 transition-colors duration-300 ${
              isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              <User className="w-5 h-5" />
              <span className="font-medium">{post.author}</span>
            </div>

            <div className={`flex items-center space-x-2 transition-colors duration-300 ${
              isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.createdAt || post.createdDate || '')}</span>
            </div>

            {readingTime > 0 && (
              <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
              }`}>
                <Clock className="w-5 h-5" />
                <span>{readingTime} min read</span>
              </div>
            )}

            {post.lastModifiedAt && post.lastModifiedAt !== post.createdAt && (
              <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
              }`}>
                <Clock className="w-5 h-5" />
                <span>Updated {formatDate(post.lastModifiedAt)}</span>
              </div>
            )}
          </div>

          {/* Tags and Share Button Row */}
          <div className="flex items-center justify-between mb-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <Tag className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`} />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-primary-900/30 text-primary-300 border border-primary-700/50'
                        : 'bg-primary-100 text-primary-800 border border-primary-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Button */}
            <ShareButton
              title={post.title}
              url={currentUrl}
              description={post.description}
            />
          </div>

          <hr className={`transition-colors duration-300 ${
            isDarkMode ? 'border-dark-border' : 'border-light-border'
          }`} />
        </div>

        {/* Article Content - No border, direct on background, BlogReader without header */}
        <div className="prose prose-lg max-w-none">
          <BlogReader post={post} content={content} hideHeader={true} />
        </div>

        {/* Engagement Actions */}
        <div className={`mt-12 p-6 rounded-2xl border transition-colors duration-300 ${
          isDarkMode
            ? 'bg-dark-card border-dark-border'
            : 'bg-light-card border-light-border'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? 'hover:bg-dark-border text-dark-text'
                  : 'hover:bg-light-border text-light-text'
              }`}>
                <Heart className="w-5 h-5" />
                <span>Like</span>
              </button>

              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? 'hover:bg-dark-border text-dark-text'
                  : 'hover:bg-light-border text-light-text'
              }`}>
                <MessageCircle className="w-5 h-5" />
                <span>Comment</span>
              </button>

              <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? 'hover:bg-dark-border text-dark-text'
                  : 'hover:bg-light-border text-light-text'
              }`}>
                <Bookmark className="w-5 h-5" />
                <span>Save</span>
              </button>
            </div>
            
            <ShareButton
              title={post.title}
              url={currentUrl}
              description={post.description}
            />
          </div>
        </div>

        {/* Related Posts - Small Cards Only */}
        {post.relatedPostURLs && post.relatedPostURLs.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className={`p-4 rounded-xl transition-colors duration-300 ${
                isDarkMode ? 'bg-gradient-to-br from-primary-900/30 to-primary-800/30' : 'bg-gradient-to-br from-primary-100 to-primary-200'
              }`}>
                <Sparkles className={`w-8 h-8 transition-colors duration-300 ${
                  isDarkMode ? 'text-primary-400' : 'text-primary-600'
                }`} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-dark-text' : 'text-light-text'
                }`}>
                  Continue Your Journey
                </h3>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>
                  Discover more insights and expand your knowledge
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPostURLs.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    isDarkMode
                      ? 'border-dark-border bg-gradient-to-br from-dark-card to-dark-border/50 hover:from-dark-border hover:to-dark-border/70'
                      : 'border-light-border bg-gradient-to-br from-light-card to-light-bg hover:from-primary-50 hover:to-primary-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className={`text-lg font-semibold truncate group-hover:text-primary-500 transition-colors duration-200 ${
                        isDarkMode ? 'text-dark-text' : 'text-light-text'
                      }`}>
                        {extractDomain(url)}
                      </div>
                      <div className={`text-sm truncate mt-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                      }`}>
                        {url.length > 60 ? url.substring(0, 60) + '...' : url}
                      </div>
                      <div className={`text-sm mt-4 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center space-x-1 ${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`}>
                        <span>Explore this topic</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>

                    <div className={`ml-4 p-2 rounded-lg transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-dark-border/50 group-hover:bg-primary-900/30'
                        : 'bg-light-border group-hover:bg-primary-100'
                    }`}>
                      <ExternalLink className={`w-5 h-5 transition-all duration-200 ${
                        isDarkMode
                          ? 'text-dark-text-secondary group-hover:text-primary-400 group-hover:scale-110'
                          : 'text-light-text-secondary group-hover:text-primary-600 group-hover:scale-110'
                      }`} />
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};