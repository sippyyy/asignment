import { API_ENTITY } from '../constants/apiCode';

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    POSTS: API_ENTITY.POSTS,
    COMMENTS: API_ENTITY.COMMENTS,
    ALBUMS: API_ENTITY.ALBUMS,
    PHOTOS: API_ENTITY.PHOTOS,
    TODOS: API_ENTITY.TODOS,
    USERS: API_ENTITY.USERS,
  }
}

// Helper function to build full URL
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}/${endpoint}`
}

// Export the base URL for easy access
export const API_BASE_URL = API_CONFIG.BASE_URL

// Example usage helper functions
export const apiUrls = {
  getAllPosts: () => buildApiUrl(API_CONFIG.ENDPOINTS.POSTS),
  getPostById: (id: number) => buildApiUrl(`${API_CONFIG.ENDPOINTS.POSTS}/${id}`),
  getPostComments: (id: number) => buildApiUrl(`${API_CONFIG.ENDPOINTS.POSTS}/${id}/${API_ENTITY.COMMENTS}`),
  getAllUsers: () => buildApiUrl(API_CONFIG.ENDPOINTS.USERS),
  getUserById: (id: number) => buildApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/${id}`),
  getAllTodos: () => buildApiUrl(API_CONFIG.ENDPOINTS.TODOS),
  getTodoById: (id: number) => buildApiUrl(`${API_CONFIG.ENDPOINTS.TODOS}/${id}`)
} 