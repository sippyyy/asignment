import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSearchStore } from '../../src/app/store/searchStore'
import SearchContent from '../../src/app/components/SearchContent'
import { Post } from '../../src/app/hooks/api/useGetPost'
jest.mock('../../src/app/store/searchStore', () => ({
  useSearchStore: jest.fn(),
}))

const mockUseSearchStore = useSearchStore as jest.MockedFunction<typeof useSearchStore>

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

describe('SearchContent', () => {
  let mockSearchQuery: string
  
  beforeEach(() => {
    mockSearchQuery = ''
    mockUseSearchStore.mockReturnValue({
      searchQuery: mockSearchQuery,
      setSearchQuery: jest.fn(),
      clearSearchQuery: jest.fn(),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Initial Rendering', () => {
    it('should render without search query', () => {
      render(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.getByText('Search with:')).toBeInTheDocument()
      expect(screen.getByText('4 total posts')).toBeInTheDocument()
      expect(screen.getByText('Post')).toBeInTheDocument()
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Username')).toBeInTheDocument()
    })

    it('should render all filter buttons', () => {
      render(<SearchContent allPosts={mockPosts} />)
      
      const postButton = screen.getByText('Post')
      const titleButton = screen.getByText('Title')
      const usernameButton = screen.getByText('Username')
      
      expect(postButton).toBeInTheDocument()
      expect(titleButton).toBeInTheDocument()
      expect(usernameButton).toBeInTheDocument()
    })
  })

  describe('Filter Toggle', () => {
    it('should toggle filter selection when clicked', () => {
      render(<SearchContent allPosts={mockPosts} />)
      
      const postButton = screen.getByText('Post')
      
      expect(postButton).toHaveClass('bg-main-shine')
      
      fireEvent.click(postButton)
      
      expect(postButton).toHaveClass('bg-gray-100')
      
      fireEvent.click(postButton)
      
      expect(postButton).toHaveClass('bg-main-shine')
    })
  })

  describe('Search Functionality', () => {
    beforeEach(() => {
      mockSearchQuery = 'test1'
      mockUseSearchStore.mockReturnValue({
        searchQuery: mockSearchQuery,
        setSearchQuery: jest.fn(),
        clearSearchQuery: jest.fn(),
      })
    })

    it('should display search results when search query exists', () => {
      render(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.getByText('Search Results for "test1"')).toBeInTheDocument()
      expect(screen.getByText('Searching in: Post, Title, Username')).toBeInTheDocument()
    })

    it('should show correct result count', () => {
      render(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.getByText('1 results found')).toBeInTheDocument()
    })

    it('should display matching posts', async () => {
      render(<SearchContent allPosts={mockPosts} />)
      
      await waitFor(() => {
        expect(screen.getByText('test1')).toBeInTheDocument()
        expect(screen.getByText('body test1')).toBeInTheDocument()
      })
    })

    it('should not display non-matching posts', () => {
      render(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.queryByText('test2')).not.toBeInTheDocument()
      expect(screen.queryByText('test3')).not.toBeInTheDocument()
      expect(screen.queryByText('test4')).not.toBeInTheDocument()
    })
  })

  describe('Filter Specific Searches', () => {
    it('should search only in post body when only Post filter is active', () => {
      mockSearchQuery = 'body'
      mockUseSearchStore.mockReturnValue({
        searchQuery: mockSearchQuery,
        setSearchQuery: jest.fn(),
        clearSearchQuery: jest.fn(),
      })

      const { rerender } = render(<SearchContent allPosts={mockPosts} />)
      
      fireEvent.click(screen.getByText('Title'))
      fireEvent.click(screen.getByText('Username'))
      
      rerender(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.getByText('test1')).toBeInTheDocument()
      expect(screen.getByText('test2')).toBeInTheDocument()
    })

    it('should search only in title when only Title filter is active', () => {
      mockSearchQuery = 'test2'
      mockUseSearchStore.mockReturnValue({
        searchQuery: mockSearchQuery,
        setSearchQuery: jest.fn(),
        clearSearchQuery: jest.fn(),
      })

      const { rerender } = render(<SearchContent allPosts={mockPosts} />)
      
      fireEvent.click(screen.getByText('Post'))
      fireEvent.click(screen.getByText('Username'))
      
      rerender(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.getByText('test2')).toBeInTheDocument()
    })

    it('should search by username when Username filter is active', () => {
      mockSearchQuery = 'user1'
      mockUseSearchStore.mockReturnValue({
        searchQuery: mockSearchQuery,
        setSearchQuery: jest.fn(),
        clearSearchQuery: jest.fn(),
      })

      const { rerender } = render(<SearchContent allPosts={mockPosts} />)
      
      fireEvent.click(screen.getByText('Post'))
      fireEvent.click(screen.getByText('Title'))
      
      rerender(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.getByText('test1')).toBeInTheDocument()
      expect(screen.getByText('test3')).toBeInTheDocument()
      expect(screen.queryByText('test2')).not.toBeInTheDocument()
    })
  })

  describe('No Results', () => {
    it('should display no results message when no posts match', () => {
      mockSearchQuery = 'nonexistentterm'
      mockUseSearchStore.mockReturnValue({
        searchQuery: mockSearchQuery,
        setSearchQuery: jest.fn(),
        clearSearchQuery: jest.fn(),
      })

      render(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.getByText('No posts found matching "nonexistentterm"')).toBeInTheDocument()
      expect(screen.getByText('Try different search terms or adjust your filters')).toBeInTheDocument()
      expect(screen.getByText('0 results found')).toBeInTheDocument()
    })
  })

  describe('Case Insensitive Search', () => {
    it('should find matches regardless of case', () => {
      mockSearchQuery = 'TEST1'
      mockUseSearchStore.mockReturnValue({
        searchQuery: mockSearchQuery,
        setSearchQuery: jest.fn(),
        clearSearchQuery: jest.fn(),
      })

      render(<SearchContent allPosts={mockPosts} />)
      
      expect(screen.getByText('test1')).toBeInTheDocument()
    })
  })
}) 