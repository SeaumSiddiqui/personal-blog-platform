import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const { isDarkMode } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Enhanced syntax highlighting for common languages
  const highlightCode = (code: string, lang?: string): string => {
    if (!lang) return code;

    let highlighted = code;

    switch (lang.toLowerCase()) {
      case 'javascript':
      case 'js':
        // Keywords
        highlighted = highlighted.replace(
          /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|finally|new|this|typeof|instanceof)\b/g,
          '<span class="text-purple-400 font-semibold">$1</span>'
        );
        // Strings
        highlighted = highlighted.replace(
          /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
          '<span class="text-green-400">$1$2$1</span>'
        );
        // Numbers
        highlighted = highlighted.replace(
          /\b(\d+\.?\d*)\b/g,
          '<span class="text-blue-400">$1</span>'
        );
        // Comments
        highlighted = highlighted.replace(
          /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
          '<span class="text-gray-500 italic">$1</span>'
        );
        break;

      case 'typescript':
      case 'ts':
        // TypeScript keywords
        highlighted = highlighted.replace(
          /\b(interface|type|enum|namespace|declare|public|private|protected|readonly|static|abstract|implements|extends|const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|finally|new|this|typeof|instanceof)\b/g,
          '<span class="text-purple-400 font-semibold">$1</span>'
        );
        // Types
        highlighted = highlighted.replace(
          /\b(string|number|boolean|object|any|void|null|undefined|never|unknown)\b/g,
          '<span class="text-cyan-400 font-semibold">$1</span>'
        );
        // Strings
        highlighted = highlighted.replace(
          /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
          '<span class="text-green-400">$1$2$1</span>'
        );
        // Numbers
        highlighted = highlighted.replace(
          /\b(\d+\.?\d*)\b/g,
          '<span class="text-blue-400">$1</span>'
        );
        break;

      case 'python':
      case 'py':
        // Keywords
        highlighted = highlighted.replace(
          /\b(def|class|if|elif|else|for|while|try|except|finally|import|from|as|return|yield|lambda|with|pass|break|continue|and|or|not|in|is|None|True|False)\b/g,
          '<span class="text-purple-400 font-semibold">$1</span>'
        );
        // Strings
        highlighted = highlighted.replace(
          /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g,
          '<span class="text-green-400">$1$2$1</span>'
        );
        // Numbers
        highlighted = highlighted.replace(
          /\b(\d+\.?\d*)\b/g,
          '<span class="text-blue-400">$1</span>'
        );
        break;

      case 'java':
        // Keywords
        highlighted = highlighted.replace(
          /\b(public|private|protected|static|final|abstract|class|interface|extends|implements|import|package|if|else|for|while|do|switch|case|default|try|catch|finally|throw|throws|return|new|this|super|void|int|String|boolean|double|float|long|short|byte|char)\b/g,
          '<span class="text-purple-400 font-semibold">$1</span>'
        );
        // Strings
        highlighted = highlighted.replace(
          /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g,
          '<span class="text-green-400">$1$2$1</span>'
        );
        break;

      case 'html':
        // Tags
        highlighted = highlighted.replace(
          /(<\/?)([a-zA-Z][a-zA-Z0-9]*)(.*?)(>)/g,
          '<span class="text-red-400">$1</span><span class="text-blue-400">$2</span><span class="text-green-400">$3</span><span class="text-red-400">$4</span>'
        );
        break;

      case 'css':
        // Properties
        highlighted = highlighted.replace(
          /([a-zA-Z-]+)(\s*:\s*)/g,
          '<span class="text-blue-400">$1</span><span class="text-white">$2</span>'
        );
        // Values
        highlighted = highlighted.replace(
          /(:\s*)([^;]+)(;?)/g,
          '$1<span class="text-green-400">$2</span><span class="text-white">$3</span>'
        );
        break;

      case 'json':
        // Keys
        highlighted = highlighted.replace(
          /"([^"]+)"(\s*:)/g,
          '<span class="text-blue-400">"$1"</span><span class="text-white">$2</span>'
        );
        // String values
        highlighted = highlighted.replace(
          /(:\s*)"([^"]+)"/g,
          '$1<span class="text-green-400">"$2"</span>'
        );
        // Numbers
        highlighted = highlighted.replace(
          /(:\s*)(\d+\.?\d*)/g,
          '$1<span class="text-orange-400">$2</span>'
        );
        // Booleans and null
        highlighted = highlighted.replace(
          /\b(true|false|null)\b/g,
          '<span class="text-purple-400">$1</span>'
        );
        break;

      case 'bash':
      case 'shell':
      case 'sh':
        // Commands
        highlighted = highlighted.replace(
          /\b(cd|ls|mkdir|rm|cp|mv|grep|find|cat|echo|pwd|chmod|chown|sudo|apt|npm|yarn|git|docker)\b/g,
          '<span class="text-cyan-400 font-semibold">$1</span>'
        );
        // Flags
        highlighted = highlighted.replace(
          /(\s)(-{1,2}[a-zA-Z0-9-]+)/g,
          '$1<span class="text-yellow-400">$2</span>'
        );
        // Strings
        highlighted = highlighted.replace(
          /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g,
          '<span class="text-green-400">$1$2$1</span>'
        );
        break;
    }

    return highlighted;
  };

  const getLanguageDisplayName = (lang?: string): string => {
    if (!lang) return 'CODE';
    
    const languageMap: { [key: string]: string } = {
      'js': 'JavaScript',
      'javascript': 'JavaScript',
      'ts': 'TypeScript',
      'typescript': 'TypeScript',
      'py': 'Python',
      'python': 'Python',
      'java': 'Java',
      'html': 'HTML',
      'css': 'CSS',
      'json': 'JSON',
      'bash': 'Bash',
      'shell': 'Shell',
      'sh': 'Shell'
    };
    
    return languageMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className={`relative group rounded-xl overflow-hidden my-6 shadow-lg border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-700 shadow-gray-900/50' 
        : 'bg-gray-900 border-gray-700 shadow-xl'
    }`}>
      {/* Console-like header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          {/* Terminal dots */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Language indicator */}
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">
              {getLanguageDisplayName(language)}
            </span>
          </div>
        </div>
        
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
          }`}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="font-medium">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code content with console styling */}
      <div className="relative">
        {/* Line numbers background */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/50 border-r border-gray-700"></div>
        
        {/* Code content */}
        <div className="overflow-x-auto">
          <pre className="p-4 pl-16 text-sm leading-relaxed font-mono text-gray-100 min-h-[3rem]">
            {/* Line numbers */}
            <div className="absolute left-0 top-4 bottom-4 w-12 flex flex-col text-xs text-gray-500 select-none">
              {code.split('\n').map((_, index) => (
                <div key={index} className="h-[1.375rem] flex items-center justify-end pr-3">
                  {index + 1}
                </div>
              ))}
            </div>
            
            {/* Actual code */}
            <code
              className="block"
              dangerouslySetInnerHTML={{
                __html: highlightCode(code, language)
              }}
            />
          </pre>
        </div>
        
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/10 pointer-events-none"></div>
      </div>
      
      {/* Bottom border for console effect */}
      <div className="h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20"></div>
    </div>
  );
};