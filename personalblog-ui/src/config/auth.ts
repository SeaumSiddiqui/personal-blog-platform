// Centralized authentication configuration using environment variables

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

// Keycloak configuration from environment variables
export const authConfig = {
  url: getEnvVar('VITE_KEYCLOAK_URL', 'http://localhost:8080'),
  realm: getEnvVar('VITE_KEYCLOAK_REALM', 'personalblog'),
  clientId: getEnvVar('VITE_KEYCLOAK_CLIENT_ID', 'blog-ui')
};

// Keycloak URLs
export const keycloakUrls = {
  auth: `${authConfig.url}/realms/${authConfig.realm}/protocol/openid-connect/auth`,
  token: `${authConfig.url}/realms/${authConfig.realm}/protocol/openid-connect/token`,
  userInfo: `${authConfig.url}/realms/${authConfig.realm}/protocol/openid-connect/userinfo`,
  logout: `${authConfig.url}/realms/${authConfig.realm}/protocol/openid-connect/logout`
};

// OAuth2 configuration
export const oauthConfig = {
  clientId: authConfig.clientId,
  redirectUri: `${window.location.origin}/auth/callback`,
  responseType: 'code',
  scope: 'openid profile email',
  grantType: 'authorization_code'
};

// Role configuration
export const roles = {
  WEB_ADMIN: 'web-admin'
};

// Environment info for debugging
export const envInfo = {
  isProduction,
  environment: getEnvVar('VITE_APP_ENV', 'dev'),
  keycloakUrl: authConfig.url,
  realm: authConfig.realm,
  clientId: authConfig.clientId
};

// Log configuration in dev
if (!isProduction) {
  console.log('🔐 Auth Configuration:', {
    environment: envInfo.environment,
    keycloakUrl: authConfig.url,
    realm: authConfig.realm,
    clientId: authConfig.clientId,
    urls: keycloakUrls
  });
}