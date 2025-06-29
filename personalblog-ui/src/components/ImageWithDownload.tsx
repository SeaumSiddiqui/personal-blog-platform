import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Download, Loader } from 'lucide-react';

interface ImageWithDownloadProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWithDownload: React.FC<ImageWithDownloadProps> = ({ 
  src, 
  alt, 
  className = '' 
}) => {
  const { isDarkMode } = useTheme();
  const [downloading, setDownloading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extract filename from URL or use default
      const filename = src.split('/').pop() || 'image';
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={`relative group inline-block my-6 ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`max-w-[700px] max-h-[600px] w-auto h-auto rounded-lg shadow-lg border transition-all duration-300 ${
          isDarkMode 
            ? 'border-gray-700 group-hover:shadow-xl' 
            : 'border-gray-200 group-hover:shadow-xl'
        }`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      
      {/* Download button - appears on hover */}
      {imageLoaded && (
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`absolute top-0 right-3 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 ${
            downloading
              ? 'cursor-not-allowed opacity-50'
              : isDarkMode
              ? 'bg-gray-900/80 hover:bg-gray-800 text-white'
              : 'bg-white/90 hover:bg-white text-gray-700 shadow-lg'
          }`}
          title={downloading ? 'Downloading...' : 'Download image'}
        >
          {downloading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};