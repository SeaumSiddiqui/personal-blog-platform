import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { BlogEditorData } from '../types/blog';
import { MarkdownPreview } from './MarkdownPreview';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { TagInput } from './TagInput';
import { RelatedPostInput } from './RelatedPostInput';
import { apiEndpoints } from '../config/api';
import { 
  Save, 
  Eye, 
  EyeOff, 
  Image, 
  Code, 
  Bold, 
  Italic, 
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Upload,
  X,
  AlertCircle,
  ArrowLeft,
  ImageIcon,
  Trash2
} from 'lucide-react';

interface BlogEditorProps {
  initialData?: BlogEditorData;
  onSave: (data: BlogEditorData) => Promise<void>;
  isLoading?: boolean;
  isEditing?: boolean;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialData,
  onSave,
  isLoading = false,
  isEditing = false
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { getAuthHeader } = useAuth();
  const [showPreview, setShowPreview] = useState(true);
  const [editorData, setEditorData] = useState<BlogEditorData>({
    title: initialData?.title || '',
    author: initialData?.author || '',
    content: initialData?.content || '',
    description: initialData?.description || '',
    tags: initialData?.tags || [],
    relatedPosts: initialData?.relatedPosts || [],
    markdownUrl: initialData?.markdownUrl,
    coverURL: initialData?.coverURL || ''
  });
  
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [editorData.content]);

  const insertText = useCallback((before: string, after: string = '', placeholder: string = '', selectText: boolean = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editorData.content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newContent = 
      editorData.content.substring(0, start) +
      before + textToInsert + after +
      editorData.content.substring(end);

    setEditorData(prev => ({ ...prev, content: newContent }));
    
    // Set cursor position or select text
    setTimeout(() => {
      if (selectText && placeholder) {
        // Select the placeholder text
        const selectionStart = start + before.length;
        const selectionEnd = selectionStart + placeholder.length;
        textarea.setSelectionRange(selectionStart, selectionEnd);
      } else {
        const newCursorPos = start + before.length + textToInsert.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
      textarea.focus();
    }, 0);
  }, [editorData.content]);

  const insertHeading = useCallback((level: number) => {
    const headingText = `Heading ${level}`;
    const prefix = '#'.repeat(level) + ' ';
    insertText(prefix, '', headingText, true);
  }, [insertText]);

  const insertList = useCallback((ordered: boolean = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lines = editorData.content.split('\n');
    let currentLineIndex = 0;
    let charCount = 0;

    // Find which line the cursor is on
    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length >= start) {
        currentLineIndex = i;
        break;
      }
      charCount += lines[i].length + 1; // +1 for newline
    }

    const currentLine = lines[currentLineIndex];
    
    // Check if we're already in a list
    const orderedListRegex = /^(\s*)(\d+)\.\s/;
    const unorderedListRegex = /^(\s*)-\s/;
    
    if (ordered) {
      const match = currentLine.match(orderedListRegex);
      if (match) {
        // Already in ordered list, just add new item
        const indent = match[1];
        const nextNumber = parseInt(match[2]) + 1;
        insertText(`\n${indent}${nextNumber}. `);
      } else {
        // Start new ordered list
        insertText('1. ');
      }
    } else {
      const match = currentLine.match(unorderedListRegex);
      if (match) {
        // Already in unordered list, just add new item
        const indent = match[1];
        insertText(`\n${indent}- `);
      } else {
        // Start new unordered list
        insertText('- ');
      }
    }
  }, [editorData.content, insertText]);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(apiEndpoints.uploadImage, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const imageUrl = await response.text();
      const imageMarkdown = `![${file.name}](${imageUrl})`;
      
      // Insert the markdown immediately
      insertText(imageMarkdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleBannerUpload = async (file: File) => {
    setUploadingBanner(true);
    setError(null);

    try {
      // If there's an existing banner, delete it first
      if (editorData.coverURL) {
        try {
          await fetch(`${apiEndpoints.deleteFile}?objectUrl=${encodeURIComponent(editorData.coverURL)}`, {
            method: 'DELETE',
            headers: {
              ...getAuthHeader(),
            },
          });
        } catch (deleteError) {
          console.warn('Failed to delete previous banner:', deleteError);
          // Continue with upload even if delete fails
        }
      }

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(apiEndpoints.uploadImage, {
        method: 'POST',
        headers: {
          ...getAuthHeader(),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload banner image');
      }

      const imageUrl = await response.text();
      console.log('Banner uploaded successfully:', imageUrl);
      setEditorData(prev => ({ ...prev, coverURL: imageUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload banner image');
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
    // Reset input
    event.target.value = '';
  };

  const handleBannerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleBannerUpload(file);
    }
    // Reset input
    event.target.value = '';
  };

  const removeBanner = async () => {
    if (editorData.coverURL) {
      try {
        // Call delete API to remove the image from storage
        await fetch(`${apiEndpoints.deleteFile}?objectUrl=${encodeURIComponent(editorData.coverURL)}`, {
          method: 'DELETE',
          headers: {
            ...getAuthHeader(),
          },
        });
        console.log('Banner deleted successfully');
      } catch (error) {
        console.error('Failed to delete banner image:', error);
        // Continue with removal from state even if API call fails
      }
    }
    setEditorData(prev => ({ ...prev, coverURL: '' }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = editorData.content;
    const lines = value.split('\n');
    
    // Find current line
    let currentLineIndex = 0;
    let charCount = 0;
    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length >= start) {
        currentLineIndex = i;
        break;
      }
      charCount += lines[i].length + 1;
    }
    
    const currentLine = lines[currentLineIndex];

    if (e.key === 'Tab') {
      e.preventDefault();
      insertText('  ');
      return;
    }

    if (e.key === 'Enter') {
      // Handle list continuation
      const orderedListMatch = currentLine.match(/^(\s*)(\d+)\.\s/);
      const unorderedListMatch = currentLine.match(/^(\s*)-\s/);
      
      if (orderedListMatch) {
        e.preventDefault();
        const indent = orderedListMatch[1];
        const currentNumber = parseInt(orderedListMatch[2]);
        
        // Check if current line is empty (just the list marker)
        if (currentLine.trim() === `${currentNumber}.`) {
          // Remove the current list item and exit list mode
          const newContent = 
            value.substring(0, charCount) +
            value.substring(charCount + currentLine.length);
          setEditorData(prev => ({ ...prev, content: newContent }));
          setTimeout(() => {
            textarea.setSelectionRange(charCount, charCount);
            textarea.focus();
          }, 0);
        } else {
          // Continue with next number
          const nextNumber = currentNumber + 1;
          insertText(`\n${indent}${nextNumber}. `);
        }
        return;
      }
      
      if (unorderedListMatch) {
        e.preventDefault();
        const indent = unorderedListMatch[1];
        
        // Check if current line is empty (just the list marker)
        if (currentLine.trim() === '-') {
          // Remove the current list item and exit list mode
          const newContent = 
            value.substring(0, charCount) +
            value.substring(charCount + currentLine.length);
          setEditorData(prev => ({ ...prev, content: newContent }));
          setTimeout(() => {
            textarea.setSelectionRange(charCount, charCount);
            textarea.focus();
          }, 0);
        } else {
          // Continue with new bullet
          insertText(`\n${indent}- `);
        }
        return;
      }

      // Handle auto-closing brackets - Check if cursor is between matching brackets
      const beforeCursor = value.substring(0, start);
      const afterCursor = value.substring(start);
      const lastChar = beforeCursor.charAt(start - 1);
      const nextChar = afterCursor.charAt(0);
      
      // Check if we're between matching brackets
      const bracketPairs = { '{': '}', '[': ']', '(': ')' };
      if (bracketPairs[lastChar as keyof typeof bracketPairs] === nextChar) {
        e.preventDefault();
        
        // Get current line indentation
        const currentLineIndent = currentLine.match(/^(\s*)/)?.[1] || '';
        
        // Check if we're in a code block
        const codeBlockMatch = beforeCursor.match(/```[\w]*\n([\s\S]*?)$/);
        if (codeBlockMatch) {
          // In code block - use code indentation
          insertText(`\n${currentLineIndent}  `, `\n${currentLineIndent}`);
        } else {
          // Outside code block - use regular indentation
          insertText(`\n${currentLineIndent}  `, `\n${currentLineIndent}`);
        }
        return;
      }

      // Handle code block indentation
      const codeBlockMatch = beforeCursor.match(/```[\w]*\n([\s\S]*?)$/);
      if (codeBlockMatch) {
        const codeContent = codeBlockMatch[1];
        const lastLine = codeContent.split('\n').pop() || '';
        
        // Maintain current indentation in code blocks
        const indentMatch = lastLine.match(/^(\s*)/);
        if (indentMatch) {
          e.preventDefault();
          insertText(`\n${indentMatch[1]}`);
          return;
        }
      }
    }

    // Auto-closing brackets and quotes
    if (start === end) { // Only when no text is selected
      const autoCloseMap: { [key: string]: string } = {
        '(': ')',
        '[': ']',
        '{': '}',
        '"': '"',
        "'": "'",
        '`': '`'
      };

      if (autoCloseMap[e.key]) {
        e.preventDefault();
        const closeChar = autoCloseMap[e.key];
        const newContent = 
          value.substring(0, start) + 
          e.key + 
          closeChar + 
          value.substring(end);
        
        setEditorData(prev => ({ ...prev, content: newContent }));
        
        setTimeout(() => {
          textarea.setSelectionRange(start + 1, start + 1);
          textarea.focus();
        }, 0);
        return;
      }
    }
    
    // Handle backspace for image deletion
    if (e.key === 'Backspace') {
      if (start === end) {
        // Check if we're deleting an image
        const beforeCursor = editorData.content.substring(0, start);
        const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)$/;
        const match = beforeCursor.match(imageRegex);
        
        if (match) {
          const imageUrl = match[2];
          // Call delete API
          fetch(`${apiEndpoints.deleteFile}?objectUrl=${encodeURIComponent(imageUrl)}`, {
            method: 'DELETE',
            headers: {
              ...getAuthHeader(),
            },
          }).catch(console.error);
        }
      }
    }
  };

  const handleSave = async () => {
    if (!editorData.title.trim() || !editorData.author.trim() || !editorData.coverURL) {
      setError('Banner, title and author are required');
      return;
    }

    try {
      setError(null);
      console.log('Saving blog with coverURL:', editorData.coverURL);
      await onSave(editorData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog post');
    }
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertText('**', '**', 'bold text', true), title: 'Bold' },
    { icon: Italic, action: () => insertText('*', '*', 'italic text', true), title: 'Italic' },
    { icon: Heading1, action: () => insertHeading(1), title: 'Heading 1' },
    { icon: Heading2, action: () => insertHeading(2), title: 'Heading 2' },
    { icon: Heading3, action: () => insertHeading(3), title: 'Heading 3' },
    { icon: LinkIcon, action: () => insertText('[', '](url)', 'link text', true), title: 'Link' },
    { icon: List, action: () => insertList(false), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertList(true), title: 'Numbered List' },
    { icon: Quote, action: () => insertText('> ', '', 'quote', true), title: 'Quote' },
    { icon: Code, action: () => insertText('`', '`', 'code', true), title: 'Inline Code' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#29323c] via-[#3a4550] to-[#485563]' 
        : 'bg-gradient-to-br from-[#fdfbfb] via-[#f4f6f7] to-[#ebedee]'
    }`}>
      {/* Floating Theme Toggle */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left-aligned elements */}
          <div className="flex items-center space-x-4">
            <Link
              to="/blogs"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isEditing ? 'Edit Blog' : 'Create Blog'}
            </h1>
          </div>
          
          {/* Right-aligned elements */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                showPreview
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
            </button>
            
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Saving...' : 'Save'}</span>
            </button>

            <UserMenu />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 border-red-500 ${
            isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
          }`}>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto hover:opacity-70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Blog Meta Information */}
        <div className={`mb-6 p-6 rounded-xl shadow-sm border transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gray-800/50 border-gray-700'
            : 'bg-white/70 border-gray-200'
        }`}>
          {/* Banner Image Section */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4" />
                <span>Banner Image</span>
                <span className={`text-xs ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  (Optional - Recommended: 1200x600px)
                </span>
              </div>
            </label>
            
            {editorData.coverURL ? (
              <div className="relative group">
                <img
                  src={editorData.coverURL}
                  alt="Banner preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => bannerInputRef.current?.click()}
                      disabled={uploadingBanner}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm disabled:opacity-50"
                    >
                      {uploadingBanner ? 'Uploading...' : 'Change'}
                    </button>
                    <button
                      onClick={removeBanner}
                      disabled={uploadingBanner}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm disabled:opacity-50 flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => bannerInputRef.current?.click()}
                disabled={uploadingBanner}
                className={`w-full h-32 border-2 border-dashed rounded-lg transition-colors duration-200 flex flex-col items-center justify-center ${
                  uploadingBanner
                    ? 'opacity-50 cursor-not-allowed'
                    : isDarkMode
                    ? 'border-gray-600 hover:border-gray-500 text-gray-400 hover:bg-gray-800/30'
                    : 'border-gray-300 hover:border-gray-400 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {uploadingBanner ? (
                  <Upload className="w-8 h-8 animate-spin mb-2" />
                ) : (
                  <ImageIcon className="w-8 h-8 mb-2" />
                )}
                <span className="text-sm">
                  {uploadingBanner ? 'Uploading banner image...' : 'Click to upload banner image'}
                </span>
                <span className="text-xs mt-1 opacity-70">
                  JPG, PNG, WebP up to 10MB
                </span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Title *
              </label>
              <input
                type="text"
                value={editorData.title}
                onChange={(e) => setEditorData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter blog title..."
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Author *
              </label>
              <input
                type="text"
                value={editorData.author}
                onChange={(e) => setEditorData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Enter author name..."
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              value={editorData.description}
              onChange={(e) => setEditorData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your blog post..."
              rows={3}
              className={`w-full px-4 py-2.5 rounded-lg border transition-colors duration-200 resize-none ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          {/* Tags */}
          <div className="mt-6">
            <TagInput
              tags={editorData.tags}
              onChange={(tags) => setEditorData(prev => ({ ...prev, tags }))}
              placeholder="Add tags to categorize your post..."
              maxTags={8}
            />
          </div>

          {/* Related Posts */}
          <div className="mt-6">
            <RelatedPostInput
              relatedPosts={editorData.relatedPosts}
              onChange={(relatedPosts) => setEditorData(prev => ({ ...prev, relatedPosts }))}
              maxPosts={5}
            />
          </div>
        </div>

        {/* Editor Layout - Dynamic width based on preview state */}
        <div className={`grid gap-6 transition-all duration-300 ${
          showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}>
          {/* Editor Panel */}
          <div className={`transition-all duration-300 ${
            showPreview ? '' : 'max-w-5xl mx-auto'
          }`}>
            <div className={`rounded-xl shadow-sm border transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white/70 border-gray-200'
            }`}>
              {/* Fixed Toolbar */}
              <div className={`sticky top-20 z-30 backdrop-blur-md border-b transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
              }`}>
                <div className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center flex-wrap gap-2">
                      {toolbarButtons.map((button, index) => (
                        <button
                          key={index}
                          onClick={button.action}
                          title={button.title}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            isDarkMode
                              ? 'hover:bg-gray-700 text-gray-300'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          <button.icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => insertText('\n```\n', '\n```\n', 'code block', true)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 ${
                          isDarkMode
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Code className="w-4 h-4" />
                        <span className="hidden sm:inline">Code Block</span>
                      </button>
                      
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 ${
                          uploadingImage
                            ? 'opacity-50 cursor-not-allowed'
                            : isDarkMode
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {uploadingImage ? <Upload className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
                        <span className="hidden sm:inline">{uploadingImage ? 'Uploading...' : 'Image'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor */}
              <div className="p-4">
                <textarea
                  ref={textareaRef}
                  value={editorData.content}
                  onChange={(e) => setEditorData(prev => ({ ...prev, content: e.target.value }))}
                  onKeyDown={handleKeyDown}
                  placeholder="Start writing your blog post in Markdown..."
                  className={`w-full min-h-[600px] resize-none border-none outline-none font-mono text-sm leading-relaxed ${
                    isDarkMode
                      ? 'bg-transparent text-gray-100 placeholder-gray-500'
                      : 'bg-transparent text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className={`rounded-xl shadow-sm border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/70 border-gray-200'
              }`}>
                <div className={`p-4 border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Live Preview
                  </h3>
                </div>
                <div className="p-6 max-h-[800px] overflow-y-auto">
                  <MarkdownPreview 
                    content={editorData.content}
                    title={editorData.title}
                    author={editorData.author}
                    description={editorData.description}
                    tags={editorData.tags}
                    coverURL={editorData.coverURL}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        onChange={handleBannerSelect}
        className="hidden"
      />
    </div>
  );
};