import { useEffect } from 'react';
import { useAuthStore } from './auth.store';

/**
 * Hook to initialize auth state when the app starts
 * Call this in your root component or app entry point
 */
export const useAuthInitialization = () => {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { isLoading };
};
