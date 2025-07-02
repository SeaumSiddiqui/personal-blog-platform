import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BlogEditor } from '../components/BlogEditor';
import { BlogEditorData } from '../types/blog';
import { apiEndpoints } from '../config/api';

export const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  const { getAuthHeader } = useAuth();

  const handleSave = async (data: BlogEditorData) => {
    try {
      // First upload markdown content to get the URL
      const markdownResponse = await fetch(apiEndpoints.uploadMarkdown, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          ...getAuthHeader(),
        },
        body: data.content,
      });

      if (!markdownResponse.ok) {
        throw new Error('Failed to upload markdown content');
      }

      const markdownUrl = await markdownResponse.text();

      // Create blog post with the markdown URL and cover URL
      const blogPost = {
        title: data.title,
        author: data.author,
        description: data.description,
        tags: data.tags,
        relatedPostURLs: data.relatedPosts,
        markdownFileURL: markdownUrl, // Use the URL from file upload
        coverURL: data.coverURL, // Include banner image URL
        createdAt: new Date().toISOString(),
        lastModifiedAt: new Date().toISOString()
      };

      const createResponse = await fetch(apiEndpoints.createBlog, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(blogPost),
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create blog post');
      }

      // Navigate back to blog list
      navigate('/blogs');
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  };

  return (
    <BlogEditor
      onSave={handleSave}
      isEditing={false}
    />
  );
};