import { useAuthStore } from '../store/authStore'

export function withAuthInterceptor(fetchFn: typeof fetch = fetch) {
  return async function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const { isAuthenticated } = useAuthStore.getState();
    
    if (!isAuthenticated) {
      return Promise.reject(new Error('User is not authenticated. Request blocked.'));
    }

    return fetchFn(input, init);
  };
}

// Enhanced interceptor with automatic token handling (if you add tokens later)
export function withAuthTokenInterceptor(fetchFn: typeof fetch = fetch) {
  return async function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const { isAuthenticated } = useAuthStore.getState();
    
    if (!isAuthenticated) {
      return Promise.reject(new Error('User is not authenticated. Request blocked.'));
    }

    // Add authorization header if needed in the future
    const enhancedInit: RequestInit = {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
        // Add token header here when implemented: 'Authorization': `Bearer ${token}`
      },
    };

    return fetchFn(input, enhancedInit);
  };
}
