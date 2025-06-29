import { useState, useEffect, useCallback } from 'react';
import { keycloakService } from '../services/keycloakService';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
}

// Global state to prevent multiple initializations
let globalAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

let isInitializing = false;
const subscribers: Array<(state: AuthState) => void> = [];

// Subscribe to auth state changes
const subscribe = (callback: (state: AuthState) => void) => {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};

// Notify all subscribers of state changes
const notifySubscribers = (newState: AuthState) => {
  globalAuthState = newState;
  subscribers.forEach(callback => callback(newState));
};

// Initialize authentication once
const initializeAuth = async () => {
  if (isInitializing) return;
  
  isInitializing = true;
  
  try {
    console.log('Starting auth initialization...');
    
    const isAuthenticated = await keycloakService.init();
    const user = keycloakService.getUser();

    const newState: AuthState = {
      isAuthenticated,
      user,
      loading: false,
      error: null
    };

    console.log('Auth initialization complete:', { isAuthenticated, user: user?.username });
    notifySubscribers(newState);
  } catch (error) {
    console.error('Auth initialization failed:', error);
    
    const newState: AuthState = {
      isAuthenticated: false,
      user: null,
      loading: false,
      error: error instanceof Error ? error.message : 'Authentication failed'
    };
    
    notifySubscribers(newState);
  } finally {
    isInitializing = false;
  }
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(globalAuthState);

  // Subscribe to global auth state changes
  useEffect(() => {
    const unsubscribe = subscribe(setAuthState);
    return unsubscribe;
  }, []);

  // Initialize auth only once when the first component mounts
  useEffect(() => {
    if (!isInitializing && globalAuthState.loading) {
      initializeAuth();
    }
  }, []);

  // Login
  const login = useCallback(async () => {
    try {
      await keycloakService.login();
    } catch (error) {
      const newState = {
        ...globalAuthState,
        error: error instanceof Error ? error.message : 'Login failed'
      };
      notifySubscribers(newState);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await keycloakService.logout();
      const newState: AuthState = {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      };
      notifySubscribers(newState);
    } catch (error) {
      const newState = {
        ...globalAuthState,
        error: error instanceof Error ? error.message : 'Logout failed'
      };
      notifySubscribers(newState);
    }
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((role: string): boolean => {
    return keycloakService.hasRole(role);
  }, [authState.user]);

  // Check if user is web admin
  const isWebAdmin = useCallback((): boolean => {
    return keycloakService.isWebAdmin();
  }, [authState.user]);

  // Get auth header for API calls
  const getAuthHeader = useCallback(() => {
    return keycloakService.getAuthHeader();
  }, [authState.isAuthenticated]);

  // Get Keycloak instance
  const getKeycloak = useCallback(() => {
    return keycloakService.getKeycloak();
  }, []);

  // Refresh auth state
  const refresh = useCallback(async () => {
    if (!isInitializing) {
      await initializeAuth();
    }
  }, []);

  return {
    ...authState,
    login,
    logout,
    hasRole,
    isWebAdmin,
    getAuthHeader,
    getKeycloak,
    refresh
  };
};