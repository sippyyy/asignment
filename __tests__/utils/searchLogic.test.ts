import { Post } from '../../src/app/hooks/api/useGetPost'

const filterPosts = (posts: Post[], searchQuery: string, activeFilters: string[]) => {
  if (!searchQuery.trim()) {
    return []
  }

  const query = searchQuery.toLowerCase().trim()
  
  return posts.filter(post => {
    const hasPostFilter = activeFilters.includes('Post')
    const hasTitleFilter = activeFilters.includes('Title')
    const hasUsernameFilter = activeFilters.includes('Username')

    let matches = false

    if (hasPostFilter) {
      matches = matches || post.body.toLowerCase().includes(query)
    }

    if (hasTitleFilter) {
      matches = matches || post.title.toLowerCase().includes(query)
    }

    if (hasUsernameFilter) {
      const username = `user${post.userId}`
      matches = matches || username.toLowerCase().includes(query)
    }

    return matches
  })
}

const mockPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: 'test1',
    body: 'body test1',
  },
  {
    id: 2,
    userId: 2,
    title: 'test2',
    body: 'body test2',
  },
  {
    id: 3,
    userId: 1,
    title: 'test3',
    body: 'body test3',
  },
  {
    id: 4,
    userId: 3,
    title: 'test4',
    body: 'body test4',
  },
]

describe('Search Logic', () => {
  describe('Multi-filter Search (Post + Title + Username)', () => {
    const allFilters = ['Post', 'Title', 'Username']

    it('should find posts matching in title', () => {
      const results = filterPosts(mockPosts, 'test1', allFilters)
      
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('test1')
    })

    it('should find posts matching in body', () => {
      const results = filterPosts(mockPosts, 'body', allFilters)
      
      expect(results).toHaveLength(4)
      expect(results[0].title).toBe('test1')
      expect(results[1].title).toBe('test2')
    })

    it('should find posts matching by username', () => {
      const results = filterPosts(mockPosts, 'user1', allFilters)
      
      expect(results).toHaveLength(2)
      expect(results.every(post => post.userId === 1)).toBe(true)
    })
  })

  describe('Single Filter Search', () => {
    it('should search only in post body when only Post filter active', () => {
      const results = filterPosts(mockPosts, 'test1', ['Post'])
      
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('test1')
    })

    it('should search only in title when only Title filter active', () => {
      const results = filterPosts(mockPosts, 'test2', ['Title'])
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('test2')
    })

    it('should search only by username when only Username filter active', () => {
      const results = filterPosts(mockPosts, 'user3', ['Username'])
      
      expect(results).toHaveLength(1)
      expect(results[0].userId).toBe(3)
      expect(results[0].title).toBe('test4')
    })
  })

  describe('Edge Cases', () => {
    it('should return empty array for empty search query', () => {
      const results = filterPosts(mockPosts, '', ['Post', 'Title', 'Username'])
      
      expect(results).toHaveLength(0)
    })

    it('should return empty array for whitespace-only query', () => {
      const results = filterPosts(mockPosts, '   ', ['Post', 'Title', 'Username'])
      
      expect(results).toHaveLength(0)
    })

    it('should return empty array when no filters active', () => {
      const results = filterPosts(mockPosts, 'react', [])
      
      expect(results).toHaveLength(0)
    })

    it('should be case insensitive', () => {
      const results = filterPosts(mockPosts, 'TEST1', ['Post', 'Title', 'Username'])
      
      expect(results).toHaveLength(1)
    })

    it('should handle partial word matches', () => {
      const results = filterPosts(mockPosts, 'test', ['Post', 'Title', 'Username'])
      
      expect(results).toHaveLength(4)
      expect(results[0].title).toBe('test1')
    })
  })

  describe('No Results', () => {
    it('should return empty array for non-matching search term', () => {
      const results = filterPosts(mockPosts, 'nonexistentterm', ['Post', 'Title', 'Username'])
      
      expect(results).toHaveLength(0)
    })
  })
}) 