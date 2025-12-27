import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogFilters } from '../types/blog';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from '../components/ThemeToggle';
import { UserMenu } from '../components/UserMenu';
import { FilterSidebar } from '../components/FilterSidebar';
import { BlogCard } from '../components/BlogCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Footer } from '../components/Footer';
import { Search, SortAsc, SortDesc, Grid, List, Settings, Plus, LogIn } from 'lucide-react';

export const Home: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, isWebAdmin, login, loading: authLoading } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const [filters, setFilters] = useState<BlogFilters>({
    title: '',
    author: '',
    createdStartDate: '',
    createdEndDate: '',
    sortField: 'createdAt',
    sortDirection: 'desc',
    page: 0,
    size: 6
  });

  const { data, loading: blogLoading, error } = useBlogPosts(filters, refreshTrigger);

  const handleFilterChange = (newFilters: Partial<BlogFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 0 }));
  };

  const handleSortChange = (field: string) => {
    const newDirection = filters.sortField === field && filters.sortDirection === 'desc' ? 'asc' : 'desc';
    setFilters(prev => ({ ...prev, sortField: field, sortDirection: newDirection, page: 0 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handlePageSizeChange = (size: number) => {
    setFilters(prev => ({ ...prev, size, page: 0 }));
  };

  const handleBlogDelete = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Show loading spinner while auth is initializing
  if (authLoading) {
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
      <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 bg-light-card/80 border-light-border dark:bg-dark-card/80 dark:border-dark-border w-full">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-6">
            <Link to="/blogs" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">
              Seaum Siddiqui
            </Link>
          </div>
          
          {/* Right side - Controls and Authentication */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-light-border text-light-text-secondary dark:hover:bg-dark-border dark:text-dark-text-secondary"
              title="Toggle filters"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 border rounded-lg p-1.5 border-light-border dark:border-dark-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-primary-400 text-white dark:bg-primary-500'
                    : 'text-light-text-secondary hover:text-light-text dark:text-dark-text-secondary dark:hover:text-dark-text'
                }`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-primary-400 text-white dark:bg-primary-500'
                    : 'text-light-text-secondary hover:text-light-text dark:text-dark-text-secondary dark:hover:text-dark-text'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* New Post Button - Only for web-admin */}
                {isWebAdmin() && (
                  <Link
                    to="/create"
                    className="flex items-center space-x-2 px-4 p-2 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors duration-200 dark:bg-primary-500 dark:hover:bg-primary-600"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Post</span>
                  </Link>
                )}
                <UserMenu />
              </div>
            ) : (
              <button
                onClick={login}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 bg-primary-400 hover:bg-primary-500 text-white dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className={`transition-all duration-300 ${
            showFilters ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'
          }`}>
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Controls */}
            <div className="mb-8 p-6 rounded-xl shadow-sm border transition-colors duration-300 bg-light-card border-light-border dark:bg-dark-card dark:border-dark-border">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={filters.title}
                    onChange={(e) => handleFilterChange({ title: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors duration-200 bg-light-card border-light-border text-light-text placeholder-light-text-secondary focus:border-primary-400 dark:bg-dark-bg dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-secondary dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400/20"
                  />
                </div>

                {/* Sort Controls */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-light-text dark:text-dark-text">
                    Sort by:
                  </span>
                  <div className="flex space-x-2">
                    {[
                      { field: 'title', label: 'Title' },
                      { field: 'author', label: 'Author' },
                      { field: 'createdAt', label: 'Date' }
                    ].map(({ field, label }) => (
                      <button
                        key={field}
                        onClick={() => handleSortChange(field)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          filters.sortField === field
                            ? 'bg-primary-400 text-white dark:bg-primary-500'
                            : 'bg-light-border text-light-text hover:bg-light-border/70 dark:bg-dark-border dark:text-dark-text dark:hover:bg-dark-border/70'
                        }`}
                      >
                        <span>{label}</span>
                        {filters.sortField === field && (
                          filters.sortDirection === 'asc' ?
                            <SortAsc className="w-4 h-4" /> :
                            <SortDesc className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Posts per page */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-light-text dark:text-dark-text">
                    Per page:
                  </span>
                  <select
                    value={filters.size}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-lg border text-sm transition-colors duration-200 bg-light-card border-light-border text-light-text dark:bg-dark-bg dark:border-dark-border dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-400/20"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content */}
            {blogLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner isDarkMode={isDarkMode} />
              </div>
            ) : error ? (
              <div className="text-center py-12 px-6 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <p className="text-lg font-medium">Error loading blog posts</p>
                <p className="text-sm mt-2 opacity-80">{error}</p>
              </div>
            ) : data && data.content.length > 0 ? (
              <>
                {/* Results Info */}
                <div className="mb-6 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Showing {data.numberOfElements} of {data.totalElements} posts
                </div>

                {/* Blog Posts Grid/List */}
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                    : 'space-y-4'
                } mb-8`}>
                  {data.content.map((post) => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      viewMode={viewMode}
                      onDelete={handleBlogDelete}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={data.number}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-12 px-6 rounded-xl bg-gray-50 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400">
                <p className="text-lg font-medium">No blog posts found</p>
                <p className="text-sm mt-2 opacity-80">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};