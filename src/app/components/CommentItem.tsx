import React from 'react'
import { Comment } from '../hooks/api/useGetPostComments'
import { User } from 'lucide-react'

const CommentItem = ({ comment }: { comment: Comment }) => {
    const { name,body } = comment
    return (
        <div className="space-y-6">
                <div
                    className="bg-gray-50 rounded-lg p-xxl border border-gray-100 hover:shadow-sm transition-shadow"
                >

                    <div className="grid grid-cols-12 gap-2 items-start">
                        <div className="col-span-2 flex items-center justify-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-main-shine/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-main-shine" />
                            </div>
                        </div>
                        <div className="col-span-10">
                            <div>
                                <h4 className="text-sm md:text-md font-bold text-main-venice">
                                    {name}
                                </h4>
                            </div>
                            <div className="mt-1">
                                <p className="text-sm md:text-md text-gray-700 leading-relaxed">
                                    {body}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default CommentItem