'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useGetAllPosts, Post } from '../hooks/api/useGetAllPosts'
import { useAuthStore } from '../store/authStore'
import PostItem from './PostItem'
import { POSTS_PER_PAGE } from '../constants/commonConst'
import EndContent from './EndContent'
import DialogPopUp from '../reusableComponents/DialogPopUp'
import { useRouter } from 'next/navigation'

interface MainContentProps {
  allPosts: Post[]
  isLoading: boolean
  error: Error | null
}

const MainContent = ({ allPosts, isLoading, error }: MainContentProps) => {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isShowDialog, setIsShowDialog] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  const lastPostRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        if (!isAuthenticated) {
          setIsShowDialog(true)
          return
        }

        setPage(prevPage => prevPage + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [isLoadingMore, hasMore, isAuthenticated])

  useEffect(() => {
    if (allPosts && allPosts.length > 0 && visiblePosts.length === 0) {
      const firstBatch = allPosts.slice(0, POSTS_PER_PAGE)
      setVisiblePosts(firstBatch)
      setHasMore(allPosts.length > POSTS_PER_PAGE)
    }
  }, [allPosts, visiblePosts.length])

  useEffect(() => {
    if (page === 1) return

    const loadMorePosts = () => {
      setIsLoadingMore(true)

      setTimeout(() => {
        if (!allPosts) return

        const start = (page - 1) * POSTS_PER_PAGE
        const end = start + POSTS_PER_PAGE
        const newPosts = allPosts.slice(start, end)

        setVisiblePosts(prevPosts => [...prevPosts, ...newPosts])

        setHasMore(allPosts.length > visiblePosts.length + newPosts.length)
        setIsLoadingMore(false)
      }, 300)
    }

    if (hasMore && allPosts) {
      loadMorePosts()
    }
  }, [page, allPosts, hasMore, visiblePosts.length])

  const handleSignIn = () => {
    router.push('/login')
    setIsShowDialog(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-shine"></div>
          <div className="text-main-venice text-lg">Loading posts...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Failed to load posts</div>
          <div className="text-gray-600 text-md">Please try refreshing the page</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-md">
      <div className="space-y-6">
        {visiblePosts.map((post, index) => {
          const isLastPost = visiblePosts.length === index + 1
          return (
            <article
              key={`${post.id}-${index}`}
              ref={isLastPost ? lastPostRef : null} // Attach ref to last item
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-xxl hover:shadow-md transform transition-all hover:scale-[1.01]"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-main-shine/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-main-shine">#{index + 1}</span>
                </div>

                <PostItem setIsShowDialog={setIsShowDialog} post={post} />

              </div>
            </article>
          )
        })}
      </div>

      {/* Loading More Indicator */}
      {isLoadingMore && (
        <div className="flex justify-center items-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-shine"></div>
          <p className="ml-4 text-main-venice">Loading more posts...</p>
        </div>
      )}

      <DialogPopUp isOpen={isShowDialog} details={{ title: "Authentication Required", description: "Please sign in to view more posts or to perform actions" }} closeText="Sign In" onClose={handleSignIn} />

      {!hasMore && visiblePosts.length > 0 && (
        <EndContent />
      )}
    </div>
  )
}

export default MainContent 