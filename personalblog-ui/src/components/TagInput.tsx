import React, { useState, useRef, KeyboardEvent } from 'react';
import { useTheme } from '../hooks/useTheme';
import { X, Tag } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder = "Add tags...",
  maxTags = 10
}) => {
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tagText: string) => {
    const trimmedTag = tagText.trim().toLowerCase();
    
    if (trimmedTag && 
        !tags.includes(trimmedTag) && 
        tags.length < maxTags &&
        trimmedTag.length <= 30) {
      onChange([...tags, trimmedTag]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      removeTag(tags.length - 1);
    } else if (e.key === 'Escape') {
      setInputValue('');
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Prevent spaces from being typed (they trigger tag creation)
    if (!value.includes(' ')) {
      setInputValue(value);
    } else {
      // If space is typed, create tag from current input
      if (value.trim()) {
        addTag(value.trim());
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4" />
          <span>Tags</span>
          <span className={`text-xs ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            (Press space or enter to add)
          </span>
        </div>
      </label>
      
      <div
        onClick={handleContainerClick}
        className={`
          min-h-[42px] w-full px-3 py-2 rounded-lg border transition-all duration-200 cursor-text
          ${isFocused 
            ? 'ring-2 ring-blue-500/20 border-blue-500' 
            : 'border-gray-300 dark:border-gray-600'
          }
          ${isDarkMode
            ? 'bg-gray-700 text-white'
            : 'bg-white text-gray-900'
          }
        `}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {/* Render existing tags */}
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`
                inline-flex items-center space-x-1 px-2 py-1 text-xs rounded-full
                transition-all duration-200 group
                ${isDarkMode
                  ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50'
                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                }
              `}
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                className={`
                  p-0.5 rounded-full transition-colors duration-200
                  ${isDarkMode
                    ? 'hover:bg-blue-800/50 text-blue-400 hover:text-blue-200'
                    : 'hover:bg-blue-200 text-blue-600 hover:text-blue-800'
                  }
                `}
                title={`Remove ${tag} tag`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          
          {/* Input field */}
          {tags.length < maxTags && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={tags.length === 0 ? placeholder : ''}
              className={`
                flex-1 min-w-[120px] bg-transparent border-none outline-none
                placeholder-gray-500 dark:placeholder-gray-400
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}
              maxLength={30}
            />
          )}
        </div>
      </div>
      
      {/* Helper text */}
      <div className={`text-xs ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <div className="flex items-center justify-between">
          <span>
            {tags.length}/{maxTags} tags
            {inputValue && ` • "${inputValue}" - press space to add`}
          </span>
          {tags.length >= maxTags && (
            <span className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}>
              Maximum tags reached
            </span>
          )}
        </div>
      </div>
    </div>
  );
};