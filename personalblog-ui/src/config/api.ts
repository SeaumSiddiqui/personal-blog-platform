// API Configuration using environment variables

// Helper function to get environment variables with proper typing
const getEnvVar = (key: keyof ImportMetaEnv, defaultValue: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`⚠️ Environment variable ${key} not set. Using default: ${defaultValue}`);
  }
  return value || defaultValue;
};

// Get current environment
const isProduction = getEnvVar('VITE_APP_ENV', 'development') === 'production';

// API configuration from environment variables
export const apiConfig = {
  baseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:9090'),
  blogEndpoint: getEnvVar('VITE_API_BLOG_ENDPOINT', '/blogs'),
  protectedEndpoint: getEnvVar('VITE_API_PROTECTED_ENDPOINT', '/blogs/protected'),
  fileUploadEndpoint: getEnvVar('VITE_API_FILE_UPLOAD_ENDPOINT', '/files')
};

// API endpoints
export const apiEndpoints = {
  // Public endpoints
  getAllBlogs: `${apiConfig.baseUrl}${apiConfig.blogEndpoint}`,
  getBlogById: (id: string) => `${apiConfig.baseUrl}${apiConfig.blogEndpoint}/${id}`,

  // Protected endpoints (require authentication)
  createBlog: `${apiConfig.baseUrl}${apiConfig.protectedEndpoint}`,
  updateBlog: (id: string) => `${apiConfig.baseUrl}${apiConfig.protectedEndpoint}/${id}`,
  deleteBlog: (id: string) => `${apiConfig.baseUrl}${apiConfig.protectedEndpoint}/${id}`,

  // File upload endpoints
  uploadImage: `${apiConfig.baseUrl}${apiConfig.fileUploadEndpoint}/upload-image`,
  uploadMarkdown: `${apiConfig.baseUrl}${apiConfig.fileUploadEndpoint}/upload-markdown`,
  updateMarkdown: `${apiConfig.baseUrl}${apiConfig.fileUploadEndpoint}/update`,
  deleteFile: `${apiConfig.baseUrl}${apiConfig.fileUploadEndpoint}/delete`
};

// Environment info for debugging
export const envInfo = {
  isProduction,
  environment: getEnvVar('VITE_APP_ENV', 'dev'),
  apiBaseUrl: apiConfig.baseUrl,
  endpoints: apiConfig
};

// Log configuration in development
if (!isProduction) {
  console.log('🌐 API Configuration:', {
    environment: envInfo.environment,
    baseUrl: apiConfig.baseUrl,
    endpoints: {
      blogs: apiConfig.blogEndpoint,
      protected: apiConfig.protectedEndpoint,
      files: apiConfig.fileUploadEndpoint
    },
    fullEndpoints: apiEndpoints
  });
}