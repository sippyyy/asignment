import { buildApiUrl, apiUrls, API_CONFIG } from '../../src/app/config/api'

describe('API Configuration', () => {
  describe('API_CONFIG', () => {
    it('should have correct base URL from environment', () => {
      expect(API_CONFIG.BASE_URL).toBe('https://jsonplaceholder.typicode.com')
    })

    it('should have all required endpoints', () => {
      expect(API_CONFIG.ENDPOINTS).toEqual({
        POSTS: 'posts',
        COMMENTS: 'comments',
        USERS: 'users',
        ALBUMS: 'albums',
        PHOTOS: 'photos',
        TODOS: 'todos',
      })
    })
  })

  describe('buildApiUrl', () => {
    it('should build URL with endpoint', () => {
      const url = buildApiUrl('posts')
      expect(url).toBe('https://jsonplaceholder.typicode.com/posts')
    })

    it('should build URL with specific resource ID', () => {
      const url = buildApiUrl('posts/1')
      expect(url).toBe('https://jsonplaceholder.typicode.com/posts/1')
    })

    it('should build URL for nested resources', () => {
      const url = buildApiUrl('posts/1/comments')
      expect(url).toBe('https://jsonplaceholder.typicode.com/posts/1/comments')
    })
  })

  describe('apiUrls helper functions', () => {
    it('should return correct URL for getAllPosts', () => {
      const url = apiUrls.getAllPosts()
      expect(url).toBe('https://jsonplaceholder.typicode.com/posts')
    })

    it('should return correct URL for getPostById', () => {
      const url = apiUrls.getPostById(1)
      expect(url).toBe('https://jsonplaceholder.typicode.com/posts/1')
    })

    it('should return correct URL for getPostComments', () => {
      const url = apiUrls.getPostComments(1)
      expect(url).toBe('https://jsonplaceholder.typicode.com/posts/1/comments')
    })

    it('should return correct URL for getAllUsers', () => {
      const url = apiUrls.getAllUsers()
      expect(url).toBe('https://jsonplaceholder.typicode.com/users')
    })

    it('should return correct URL for getUserById', () => {
      const url = apiUrls.getUserById(1)
      expect(url).toBe('https://jsonplaceholder.typicode.com/users/1')
    })

    it('should return correct URL for getAllTodos', () => {
      const url = apiUrls.getAllTodos()
      expect(url).toBe('https://jsonplaceholder.typicode.com/todos')
    })

    it('should return correct URL for getTodoById', () => {
      const url = apiUrls.getTodoById(1)
      expect(url).toBe('https://jsonplaceholder.typicode.com/todos/1')
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero as valid ID', () => {
      const url = apiUrls.getPostById(0)
      expect(url).toBe('https://jsonplaceholder.typicode.com/posts/0')
    })

    it('should handle large ID numbers', () => {
      const url = apiUrls.getPostById(999999)
      expect(url).toBe('https://jsonplaceholder.typicode.com/posts/999999')
    })
  })
}) 