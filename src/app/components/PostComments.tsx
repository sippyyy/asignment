'use client'

import React, { useEffect, useState } from 'react'
import { useGetPostComments, Comment } from '../hooks/api/useGetPostComments'
import { MessageCircle, Send } from 'lucide-react'
import CommentItem from './CommentItem'
import { useAuthStore } from '../store/authStore'

interface PostCommentsProps {
  postId: number
}

const PostComments = ({ postId }: PostCommentsProps) => {
  const { data: commentsData, isLoading, error } = useGetPostComments(postId)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isAuthenticated, currentUserEmail } = useAuthStore()

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData)
    }
  }, [commentsData])

  // Handle new comment submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newComment.trim() || !isAuthenticated || !currentUserEmail) return
    
    setIsSubmitting(true)
    
    // Simulate API delay
    setTimeout(() => {
      // Create new comment object
      const newCommentObj: Comment = {
        postId: postId,
        id: Math.max(...comments.map(c => c.id), 0) + 1,
        email: currentUserEmail,
        name: currentUserEmail,
        body: newComment.trim()
      }
      
      // Add new comment to the top of the list
      setComments(prev => [...prev, newCommentObj])
      setNewComment('')
      setIsSubmitting(false)
    }, 500)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-xxl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-main-shine"></div>
          <span className="text-main-venice text-md">Loading comments...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-xxl text-center">
        <div className="text-red-500 text-md font-medium mb-2">
          Failed to load comments
        </div>
        <div className="text-gray-600 text-sm">
          Please try again or check your authentication
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[600px] bg-red overflow-y-auto">
      {/* Comments Header */}
      <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
        <MessageCircle className="w-5 h-5 text-main-shine" />
        <h3 className="text-title-sm font-bold text-main-venice">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="p-xxl text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <div className="text-gray-600 text-md">
            No comments yet for this post
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Be the first to share your thoughts!
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment: Comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
            <div className="bg-white p-xxl border-b border-gray-200 mb-4">
        <form onSubmit={handleSubmitComment} className="space-y-3">
          <div>
            <label htmlFor="newComment" className="block text-sm font-medium text-main-venice mb-2">
              Add a comment
            </label>
            <div className="relative">
              <textarea
                id="newComment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full p-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-main-shine focus:border-main-shine outline-none transition-colors text-md resize-none"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="flex items-center space-x-2 bg-main-venice hover:bg-main-shine disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-xl py-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm">
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostComments