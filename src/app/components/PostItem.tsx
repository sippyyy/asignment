import { Post } from '@/app/hooks/api/useGetAllPosts'
import React, { useState } from 'react'
import { POST_ACTIONS } from '../constants/commonConst'
import { useAuthStore } from '../store/authStore'
import DialogPopUp from '../reusableComponents/DialogPopUp'
import PostComments from './PostComments'

interface PostProps {
    post: Post
    setIsShowDialog: (isShowDialog: boolean) => void
}

const PostItem = ({ post, setIsShowDialog: setIsShowDialogSignIn }: PostProps) => {
    const { id, userId, title, body } = post
    const { isAuthenticated } = useAuthStore()
    const [isShowComments, setIsShowComments] = useState(false)

    const handleAction = (action: string) => {
        if (!isAuthenticated) {
            setIsShowDialogSignIn(true)
            return
        }
        setIsShowComments(true)
    }

    return (
        <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-main-venice font-medium">User {userId}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Post ID: {id}</span>
            </div>

            <h2 className="text-title-sm font-bold text-main-venice mb-3 leading-tight">
                {title}
            </h2>

            <p className="text-md text-gray-700 leading-relaxed">
                {body}
            </p>

            <div className="flex items-center space-x-6 mt-4 pt-3 border-t border-gray-100">
                {POST_ACTIONS.map((label) => (
                    <button
                        onClick={() => handleAction(label)}
                        key={label}
                        className="text-sm text-main-venice hover:text-main-shine transition-colors font-medium"
                    >
                        {label}
                    </button>
                ))}
            </div>
            <DialogPopUp isOpen={isShowComments} details={{ content: <PostComments postId={id} /> }} onClose={() => setIsShowComments(false)} />
        </div>

    )
}
export default PostItem 
