interface ImportMetaEnv {
  // Application Environment
  readonly VITE_APP_ENV: string
  
  // Keycloak Configuration
  readonly VITE_KEYCLOAK_URL: string
  readonly VITE_KEYCLOAK_REALM: string
  readonly VITE_KEYCLOAK_CLIENT_ID: string
  
  // API Configuration
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_BLOG_ENDPOINT: string
  readonly VITE_API_PROTECTED_ENDPOINT: string
  readonly VITE_API_FILE_UPLOAD_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}