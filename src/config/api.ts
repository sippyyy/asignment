// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  ENDPOINTS: {
    POSTS: '/posts',
    COMMENTS: '/comments', 
    ALBUMS: '/albums',
    PHOTOS: '/photos',
    TODOS: '/todos',
    USERS: '/users'
  }
}

// Helper function to build full URL
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

// Export the base URL for easy access
export const API_BASE_URL = API_CONFIG.BASE_URL 