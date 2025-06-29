import { useState, useEffect } from 'react';
import { BlogPost, PageResponse, BlogFilters } from '../types/blog';
import { apiEndpoints } from '../config/api';

export const useBlogPosts = (filters: BlogFilters, refreshTrigger?: number) => {
  const [data, setData] = useState<PageResponse<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query parameters for API call
        const params = new URLSearchParams();
        
        if (filters.title) params.append('title', filters.title);
        if (filters.author) params.append('author', filters.author);
        if (filters.createdStartDate) params.append('createdStartDate', filters.createdStartDate);
        if (filters.createdEndDate) params.append('createdEndDate', filters.createdEndDate);
        
        params.append('sortField', filters.sortField);
        params.append('sortDirection', filters.sortDirection);
        params.append('page', filters.page.toString());
        params.append('size', filters.size.toString());

        // Make API call to backend
        const response = await fetch(`${apiEndpoints.getAllBlogs}?${params}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: PageResponse<BlogPost> = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [filters, refreshTrigger]);

  return { data, loading, error };
};