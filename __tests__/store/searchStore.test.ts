import { renderHook, act } from '@testing-library/react'
import { useSearchStore } from '../../src/app/store/searchStore'

describe('searchStore', () => {
  beforeEach(() => {
    useSearchStore.setState({
      searchQuery: '',
    })
  })

  describe('Initial State', () => {
    it('should have empty search query initially', () => {
      const { result } = renderHook(() => useSearchStore())
      
      expect(result.current.searchQuery).toBe('')
    })
  })

  describe('setSearchQuery', () => {
    it('should update search query', () => {
      const { result } = renderHook(() => useSearchStore())
      
      act(() => {
        result.current.setSearchQuery('test search')
      })

      expect(result.current.searchQuery).toBe('test search')
    })

    it('should handle empty string', () => {
      const { result } = renderHook(() => useSearchStore())
      
      act(() => {
        result.current.setSearchQuery('initial search')
      })
      
      expect(result.current.searchQuery).toBe('initial search')

      act(() => {
        result.current.setSearchQuery('')
      })
      
      expect(result.current.searchQuery).toBe('')
    })

    it('should handle whitespace and special characters', () => {
      const { result } = renderHook(() => useSearchStore())
      
      act(() => {
        result.current.setSearchQuery('  search with spaces  ')
      })

      expect(result.current.searchQuery).toBe('  search with spaces  ')
    })

    it('should update query multiple times', () => {
      const { result } = renderHook(() => useSearchStore())
      
      act(() => {
        result.current.setSearchQuery('first')
      })
      expect(result.current.searchQuery).toBe('first')

      act(() => {
        result.current.setSearchQuery('second')
      })
      expect(result.current.searchQuery).toBe('second')

      act(() => {
        result.current.setSearchQuery('third')
      })
      expect(result.current.searchQuery).toBe('third')
    })
  })

  describe('clearSearchQuery', () => {
    it('should clear search query', () => {
      const { result } = renderHook(() => useSearchStore())
      
      act(() => {
        result.current.setSearchQuery('some search term')
      })
      
      expect(result.current.searchQuery).toBe('some search term')
      act(() => {
        result.current.clearSearchQuery()
      })
      
      expect(result.current.searchQuery).toBe('')
    })

    it('should not error when clearing already empty query', () => {
      const { result } = renderHook(() => useSearchStore())
      
      expect(result.current.searchQuery).toBe('')

      act(() => {
        result.current.clearSearchQuery()
      })
      
      expect(result.current.searchQuery).toBe('')
    })
  })
}) 