import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { BlogPost } from '../types/blog';
import { CodeBlock } from './CodeBlock';
import { ImageWithDownload } from './ImageWithDownload';
import { Calendar, User, Clock, Tag } from 'lucide-react';

interface BlogReaderProps {
  post: BlogPost;
  content: string;
  hideHeader?: boolean; // New prop to hide the header section
}

export const BlogReader: React.FC<BlogReaderProps> = ({ post, content, hideHeader = false }) => {
  const { isDarkMode } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Enhanced markdown parser with code highlighting and image handling
  const parseMarkdown = (markdown: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const lines = markdown.split('\n');
    let currentIndex = 0;

    while (currentIndex < lines.length) {
      const line = lines[currentIndex].trim();

      // Code blocks
      if (line.startsWith('```')) {
        const language = line.substring(3).trim();
        const codeLines: string[] = [];
        currentIndex++;

        while (currentIndex < lines.length && !lines[currentIndex].trim().startsWith('```')) {
          codeLines.push(lines[currentIndex]);
          currentIndex++;
        }

        elements.push(
          <CodeBlock
            key={`code-${elements.length}`}
            code={codeLines.join('\n')}
            language={language}
          />
        );
        currentIndex++; // Skip closing ```
        continue;
      }

      // Images
      const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        elements.push(
          <ImageWithDownload
            key={`image-${elements.length}`}
            src={src}
            alt={alt}
            className="w-full flex justify-center"
          />
        );
        currentIndex++;
        continue;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${elements.length}`} className={`text-xl font-bold mb-3 mt-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {line.substring(4)}
          </h3>
        );
        currentIndex++;
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${elements.length}`} className={`text-2xl font-bold mb-4 mt-8 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {line.substring(3)}
          </h2>
        );
        currentIndex++;
        continue;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${elements.length}`} className={`text-3xl font-bold mb-6 mt-8 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {line.substring(2)}
          </h1>
        );
        currentIndex++;
        continue;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={`quote-${elements.length}`} className={`border-l-4 border-blue-500 pl-4 py-2 my-4 italic rounded-r-lg transition-colors duration-300 ${
            isDarkMode 
              ? 'text-gray-400 bg-gray-800/50' 
              : 'text-gray-700 bg-blue-50'
          }`}>
            {line.substring(2)}
          </blockquote>
        );
        currentIndex++;
        continue;
      }

      // Lists with proper indentation
      if (line.startsWith('- ') || /^\d+\.\s/.test(line)) {
        const listItems: string[] = [];
        const isOrdered = /^\d+\.\s/.test(line);

        while (currentIndex < lines.length) {
          const currentLine = lines[currentIndex].trim();
          if (currentLine.startsWith('- ') || /^\d+\.\s/.test(currentLine)) {
            listItems.push(currentLine.replace(/^(-|\d+\.)\s/, ''));
            currentIndex++;
          } else if (currentLine === '') {
            currentIndex++;
            break;
          } else {
            break;
          }
        }

        const ListComponent = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered ? 'list-decimal' : 'list-disc';

        elements.push(
          <ListComponent key={`list-${elements.length}`} className={`${listClass} mb-4 space-y-2 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`} style={{ paddingLeft: '24px' }}>
            {listItems.map((item, index) => (
              <li key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ 
                __html: parseInlineMarkdown(item) 
              }} />
            ))}
          </ListComponent>
        );
        continue;
      }

      // Regular paragraphs
      if (line) {
        elements.push(
          <p key={`p-${elements.length}`} className={`mb-4 leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`} dangerouslySetInnerHTML={{ 
            __html: parseInlineMarkdown(line) 
          }} />
        );
      }

      currentIndex++;
    }

    return elements;
  };

  // Parse inline markdown (bold, italic, links, inline code)
  const parseInlineMarkdown = (text: string): string => {
    let html = text;

    // Inline code
    html = html.replace(/`([^`]+)`/g, `<code class="px-2 py-1 rounded text-sm font-mono transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 text-red-400' : 'bg-gray-100 text-red-600'
    }">$1</code>`);

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-600 underline transition-colors duration-200" target="_blank" rel="noopener noreferrer">$1</a>');

    return html;
  };

  return (
    <article className="max-w-6xl">
      {/* Article Header - Only show if hideHeader is false */}
      {!hideHeader && (
        <header className="mb-8">
          <h1 className={`text-4xl font-bold mb-4 leading-tight transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h1>

          {post.description && (
            <p className={`text-xl mb-6 leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {post.description}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-6">
              <Tag className={`w-4 h-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta information */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt || post.createdDate || '')}</span>
              </div>

              {post.lastModifiedAt && post.lastModifiedAt !== post.createdAt && (
                <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>Updated {formatDate(post.lastModifiedAt)}</span>
                </div>
              )}
            </div>
          </div>

          <hr className={`my-8 transition-colors duration-300 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`} />
        </header>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {parseMarkdown(content)}
      </div>
    </article>
  );
};