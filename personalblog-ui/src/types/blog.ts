export interface BlogPost {
  id: string;
  title: string;
  description?: string;
  author: string;
  markdownFileURL?: string;
  content?: string; // For backward compatibility
  coverURL?: string; // Fixed field name to match backend
  tags?: string[];
  imageURLs?: string[];
  relatedPostURLs?: string[];
  createdAt: string;
  lastModifiedAt?: string;
  // Legacy fields for compatibility with older API versions
  createdDate?: string;
  updatedDate?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface BlogFilters {
  title?: string;
  author?: string;
  createdStartDate?: string;
  createdEndDate?: string;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  page: number;
  size: number;
}

export interface BlogEditorData {
  title: string;
  author: string;
  content: string;
  description?: string;
  tags: string[];
  relatedPosts: string[];
  markdownUrl?: string;
  coverURL?: string; // Fixed field name to match backend
}

export interface ImageUploadResponse {
  url: string;
}

export interface MarkdownUploadResponse {
  url: string;
}