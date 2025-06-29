import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { CodeBlock } from './CodeBlock';
import { Calendar, User, Tag } from 'lucide-react';

interface MarkdownPreviewProps {
  content: string;
  title?: string;
  author?: string;
  description?: string;
  tags?: string[];
  coverURL?: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  title,
  author,
  description,
  tags,
  coverURL
}) => {
  const { isDarkMode } = useTheme();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Enhanced markdown parser for preview with better code block handling
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

      // Images
      const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        elements.push(
          <div key={`image-${elements.length}`} className="my-6">
            <img
              src={src}
              alt={alt}
              className={`max-w-full h-auto rounded-lg shadow-lg border transition-colors duration-300 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
              loading="lazy"
            />
          </div>
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
    <div className="prose max-w-none">
      {/* Blog Header */}
      {title && (
        <div className="mb-8">
          {/* Banner Image */}
          {coverURL && (
            <div className="mb-6 -mx-6">
              <img
                src={coverURL}
                alt={title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <h1 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h1>
          
          {description && (
            <p className={`text-lg mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {description}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-6">
              <Tag className={`w-4 h-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-blue-900/30 text-blue-300'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center space-x-6 text-sm">
            {author && (
              <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <User className="w-4 h-4" />
                <span className="font-medium">{author}</span>
              </div>
            )}
            
            <div className={`flex items-center space-x-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Calendar className="w-4 h-4" />
              <span>{formatDate(new Date())}</span>
            </div>
          </div>
          
          <hr className={`my-6 transition-colors duration-300 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`} />
        </div>
      )}

      {/* Content */}
      <div className={`leading-relaxed transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {content ? parseMarkdown(content) : (
          <p className={`italic transition-colors duration-300 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Start writing to see preview...
          </p>
        )}
      </div>
    </div>
  );
};