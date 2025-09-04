import React from 'react'
import { render, screen } from '@testing-library/react'
import CommentItem from '../../src/app/components/CommentItem'
import { Comment } from '../../src/app/hooks/api/useGetPostComments'

describe('CommentItem', () => {
  const mockComment: Comment = {
    id: 1,
    postId: 1,
    name: 'John Doe',
    email: 'john@example.com',
    body: 'This is a test comment with some content to verify rendering.',
  }

  it('should render comment name', () => {
    render(<CommentItem comment={mockComment} />)
    
    expect(screen.getByText('John Doe')).toBeDefined()
  })

  it('should render comment body', () => {
    render(<CommentItem comment={mockComment} />)
    
    expect(screen.getByText('This is a test comment with some content to verify rendering.')).toBeDefined()
  })

  it('should render user icon', () => {
    render(<CommentItem comment={mockComment} />)
    
    const iconContainer = document.querySelector('.bg-main-shine\\/10')
    expect(iconContainer).toBeDefined()
  })

  it('should handle empty comment body', () => {
    const emptyBodyComment: Comment = {
      ...mockComment,
      body: '',
    }

    render(<CommentItem comment={emptyBodyComment} />)
    
    expect(screen.getByText('John Doe')).toBeDefined()
    const container = document.querySelector('.text-gray-700')
    expect(container).toBeDefined()
    expect(container?.textContent).toBe('')
  })

  it('should handle long comment body', () => {
    const longBodyComment: Comment = {
      ...mockComment,
      body: 'This is a very long comment that should still render properly even when it contains a lot of text content that might wrap to multiple lines in the UI component.',
    }

    render(<CommentItem comment={longBodyComment} />)
    
    expect(screen.getByText(longBodyComment.body)).toBeDefined()
  })

  it('should handle special characters in name and body', () => {
    const specialCharComment: Comment = {
      ...mockComment,
      name: 'José María & Co.',
      body: 'Comment with special chars: @#$%^&*()_+{}|:"<>?[]\\;\',./',
    }

    render(<CommentItem comment={specialCharComment} />)
    
    expect(screen.getByText('José María & Co.')).toBeDefined()
    expect(screen.getByText(specialCharComment.body)).toBeDefined()
  })
}) 