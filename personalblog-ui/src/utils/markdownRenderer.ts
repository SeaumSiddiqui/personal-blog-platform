export const renderMarkdownToHtml = (markdown: string, isDarkMode: boolean): string => {
  let html = markdown;

  // Code blocks (must be processed before inline code)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, language, code) => {
    const lang = language || '';
    return `<pre class="p-4 rounded-lg my-4 overflow-x-auto border-l-4 border-blue-500 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
    }"><code class="text-sm font-mono language-${lang}">${code.trim()}</code></pre>`;
  });

  // Headers
  html = html.replace(/^### (.*$)/gim, `<h3 class="text-xl font-bold mb-3 mt-6 transition-colors duration-300 ${
    isDarkMode ? 'text-white' : 'text-gray-900'
  }">$1</h3>`);
  html = html.replace(/^## (.*$)/gim, `<h2 class="text-2xl font-bold mb-4 mt-8 transition-colors duration-300 ${
    isDarkMode ? 'text-white' : 'text-gray-900'
  }">$1</h2>`);
  html = html.replace(/^# (.*$)/gim, `<h1 class="text-3xl font-bold mb-6 mt-8 transition-colors duration-300 ${
    isDarkMode ? 'text-white' : 'text-gray-900'
  }">$1</h1>`);

  // Bold and Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-600 underline transition-colors duration-200" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images - Enhanced with better styling
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, `<div class="my-6"><img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-lg border transition-colors duration-300 ${
    isDarkMode ? 'border-gray-700' : 'border-gray-200'
  }" loading="lazy" /></div>`);

  // Inline code (after code blocks)
  html = html.replace(/`([^`]+)`/g, `<code class="px-2 py-1 rounded text-sm font-mono transition-colors duration-300 ${
    isDarkMode ? 'bg-gray-800 text-red-400' : 'bg-gray-100 text-red-600'
  }">$1</code>`);

  // Enhanced list processing with proper indentation
  const lines = html.split('\n');
  const processedLines = [];
  let inOrderedList = false;
  let inUnorderedList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Ordered list items with proper indentation
    const orderedMatch = line.match(/^(\s*)(\d+)\.\s(.*)$/);
    if (orderedMatch) {
      const indent = orderedMatch[1];
      const content = orderedMatch[3];
      
      if (!inOrderedList) {
        if (inUnorderedList) {
          processedLines.push('</ul>');
          inUnorderedList = false;
        }
        processedLines.push(`<ol class="list-decimal mb-4 space-y-2 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }" style="padding-left: ${indent.length * 8 + 24}px;">`);
        inOrderedList = true;
      }
      
      processedLines.push(`<li class="leading-relaxed">${content}</li>`);
      continue;
    }
    
    // Unordered list items with proper indentation
    const unorderedMatch = line.match(/^(\s*)-\s(.*)$/);
    if (unorderedMatch) {
      const indent = unorderedMatch[1];
      const content = unorderedMatch[2];
      
      if (!inUnorderedList) {
        if (inOrderedList) {
          processedLines.push('</ol>');
          inOrderedList = false;
        }
        processedLines.push(`<ul class="list-disc mb-4 space-y-2 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }" style="padding-left: ${indent.length * 8 + 24}px;">`);
        inUnorderedList = true;
      }
      
      processedLines.push(`<li class="leading-relaxed">${content}</li>`);
      continue;
    }
    
    // Close lists if we encounter non-list content
    if (trimmedLine && !orderedMatch && !unorderedMatch) {
      if (inOrderedList) {
        processedLines.push('</ol>');
        inOrderedList = false;
      }
      if (inUnorderedList) {
        processedLines.push('</ul>');
        inUnorderedList = false;
      }
    }
    
    // Quotes
    if (trimmedLine.startsWith('> ')) {
      const quoteContent = trimmedLine.substring(2);
      processedLines.push(`<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic rounded-r-lg transition-colors duration-300 ${
        isDarkMode ? 'text-gray-400 bg-gray-800/50' : 'text-gray-700 bg-blue-50'
      }">${quoteContent}</blockquote>`);
      continue;
    }
    
    // Regular paragraphs
    if (trimmedLine && 
        !trimmedLine.startsWith('<') && 
        !trimmedLine.startsWith('#') &&
        !trimmedLine.startsWith('```')) {
      processedLines.push(`<p class="mb-4 leading-relaxed transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }">${line}</p>`);
    } else {
      processedLines.push(line);
    }
  }
  
  // Close any remaining open lists
  if (inOrderedList) {
    processedLines.push('</ol>');
  }
  if (inUnorderedList) {
    processedLines.push('</ul>');
  }
  
  html = processedLines.join('\n');

  return html;
};