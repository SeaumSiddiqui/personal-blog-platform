import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BlogEditor } from '../components/BlogEditor';
import { BlogEditorData, BlogPost } from '../types/blog';
import { useTheme } from '../hooks/useTheme';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { apiEndpoints } from '../config/api';

export const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAuthHeader } = useAuth();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<BlogEditorData | null>(null);
  const [originalBlogPost, setOriginalBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError('Blog ID is required');
        setLoading(false);
        return;
      }

      try {
        // Fetch blog post details using getBlogById (public endpoint)
        const response = await fetch(apiEndpoints.getBlogById(id), {
          headers: {
            ...getAuthHeader(),
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }

        const blogPost: BlogPost = await response.json();
        setOriginalBlogPost(blogPost);

        // Fetch markdown content from the URL
        const markdownUrl = blogPost.markdownFileURL || blogPost.content;
        if (!markdownUrl) {
          throw new Error('No markdown content URL found');
        }

        const markdownResponse = await fetch(markdownUrl);
        if (!markdownResponse.ok) {
          throw new Error('Failed to fetch markdown content');
        }

        const markdownContent = await markdownResponse.text();

        setInitialData({
          title: blogPost.title,
          author: blogPost.author,
          content: markdownContent,
          description: blogPost.description || '',
          tags: blogPost.tags || [],
          relatedPosts: blogPost.relatedPostURLs || [],
          markdownUrl: markdownUrl,
          coverURL: blogPost.coverURL || ''
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id, getAuthHeader]);

  const handleSave = async (data: BlogEditorData) => {
    if (!id || !initialData?.markdownUrl || !originalBlogPost) {
      throw new Error('Missing required data for update');
    }

    try {
      // 1. Update markdown content (unchanged)
      const markdownResponse = await fetch(
        `${apiEndpoints.updateMarkdown}?objectUrl=${encodeURIComponent(initialData.markdownUrl)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'text/plain',
            ...getAuthHeader(),
          },
          body: data.content,
        }
      );

      if (!markdownResponse.ok) {
        const errorText = await markdownResponse.text();
        throw new Error(`Failed to update markdown content: ${errorText}`);
      }

      // 2. Prepare blog post metadata with cover URL
      const blogPostMetadata = {
        id: id,
        title: data.title,
        author: data.author,
        description: data.description,
        tags: data.tags,
        relatedPostURLs: data.relatedPosts,
        markdownFileURL: initialData.markdownUrl,
        coverURL: data.coverURL, // Include banner image URL
        createdAt: originalBlogPost.createdAt,
        lastModifiedAt: new Date().toISOString()
      };

      // 3. Create FormData with just the JSON part
      const formData = new FormData();
      formData.append(
        "blogpost", 
        new Blob([JSON.stringify(blogPostMetadata)], { 
          type: "application/json" 
        })
      );

      // 4. Send the update request
      const updateResponse = await fetch(apiEndpoints.updateBlog(id), {
        method: 'PUT',
        headers: getAuthHeader(), // No Content-Type header!
        body: formData
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to update blog post: ${errorText}`);
      }

      // Navigate back to blog list
      navigate('/blogs');
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
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

  if (error || !initialData) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode
          ? 'bg-dark-bg'
          : 'bg-light-bg'
      }`}>
        <div className={`text-center p-8 rounded-xl ${
          isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
        }`}>
          <p className="text-lg font-medium">Error loading blog post</p>
          <p className="text-sm mt-2 opacity-80">{error}</p>
          <button
            onClick={() => navigate('/blogs')}
            className={`mt-4 px-4 py-2 text-white rounded-lg transition-colors ${
              isDarkMode ? 'bg-primary-500 hover:bg-primary-600' : 'bg-primary-400 hover:bg-primary-500'
            }`}
          >
            Back to Blog List
          </button>
        </div>
      </div>
    );
  }

  return (
    <BlogEditor
      initialData={initialData}
      onSave={handleSave}
      isEditing={true}
    />
  );
};