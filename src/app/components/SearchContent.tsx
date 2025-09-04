import React, { useState, useEffect } from 'react'
import { Post } from '../hooks/api/useGetPost'
import { SEARCH_FILTERS } from '../constants/commonConst'
import { useSearchStore } from '../store/searchStore'

const SearchContent = ({ allPosts }: { allPosts: Post[] }) => {
    const [searchFilters, setSearchFilters] = useState<string[]>(SEARCH_FILTERS)
    const [searchResults, setSearchResults] = useState<Post[]>([])
    const { searchQuery } = useSearchStore()

    const handleClickFilter = (filter: string) => {
        if (searchFilters.includes(filter)) return setSearchFilters(searchFilters.filter(f => f !== filter));
        return setSearchFilters([...searchFilters, filter]);
    }
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([])
            return
        }

        const query = searchQuery.toLowerCase().trim()
        
        const filteredPosts = allPosts.filter(post => {
            const hasPostFilter = searchFilters.includes('Post')
            const hasTitleFilter = searchFilters.includes('Title')
            const hasUsernameFilter = searchFilters.includes('Username')

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

        setSearchResults(filteredPosts)
    }, [searchQuery, searchFilters, allPosts])

    return (
        <div className='p-md'>
            <div className='flex justify-between'>
                <div className="flex gap-2 mb-6 items-center">
                    <span className='text-sm text-main-venice'>Search with: </span>
                    {SEARCH_FILTERS.map((filter: string) => (
                        <button
                            onClick={() => handleClickFilter(filter)}
                            key={filter}
                            type="button"
                            className={`px-sm py-[2px] rounded-lg text-sm transition-colors active:scale-95 ${
                                searchFilters.includes(filter)
                                    ? 'bg-main-shine text-white'
                                    : 'bg-gray-100 text-main-venice hover:bg-main-shine/10'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <p className='text-sm text-main-venice'>
                    {searchQuery ? `${searchResults.length} results found` : `${allPosts.length} total posts`}
                </p>
            </div>

            {searchQuery && (
                <div className="space-y-4">
                    <div className="mb-4">
                        <h2 className="text-title-sm font-bold text-main-venice">
                            Search Results for "{searchQuery}"
                        </h2>
                        <p className="text-sm text-gray-600">
                            Searching in: {searchFilters.join(', ')}
                        </p>
                    </div>

                    {searchResults.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-gray-600 text-md">
                                No posts found matching "{searchQuery}"
                            </div>
                            <div className="text-gray-500 text-sm mt-1">
                                Try different search terms or adjust your filters
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {searchResults.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-xxl hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start space-x-4">
                                        {/* Post Number Badge */}
                                        <div className="flex-shrink-0 w-10 h-10 bg-main-shine/10 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-main-shine">#{index + 1}</span>
                                        </div>
                                        
                                        {/* Post Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="text-sm text-main-venice font-medium">User {post.userId}</span>
                                                <span className="text-sm text-gray-500">•</span>
                                                <span className="text-sm text-gray-500">Post ID: {post.id}</span>
                                            </div>
                                            
                                            <h3 className="text-title-sm font-bold text-main-venice mb-2 leading-tight">
                                                {post.title}
                                            </h3>
                                            
                                            <p className="text-md text-gray-700 leading-relaxed">
                                                {post.body}
                                            </p>

                                            {/* Post Actions */}
                                            <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-100">
                                                <button className="text-sm text-main-venice hover:text-main-shine transition-colors">
                                                    View Post
                                                </button>
                                                <button className="text-sm text-main-venice hover:text-main-shine transition-colors">
                                                    Share
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchContent